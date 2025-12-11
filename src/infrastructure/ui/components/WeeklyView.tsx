import { WeeklyRoutine } from '../../../domain/entities/WeeklyRoutine';
import { DayCard } from './DayCard';
import { RoutineService } from '../../../application/services/RoutineService';
import { RoutineTracking } from '../../../domain/entities/ExerciseTracking';

interface WeeklyViewProps {
  routine: WeeklyRoutine;
  tracking: RoutineTracking | null;
  onDayClick: (dayNumber: number) => void;
  routineService: RoutineService;
}

export const WeeklyView = ({ routine, tracking, onDayClick, routineService }: WeeklyViewProps) => {
  const currentDayNumber = routineService.getCurrentDayNumber();

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 pb-6 pt-4">
      <div className="mb-5 sm:mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gym-text mb-1 sm:mb-2">
          Rutina Semanal
        </h1>
        <p className="text-gym-text-secondary text-xs sm:text-sm">
          DEFINICIÓN + MASA
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {routine.days.map((day) => {
          const progress = routineService.getDayProgress(routine, tracking, day.dayNumber);
          return (
            <DayCard
              key={day.dayNumber}
              day={day}
              isCurrentDay={day.dayNumber === currentDayNumber}
              onClick={() => onDayClick(day.dayNumber)}
              progress={progress}
            />
          );
        })}
      </div>
    </div>
  );
};

