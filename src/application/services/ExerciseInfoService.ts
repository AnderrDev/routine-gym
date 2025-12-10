import { ExerciseInfo } from '../../domain/entities/ExerciseInfo';
import { ExerciseApiRepository } from '../../domain/ports/ExerciseApiRepository';

export class ExerciseInfoService {
  constructor(private apiRepository: ExerciseApiRepository) {}

  async getExerciseInfo(exerciseName: string): Promise<ExerciseInfo | null> {
    return await this.apiRepository.searchExercise(exerciseName);
  }
}

