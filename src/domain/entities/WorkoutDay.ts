import { Exercise } from './Exercise';

export interface WorkoutDay {
  dayNumber: number;
  name: string;
  focus: string;
  exercises: Exercise[];
}

