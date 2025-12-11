import { useState, useEffect } from 'react';
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

  // Sincronizar el input con la prop weight cuando cambia
  useEffect(() => {
    if (!isEditingWeight) {
      setWeightInput(weight?.toString() || '');
    }
  }, [weight, isEditingWeight]);

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

