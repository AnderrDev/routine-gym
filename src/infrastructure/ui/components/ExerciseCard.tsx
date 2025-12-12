import { useState, useEffect, useRef } from 'react';
import { Exercise } from '../../../domain/entities/Exercise';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  completed?: boolean;
  weight?: number;
  completedSets?: boolean[];
  onToggleComplete?: () => void;
  onWeightChange?: (weight: number | undefined) => void;
  onShowInfo?: () => void;
  onToggleSet?: (setIndex: number) => void;
}

// Calcular tiempo de recuperación basado en las reps
const getRestTime = (reps: string): number => {
  // Extraer números del string de reps (ej: "6-8" -> 6, "12-15" -> 12)
  const match = reps.match(/\d+/);
  const repCount = match ? parseInt(match[0]) : 10;
  
  if (repCount <= 8) {
    return 90; // Ejercicios pesados: 90 segundos
  } else if (repCount <= 12) {
    return 60; // Ejercicios moderados: 60 segundos
  } else {
    return 45; // Ejercicios ligeros: 45 segundos
  }
};

// Función para notificar cuando el timer termine
const notifyTimerComplete = (exerciseName: string, setIndex: number) => {
  // Vibración (si está disponible en dispositivos móviles)
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200, 100, 200]);
  }

  // Sonido usando Web Audio API
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    // Si falla el audio, no hacer nada
    console.log('Audio no disponible');
  }

  // Notificación del navegador
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('¡Descanso completado!', {
      body: `${exerciseName} - Serie ${setIndex + 1}`,
      icon: '/favicon.ico',
      tag: 'rest-timer',
      requireInteraction: false,
    });
  } else if ('Notification' in window && Notification.permission === 'default') {
    // Solicitar permiso si aún no se ha hecho
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('¡Descanso completado!', {
          body: `${exerciseName} - Serie ${setIndex + 1}`,
          icon: '/favicon.ico',
          tag: 'rest-timer',
          requireInteraction: false,
        });
      }
    });
  }
};

export const ExerciseCard = ({ 
  exercise, 
  index, 
  completed = false, 
  weight,
  completedSets,
  onToggleComplete,
  onWeightChange,
  onShowInfo,
  onToggleSet
}: ExerciseCardProps) => {
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [weightInput, setWeightInput] = useState(weight?.toString() || '');
  const [activeTimer, setActiveTimer] = useState<{ setIndex: number; timeLeft: number } | null>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerStartTimeRef = useRef<number | null>(null);
  const timerDurationRef = useRef<number | null>(null);
  const previousCompletedSetsRef = useRef<boolean[]>([]);

  // Solicitar permisos de notificación al montar
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Sincronizar el input con la prop weight cuando cambia
  useEffect(() => {
    if (!isEditingWeight) {
      setWeightInput(weight?.toString() || '');
    }
  }, [weight, isEditingWeight]);

  // Detectar cuando se completa una serie y activar timer
  useEffect(() => {
    if (!completedSets || exercise.isFinisher) return;

    // Encontrar qué serie se acaba de completar
    const previous = previousCompletedSetsRef.current;
    const current = completedSets;

    for (let i = 0; i < current.length; i++) {
      // Si una serie que antes no estaba completada ahora lo está
      if (!previous[i] && current[i]) {
        // Solo activar timer si no es la última serie
        const totalSets = exercise.sets;
        if (i < totalSets - 1) {
          const restTime = getRestTime(exercise.reps);
          const startTime = Date.now();
          timerStartTimeRef.current = startTime;
          timerDurationRef.current = restTime;
          setActiveTimer({ setIndex: i, timeLeft: restTime });
        }
        break;
      }
    }

    previousCompletedSetsRef.current = [...current];
  }, [completedSets, exercise.reps, exercise.sets, exercise.isFinisher]);

  // Timer countdown - usa timestamps para funcionar en background
  useEffect(() => {
    if (activeTimer && timerStartTimeRef.current !== null && timerDurationRef.current !== null) {
      const updateTimer = () => {
        if (timerStartTimeRef.current === null || timerDurationRef.current === null) {
          return;
        }
        
        const elapsed = Math.floor((Date.now() - timerStartTimeRef.current) / 1000);
        const timeLeft = Math.max(0, timerDurationRef.current - elapsed);
        
        if (timeLeft <= 0) {
          // Guardar el setIndex antes de limpiar
          setActiveTimer(prev => {
            if (prev) {
              // Notificar que el timer terminó
              notifyTimerComplete(exercise.name, prev.setIndex);
            }
            return null;
          });
          timerStartTimeRef.current = null;
          timerDurationRef.current = null;
        } else {
          setActiveTimer(prev => {
            if (!prev) return null;
            return { ...prev, timeLeft };
          });
        }
      };

      // Actualizar inmediatamente
      updateTimer();

      // Actualizar cada segundo para la UI
      timerIntervalRef.current = setInterval(updateTimer, 1000);

      // Actualizar cuando la página vuelve a primer plano
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          updateTimer();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [activeTimer]);

  const handleSkipTimer = () => {
    setActiveTimer(null);
    timerStartTimeRef.current = null;
    timerDurationRef.current = null;
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Evitar que el doble click se propague si se hace sobre el botón o input
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) {
      return;
    }
    if (onToggleComplete) {
      onToggleComplete();
    }
  };

  const handleWeightBlur = () => {
    setIsEditingWeight(false);
    const numWeight = weightInput.trim() === '' ? undefined : parseFloat(weightInput);
    if (onWeightChange) {
      onWeightChange(numWeight && !isNaN(numWeight) ? numWeight : undefined);
    }
  };

  const handleWeightKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setWeightInput(weight?.toString() || '');
      setIsEditingWeight(false);
    }
  };

  const handleWeightClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingWeight(true);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`
        w-full p-3 sm:p-4 rounded-lg border transition-all duration-300
        cursor-pointer select-none
        ${completed ? 'opacity-75' : ''}
        ${exercise.isFinisher 
          ? 'bg-gradient-to-r from-gym-accent/20 to-gym-accent-secondary/20 border-gym-accent' 
          : 'bg-gym-card border-gym-border hover:border-gym-accent/50'
        }
        ${completed && !exercise.isFinisher ? 'border-gym-accent/30' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2 flex-wrap">
            <span className="text-gym-accent font-bold text-xs sm:text-sm min-w-[20px] sm:min-w-[24px]">
              #{index + 1}
            </span>
            <h3 className={`font-semibold text-sm sm:text-base flex-1 min-w-0 ${exercise.isFinisher ? 'text-gym-accent' : 'text-gym-text'} ${completed ? 'line-through text-gym-text-secondary' : ''}`}>
              {exercise.name}
            </h3>
            {exercise.isFinisher && (
              <span className="px-2 py-0.5 text-[10px] sm:text-xs font-bold bg-gym-accent text-white rounded-full whitespace-nowrap">
                FINISHER
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gym-text-secondary items-center">
            <span className="flex items-center gap-1">
              <span className="font-medium text-gym-text">{exercise.sets}</span>
              <span>series</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium text-gym-text">{exercise.reps}</span>
              <span>reps</span>
            </span>
            {onWeightChange && (
              <span 
                className="flex items-center gap-1 cursor-pointer hover:text-gym-accent transition-colors"
                onClick={handleWeightClick}
              >
                {isEditingWeight ? (
                  <input
                    type="number"
                    inputMode="decimal"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    onBlur={handleWeightBlur}
                    onKeyDown={handleWeightKeyDown}
                    onClick={(e) => e.stopPropagation()}
                    className="w-16 px-2 py-1 bg-gym-dark border border-gym-accent rounded text-gym-text text-xs focus:outline-none focus:ring-2 focus:ring-gym-accent"
                    placeholder="kg"
                    autoFocus
                    min="0"
                    step="0.5"
                  />
                ) : (
                  <>
                    <span className="font-medium text-gym-text">
                      {weight ? `${weight} kg` : 'Peso'}
                    </span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </>
                )}
              </span>
            )}
          </div>
          {/* Series tracking - Omitir para finishers */}
          {onToggleSet && exercise.sets > 0 && !exercise.isFinisher && (
            <div className="mt-3 pt-3 border-t border-gym-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gym-text-secondary">Series:</span>
                {completedSets && (
                  <span className="text-xs text-gym-text-secondary">
                    {completedSets.filter(s => s).length}/{exercise.sets}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: exercise.sets }, (_, setIndex) => {
                  const isCompleted = completedSets?.[setIndex] || false;
                  return (
                    <button
                      key={setIndex}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleSet(setIndex);
                      }}
                      className={`
                        flex items-center justify-center min-w-[36px] h-9 px-2 rounded-lg border-2
                        transition-all duration-200 touch-manipulation active:scale-95
                        text-xs font-medium
                        ${isCompleted
                          ? 'bg-gym-accent border-gym-accent text-white'
                          : 'bg-gym-dark border-gym-border text-gym-text-secondary hover:border-gym-accent/50'
                        }
                      `}
                      aria-label={`Serie ${setIndex + 1} ${isCompleted ? 'completada' : 'pendiente'}`}
                    >
                      {setIndex + 1}
                      {isCompleted && (
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Timer de recuperación */}
              {activeTimer !== null && (
                <div className="mt-3 p-3 bg-gym-accent/10 border border-gym-accent/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gym-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-medium text-gym-text">
                        Recuperación serie {activeTimer.setIndex + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSkipTimer();
                      }}
                      className="text-xs text-gym-accent hover:text-gym-accent-secondary transition-colors font-medium"
                    >
                      Saltar
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gym-dark rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gym-accent to-gym-accent-secondary transition-all duration-1000"
                        style={{
                          width: `${((getRestTime(exercise.reps) - activeTimer.timeLeft) / getRestTime(exercise.reps)) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-lg font-bold text-gym-accent min-w-[40px] text-right">
                      {activeTimer.timeLeft}s
                    </span>
                  </div>
                  {activeTimer.timeLeft === 0 && (
                    <div className="mt-2 text-center">
                      <span className="text-xs font-semibold text-gym-accent animate-pulse">
                        ¡Listo para la siguiente serie!
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {onShowInfo && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onShowInfo();
              }}
              className="mt-2 flex items-center gap-1.5 text-xs text-gym-accent hover:text-gym-accent-secondary transition-colors touch-manipulation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Ver cómo hacerlo</span>
            </button>
          )}
        </div>
        {onToggleComplete && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleComplete();
            }}
            className={`
              flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded border-2 flex items-center justify-center
              transition-all duration-200 touch-manipulation active:scale-90
              focus:outline-none focus:ring-2 focus:ring-gym-accent focus:ring-offset-2 focus:ring-offset-gym-dark
              ${completed
                ? 'bg-gym-accent border-gym-accent hover:bg-gym-accent/90'
                : 'bg-transparent border-gym-border hover:border-gym-accent hover:bg-gym-card'
              }
            `}
            aria-label={completed ? 'Desmarcar ejercicio' : 'Marcar ejercicio como completado'}
            aria-pressed={completed}
          >
            {completed && (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

