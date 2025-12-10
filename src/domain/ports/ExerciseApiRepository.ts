import { ExerciseInfo, ExerciseSearchResult } from '../entities/ExerciseInfo';

export interface ExerciseApiRepository {
  searchExercise(exerciseName: string): Promise<ExerciseInfo | null>;
  getExerciseById(id: number): Promise<ExerciseInfo | null>;
}

