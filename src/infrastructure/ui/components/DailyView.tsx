import { WorkoutDay } from '../../../domain/entities/WorkoutDay';
import { ExerciseCard } from './ExerciseCard';
import { WeeklyRoutine } from '../../../domain/entities/WeeklyRoutine';
import { RoutineTracking } from '../../../domain/entities/ExerciseTracking';
import { RoutineService } from '../../../application/services/RoutineService';

interface DailyViewProps {
  day: WorkoutDay;
  routine: WeeklyRoutine;
  tracking: RoutineTracking | null;
  routineService: RoutineService;
  onBack: () => void;
  onNavigateDay: (dayNumber: number) => void;
  onToggleExercise: (dayNumber: number, exerciseIndex: number) => void;
  onWeightChange: (dayNumber: number, exerciseIndex: number, weight: number | undefined) => void;
  onShowExerciseInfo: (exerciseName: string) => void;
  onToggleSet: (dayNumber: number, exerciseIndex: number, setIndex: number) => void;
}

export const DailyView = ({ 
  day, 
  routine, 
  tracking,
  routineService,
  onBack, 
  onNavigateDay,
  onToggleExercise,
  onWeightChange,
  onShowExerciseInfo,
  onToggleSet
}: DailyViewProps) => {
  const currentIndex = routine.days.findIndex(d => d.dayNumber === day.dayNumber);
  const previousDay = currentIndex > 0 ? routine.days[currentIndex - 1] : null;
  const nextDay = currentIndex < routine.days.length - 1 ? routine.days[currentIndex + 1] : null;
  
  const progress = routineService.getDayProgress(tracking, day.dayNumber, day.exercises.length);

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 pb-6 pt-4">
      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <button
          onClick={onBack}
          className="mb-3 sm:mb-4 flex items-center gap-2 text-gym-text-secondary hover:text-gym-accent active:text-gym-accent transition-colors text-xs sm:text-sm touch-manipulation py-2"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver a vista semanal</span>
        </button>
        
        <div className="bg-gradient-to-r from-gym-accent/20 to-gym-accent-secondary/20 border border-gym-accent rounded-lg p-3 sm:p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gym-accent mb-1">
                {day.name}
              </h1>
              <p className="text-gym-text-secondary text-xs sm:text-sm">
                {day.focus}
              </p>
            </div>
            {progress.total > 0 && (
              <div className="text-right">
                <div className="text-lg sm:text-xl font-bold text-gym-accent">
                  {progress.percentage}%
                </div>
                <div className="text-xs text-gym-text-secondary">
                  {progress.completed}/{progress.total}
                </div>
              </div>
            )}
          </div>
          {progress.total > 0 && (
            <div className="w-full bg-gym-accent/20 rounded-full h-2 overflow-hidden mt-2">
              <div
                className="h-full bg-gym-accent transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
        {day.exercises.map((exercise, index) => {
          const completed = routineService.isExerciseCompleted(tracking, day.dayNumber, index);
          const weight = routineService.getExerciseWeight(tracking, day.dayNumber, index);
          const completedSets = routineService.getCompletedSets(tracking, day.dayNumber, index, exercise.sets);
          return (
            <ExerciseCard
              key={`${day.dayNumber}-${index}-${exercise.name}`}
              exercise={exercise}
              index={index}
              completed={completed}
              weight={weight}
              completedSets={completedSets}
              onToggleComplete={() => {
                onToggleExercise(day.dayNumber, index);
              }}
              onWeightChange={(newWeight) => {
                onWeightChange(day.dayNumber, index, newWeight);
              }}
              onShowInfo={() => {
                onShowExerciseInfo(exercise.name);
              }}
              onToggleSet={(setIndex) => {
                onToggleSet(day.dayNumber, index, setIndex);
              }}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-2 sm:gap-3">
        {previousDay && (
          <button
            onClick={() => onNavigateDay(previousDay.dayNumber)}
            className="flex-1 py-3 px-3 sm:px-4 bg-gym-card border border-gym-border rounded-lg text-gym-text hover:border-gym-accent/50 active:scale-95 transition-all text-xs sm:text-sm font-medium touch-manipulation min-h-[44px]"
          >
            ← {previousDay.name}
          </button>
        )}
        {nextDay && (
          <button
            onClick={() => onNavigateDay(nextDay.dayNumber)}
            className="flex-1 py-3 px-3 sm:px-4 bg-gym-card border border-gym-border rounded-lg text-gym-text hover:border-gym-accent/50 active:scale-95 transition-all text-xs sm:text-sm font-medium touch-manipulation min-h-[44px]"
          >
            {nextDay.name} →
          </button>
        )}
      </div>
    </div>
  );
};

