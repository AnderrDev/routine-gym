import { ExerciseInfo, ExerciseSearchResult } from '../../domain/entities/ExerciseInfo';
import { ExerciseApiRepository } from '../../domain/ports/ExerciseApiRepository';
import { exerciseDatabase } from '../../shared/constants/exerciseDatabase';

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
    // Primero buscar en la base de datos local
    const normalizedName = exerciseName.toLowerCase().trim();
    const dbEntry = exerciseDatabase[normalizedName];
    
    if (dbEntry) {
      console.log('Ejercicio encontrado en base de datos local:', normalizedName);
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

    // Si no está en la base de datos local, intentar con la API
    try {
      const searchTerm = this.normalizeExerciseName(exerciseName);
      
      // Intentar múltiples estrategias de búsqueda
      const searchStrategies = [
        // Estrategia 1: Búsqueda exacta
        `${WGER_API_BASE}/exercise/?name=${encodeURIComponent(searchTerm)}&language=2&limit=10`,
        // Estrategia 2: Búsqueda más amplia (sin language filter)
        `${WGER_API_BASE}/exercise/?name=${encodeURIComponent(searchTerm)}&limit=10`,
        // Estrategia 3: Búsqueda con término original si fue normalizado
        exerciseName !== searchTerm ? `${WGER_API_BASE}/exercise/?name=${encodeURIComponent(exerciseName)}&limit=10` : null,
      ].filter(Boolean) as string[];

      for (const url of searchStrategies) {
        try {
          console.log('Buscando ejercicio:', searchTerm, 'URL:', url);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });
          
          if (!response.ok) {
            console.warn('Error en respuesta HTTP:', response.status, response.statusText);
            continue; // Intentar siguiente estrategia
          }

          const data: ExerciseSearchResult = await response.json();
          console.log('Resultados de búsqueda:', data);
          
          if (data.results && data.results.length > 0) {
            // Buscar el ejercicio más relevante (el primero suele ser el mejor match)
            const exerciseBase = data.results[0];
            
            console.log('Ejercicio base encontrado:', exerciseBase, 'ID:', exerciseBase.id);
            
            // Siempre obtener detalles completos con traducciones
            const exercise = await this.getExerciseById(exerciseBase.id);
            if (!exercise) {
              continue; // Intentar siguiente estrategia
            }
            
            const normalized = this.normalizeExerciseData(exercise);
            console.log('Ejercicio normalizado:', normalized);
            return normalized;
          }
        } catch (strategyError) {
          console.warn('Error en estrategia de búsqueda:', strategyError);
          continue; // Intentar siguiente estrategia
        }
      }

      console.log('No se encontraron resultados para:', searchTerm);
      return null;
    } catch (error) {
      console.error('Error searching exercise:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('Error de CORS o red. La API puede no estar disponible.');
      }
      return null;
    }
  }

  async getExerciseById(id: number): Promise<ExerciseInfo | null> {
    try {
      // Obtener el ejercicio base
      const baseUrl = `${WGER_API_BASE}/exercise/${id}/`;
      console.log('Obteniendo ejercicio por ID:', id, 'URL:', baseUrl);
      
      const baseResponse = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!baseResponse.ok) {
        console.error('Error en respuesta HTTP:', baseResponse.status, baseResponse.statusText);
        throw new Error(`HTTP error! status: ${baseResponse.status}`);
      }

      const exerciseBase: any = await baseResponse.json();
      console.log('Ejercicio base obtenido:', exerciseBase);

      // Obtener traducciones en español (language=2) o inglés (language=1)
      const translationUrl = `${WGER_API_BASE}/exerciseinfo/${id}/?language=2`;
      console.log('Obteniendo traducción:', translationUrl);
      
      let exerciseInfo: any = { ...exerciseBase };
      
      try {
        const translationResponse = await fetch(translationUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (translationResponse.ok) {
          const translation = await translationResponse.json();
          console.log('Traducción obtenida:', translation);
          
          // Combinar datos base con traducción
          if (translation.name) exerciseInfo.name = translation.name;
          if (translation.description) exerciseInfo.description = translation.description;
          if (translation.instructions) exerciseInfo.instructions = translation.instructions;
        } else {
          // Intentar con inglés si español no está disponible
          const translationUrlEn = `${WGER_API_BASE}/exerciseinfo/${id}/?language=1`;
          const translationResponseEn = await fetch(translationUrlEn);
          if (translationResponseEn.ok) {
            const translation = await translationResponseEn.json();
            console.log('Traducción en inglés obtenida:', translation);
            if (translation.name) exerciseInfo.name = translation.name;
            if (translation.description) exerciseInfo.description = translation.description;
            if (translation.instructions) exerciseInfo.instructions = translation.instructions;
          }
        }
      } catch (translationError) {
        console.warn('Error obteniendo traducción, usando datos base:', translationError);
      }

      // Obtener imágenes si existen
      if (exerciseBase.images && exerciseBase.images.length > 0) {
        exerciseInfo.images = exerciseBase.images;
      } else {
        // Intentar obtener imágenes desde el endpoint de imágenes
        try {
          const imagesUrl = `${WGER_API_BASE}/exerciseimage/?exercise=${id}`;
          const imagesResponse = await fetch(imagesUrl);
          if (imagesResponse.ok) {
            const imagesData = await imagesResponse.json();
            if (imagesData.results && imagesData.results.length > 0) {
              exerciseInfo.images = imagesData.results.map((img: any) => ({
                id: img.id,
                image: this.normalizeImageUrl(img.image),
                is_main: img.is_main || false,
              }));
            }
          }
        } catch (imagesError) {
          console.warn('Error obteniendo imágenes:', imagesError);
        }
      }

      console.log('Ejercicio final:', exerciseInfo);
      return this.normalizeExerciseData(exerciseInfo as ExerciseInfo);
    } catch (error) {
      console.error('Error fetching exercise by ID:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('Error de CORS o red. La API puede no estar disponible.');
      }
      return null;
    }
  }
}

