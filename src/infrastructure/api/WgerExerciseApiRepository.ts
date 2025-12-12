import { ExerciseInfo } from '../../domain/entities/ExerciseInfo';
import { ExerciseApiRepository } from '../../domain/ports/ExerciseApiRepository';
import { exerciseDatabase } from '../../shared/constants/exerciseDatabase';
import { getNormalizedExerciseKey, normalizeExerciseName } from '../../shared/utils/exerciseNameNormalizer';

export class WgerExerciseApiRepository implements ExerciseApiRepository {
  async searchExercise(exerciseName: string): Promise<ExerciseInfo | null> {
    // Normalizar el nombre usando la función de normalización
    const normalizedKey = getNormalizedExerciseKey(exerciseName);
    
    // Buscar primero con la clave normalizada (que puede incluir variaciones)
    let dbEntry = exerciseDatabase[normalizedKey];
    
    // Si no se encuentra, intentar búsqueda directa normalizada
    if (!dbEntry) {
      const directNormalized = normalizeExerciseName(exerciseName);
      dbEntry = exerciseDatabase[directNormalized];
    }
    
    // Si aún no se encuentra, intentar búsqueda flexible (sin caracteres especiales)
    if (!dbEntry) {
      const flexibleKey = normalizeExerciseName(exerciseName)
        .replace(/[()]/g, '') // Eliminar paréntesis
        .replace(/\s+/g, ' ')
        .trim();
      
      // Buscar en todas las claves de la base de datos
      for (const [key, value] of Object.entries(exerciseDatabase)) {
        const normalizedKey = normalizeExerciseName(key)
          .replace(/[()]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        
        if (normalizedKey === flexibleKey) {
          dbEntry = value;
          break;
        }
      }
    }
    
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

