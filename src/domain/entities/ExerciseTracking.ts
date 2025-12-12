export interface WeightHistoryEntry {
  weight: number;
  date: string; // ISO date string
  dayNumber: number;
}

export interface ExerciseTracking {
  dayNumber: number;
  exerciseIndex: number;
  completed: boolean;
  completedAt?: string; // ISO date string
  weight?: number; // Peso actual en kg
  weightHistory?: WeightHistoryEntry[]; // Historial de pesos con timestamps
  completedSets?: boolean[]; // Array de series completadas [true, false, true, false] = serie 1 y 3 completadas
}

export interface DayTracking {
  dayNumber: number;
  exercises: ExerciseTracking[];
}

export interface RoutineTracking {
  days: DayTracking[];
}

