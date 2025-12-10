import { WorkoutDay } from '../../../domain/entities/WorkoutDay';

interface DayCardProps {
  day: WorkoutDay;
  isCurrentDay: boolean;
  onClick: () => void;
  progress?: { completed: number; total: number; percentage: number };
}

export const DayCard = ({ day, isCurrentDay, onClick, progress }: DayCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-3 sm:p-4 rounded-lg border transition-all duration-300 text-left
        active:scale-[0.98] touch-manipulation
        min-h-[100px] sm:min-h-[120px]
        ${isCurrentDay
          ? 'bg-gradient-to-br from-gym-accent/30 to-gym-accent-secondary/20 border-gym-accent shadow-lg shadow-gym-accent/20'
          : 'bg-gym-card border-gym-border hover:border-gym-accent/50 hover:bg-gym-card/80'
        }
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-bold text-base sm:text-lg ${isCurrentDay ? 'text-gym-accent' : 'text-gym-text'}`}>
          {day.name}
        </h3>
        <div className="flex items-center gap-2">
          {progress && progress.total > 0 && (
            <span className="text-xs font-medium text-gym-text-secondary">
              {progress.completed}/{progress.total}
            </span>
          )}
          {isCurrentDay && (
            <span className="px-2 py-1 text-xs font-bold bg-gym-accent text-white rounded-full animate-pulse whitespace-nowrap">
              HOY
            </span>
          )}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gym-text-secondary mb-2 sm:mb-3 line-clamp-2">
        {day.focus}
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-gym-text-secondary">
          <span className="font-medium text-gym-text">{day.exercises.length}</span>
          <span>ejercicios</span>
        </div>
        {progress && progress.total > 0 && (
          <div className="w-full bg-gym-border rounded-full h-1.5 sm:h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gym-accent to-gym-accent-secondary transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        )}
      </div>
    </button>
  );
};

