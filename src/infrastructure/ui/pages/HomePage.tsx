import { useState, useEffect } from 'react';
import { WeeklyRoutine } from '../../../domain/entities/WeeklyRoutine';
import { RoutineTracking } from '../../../domain/entities/ExerciseTracking';
import { ExerciseInfo } from '../../../domain/entities/ExerciseInfo';
import { RoutineService } from '../../../application/services/RoutineService';
import { ExerciseInfoService } from '../../../application/services/ExerciseInfoService';
import { LocalStorageRoutineRepository } from '../../persistence/LocalStorageRoutineRepository';
import { LocalStorageTrackingRepository } from '../../persistence/LocalStorageTrackingRepository';
import { WgerExerciseApiRepository } from '../../api/WgerExerciseApiRepository';
import { defaultRoutine } from '../../../shared/constants/defaultRoutine';
import { WeeklyView } from '../components/WeeklyView';
import { DailyView } from '../components/DailyView';
import { ExerciseInfoModal } from '../components/ExerciseInfoModal';

type View = 'weekly' | 'daily';

export const HomePage = () => {
  const [routine, setRoutine] = useState<WeeklyRoutine>(defaultRoutine);
  const [tracking, setTracking] = useState<RoutineTracking | null>(null);
  const [currentView, setCurrentView] = useState<View>('weekly');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null);
  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInfo | null>(null);
  const [selectedExerciseName, setSelectedExerciseName] = useState<string>('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  
  const repository = new LocalStorageRoutineRepository();
  const trackingRepository = new LocalStorageTrackingRepository();
  const routineService = new RoutineService(repository, trackingRepository);
  const exerciseApiRepository = new WgerExerciseApiRepository();
  const exerciseInfoService = new ExerciseInfoService(exerciseApiRepository);

  useEffect(() => {
    const loadData = async () => {
      // Cargar rutina
      const savedRoutine = await routineService.loadRoutine();
      if (savedRoutine) {
        setRoutine(savedRoutine);
      } else {
        // Guardar rutina por defecto
        await routineService.saveRoutine(defaultRoutine);
      }

      // Cargar tracking
      const savedTracking = await routineService.loadTracking();
      setTracking(savedTracking);
    };
    loadData();
  }, []);

  const handleDayClick = (dayNumber: number) => {
    setSelectedDayNumber(dayNumber);
    setCurrentView('daily');
  };

  const handleBack = () => {
    setCurrentView('weekly');
    setSelectedDayNumber(null);
  };

  const handleNavigateDay = (dayNumber: number) => {
    setSelectedDayNumber(dayNumber);
  };

  const handleToggleExercise = async (dayNumber: number, exerciseIndex: number) => {
    try {
      const updatedTracking = await routineService.toggleExerciseTracking(
        routine,
        tracking,
        dayNumber,
        exerciseIndex
      );
      // Forzar actualización del estado con una nueva referencia
      setTracking({ ...updatedTracking });
    } catch (error) {
      console.error('Error al actualizar tracking:', error);
    }
  };

  const handleWeightChange = async (dayNumber: number, exerciseIndex: number, weight: number | undefined) => {
    try {
      const updatedTracking = await routineService.updateExerciseWeight(
        routine,
        tracking,
        dayNumber,
        exerciseIndex,
        weight
      );
      // Forzar actualización del estado con una nueva referencia
      setTracking({ ...updatedTracking });
    } catch (error) {
      console.error('Error al actualizar peso:', error);
    }
  };

  const handleShowExerciseInfo = async (exerciseName: string) => {
    setSelectedExerciseName(exerciseName);
    setIsInfoModalOpen(true);
    setIsLoadingInfo(true);
    setExerciseInfo(null);

    try {
      const info = await exerciseInfoService.getExerciseInfo(exerciseName);
      setExerciseInfo(info);
    } catch (error) {
      console.error('Error al obtener información del ejercicio:', error);
    } finally {
      setIsLoadingInfo(false);
    }
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
    setExerciseInfo(null);
    setSelectedExerciseName('');
  };

  const handleToggleSet = async (dayNumber: number, exerciseIndex: number, setIndex: number) => {
    try {
      const selectedDay = routineService.getDayByNumber(routine, dayNumber);
      if (!selectedDay) return;

      const exercise = selectedDay.exercises[exerciseIndex];
      if (!exercise) return;

      const updatedTracking = await routineService.toggleSet(
        routine,
        tracking,
        dayNumber,
        exerciseIndex,
        setIndex,
        exercise.sets
      );
      // Forzar actualización del estado con una nueva referencia
      setTracking({ ...updatedTracking });
    } catch (error) {
      console.error('Error al actualizar serie:', error);
    }
  };

  const selectedDay = selectedDayNumber
    ? routineService.getDayByNumber(routine, selectedDayNumber)
    : null;

  return (
    <div className="min-h-screen bg-gym-dark py-3 sm:py-6">
      {currentView === 'weekly' ? (
        <WeeklyView
          routine={routine}
          tracking={tracking}
          onDayClick={handleDayClick}
          routineService={routineService}
        />
      ) : selectedDay ? (
        <DailyView
          day={selectedDay}
          routine={routine}
          tracking={tracking}
          routineService={routineService}
          onBack={handleBack}
          onNavigateDay={handleNavigateDay}
          onToggleExercise={handleToggleExercise}
          onWeightChange={handleWeightChange}
          onShowExerciseInfo={handleShowExerciseInfo}
          onToggleSet={handleToggleSet}
        />
      ) : null}
      
      <ExerciseInfoModal
        exerciseInfo={exerciseInfo}
        exerciseName={selectedExerciseName}
        isOpen={isInfoModalOpen}
        isLoading={isLoadingInfo}
        onClose={handleCloseInfoModal}
      />
    </div>
  );
};

