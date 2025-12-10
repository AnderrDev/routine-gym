import { ExerciseInfo, ExerciseSearchResult } from '../../domain/entities/ExerciseInfo';
import { ExerciseApiRepository } from '../../domain/ports/ExerciseApiRepository';

const WGER_API_BASE = 'https://wger.de/api/v2';
const WGER_BASE_URL = 'https://wger.de';

export class WgerExerciseApiRepository implements ExerciseApiRepository {
  private normalizeImageUrl(url: string): string {
    // Si la URL ya es absoluta, devolverla tal cual
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Si es relativa, completarla con el dominio base
    return `${WGER_BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
  }

  private normalizeExerciseData(exercise: ExerciseInfo): ExerciseInfo {
    // Normalizar URLs de imágenes
    if (exercise.images && exercise.images.length > 0) {
      exercise.images = exercise.images.map(img => ({
        ...img,
        image: this.normalizeImageUrl(img.image)
      }));
    }
    return exercise;
  }
  private normalizeExerciseName(name: string): string {
    // Normalizar nombres de ejercicios para mejor búsqueda
    const normalized = name
      .toLowerCase()
      .replace(/\(.*?\)/g, '') // Remover paréntesis
      .replace(/\s+/g, ' ') // Normalizar espacios
      .trim();
    
    // Mapeo de nombres comunes en español a términos de búsqueda
    const nameMappings: Record<string, string> = {
      'press banca barra': 'bench press',
      'press inclinado mancuernas': 'incline dumbbell press',
      'press militar': 'military press',
      'aperturas en polea': 'cable fly',
      'fondos': 'dips',
      'tríceps cuerda': 'tricep rope',
      'dominadas lastradas': 'weighted pull ups',
      'remo con barra': 'barbell row',
      'jalón cerrado': 'close grip pull down',
      'remo en polea': 'cable row',
      'face pulls': 'face pull',
      'curl bíceps barra': 'barbell curl',
      'curl martillo': 'hammer curl',
      'pullover polea': 'cable pullover',
      'sentadilla libre': 'squat',
      'prensa': 'leg press',
      'extensiones cuádriceps': 'leg extension',
      'zancadas': 'lunge',
      'gemelos de pie': 'calf raise',
      'press arnold': 'arnold press',
      'elevaciones laterales': 'lateral raise',
      'pájaros en polea': 'rear delt fly',
      'crunch en polea': 'cable crunch',
      'elevación de piernas': 'leg raise',
      'plancha': 'plank',
      'peso muerto rumano': 'romanian deadlift',
      'hip thrust': 'hip thrust',
      'curl femoral': 'leg curl',
      'sentadilla búlgara': 'bulgarian split squat',
      'gemelos sentado': 'seated calf raise',
      'puente glúteo': 'glute bridge',
      'sentadilla goblet': 'goblet squat',
      'remo polea baja': 'low cable row',
      'tríceps francés': 'french press',
    };

    return nameMappings[normalized] || normalized;
  }

  async searchExercise(exerciseName: string): Promise<ExerciseInfo | null> {
    try {
      const searchTerm = this.normalizeExerciseName(exerciseName);
      const url = `${WGER_API_BASE}/exercise/?name=${encodeURIComponent(searchTerm)}&language=2&limit=5`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ExerciseSearchResult = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Buscar el ejercicio más relevante (el primero suele ser el mejor match)
        let exercise: ExerciseInfo | null = data.results[0];
        
        // Si no tiene imágenes, intentar obtener más detalles
        if (!exercise.images || exercise.images.length === 0) {
          exercise = await this.getExerciseById(exercise.id);
          if (!exercise) return null;
        }
        
        return this.normalizeExerciseData(exercise);
      }

      return null;
    } catch (error) {
      console.error('Error searching exercise:', error);
      return null;
    }
  }

  async getExerciseById(id: number): Promise<ExerciseInfo | null> {
    try {
      const url = `${WGER_API_BASE}/exercise/${id}/?language=2`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const exercise: ExerciseInfo = await response.json();
      return this.normalizeExerciseData(exercise);
    } catch (error) {
      console.error('Error fetching exercise by ID:', error);
      return null;
    }
  }
}

