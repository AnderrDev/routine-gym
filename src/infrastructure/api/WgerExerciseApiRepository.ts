import { ExerciseInfo } from '../../domain/entities/ExerciseInfo';
import { ExerciseApiRepository } from '../../domain/ports/ExerciseApiRepository';
import { exerciseDatabase } from '../../shared/constants/exerciseDatabase';

export class WgerExerciseApiRepository implements ExerciseApiRepository {
  async searchExercise(exerciseName: string): Promise<ExerciseInfo | null> {
    // Buscar en la base de datos local
    const normalizedName = exerciseName.toLowerCase().trim();
    const dbEntry = exerciseDatabase[normalizedName];
    
    if (dbEntry) {
      return {
        id: 0,
        name: dbEntry.name,
        description: dbEntry.description,
        instructions: dbEntry.instructions.join('\n'),
        muscles: [],
        muscles_secondary: [],
        equipment: [],
        images: [],
        category: 0,
      };
    }

    // Si no está en la base de datos, retornar null
    return null;
  }

  async getExerciseById(_id: number): Promise<ExerciseInfo | null> {
    // No se usa este método con la base de datos local
    return null;
  }
}

