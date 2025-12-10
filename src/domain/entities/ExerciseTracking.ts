export interface ExerciseTracking {
  dayNumber: number;
  exerciseIndex: number;
  completed: boolean;
  completedAt?: string; // ISO date string
  weight?: number; // Peso en kg
  completedSets?: boolean[]; // Array de series completadas [true, false, true, false] = serie 1 y 3 completadas
}

export interface DayTracking {
  dayNumber: number;
  exercises: ExerciseTracking[];
}

export interface RoutineTracking {
  days: DayTracking[];
}

