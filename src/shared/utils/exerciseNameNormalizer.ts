/**
 * Normaliza nombres de ejercicios para búsqueda consistente en la base de datos
 */

/**
 * Normaliza un nombre de ejercicio para búsqueda en la base de datos
 * - Convierte a minúsculas
 * - Normaliza caracteres especiales (→, —, etc.)
 * - Elimina espacios extra
 * - Normaliza variaciones de caracteres
 */
export function normalizeExerciseName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    // Normalizar caracteres especiales
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/\s+/g, ' ') // Múltiples espacios a uno solo
    .replace(/ez/gi, 'ez') // Mantener EZ como ez
    .replace(/rkc/gi, 'rkc') // Mantener RKC como rkc
    .replace(/v\s*o\s*neutro/gi, 'v o neutro') // Normalizar "V o neutro"
    .replace(/°/g, '°') // Mantener símbolo de grados
    .replace(/\(/g, '(')
    .replace(/\)/g, ')')
    .replace(/\+/g, '+');
}

/**
 * Mapeo de variaciones de nombres de ejercicios a sus claves normalizadas
 * Esto permite que diferentes formas de escribir el mismo ejercicio
 * se mapeen a la misma entrada en la base de datos
 * 
 * IMPORTANTE: Solo mapear cuando hay una variación clara que necesita
 * apuntar a una entrada específica. Si ambas variaciones existen como
 * entradas separadas, no mapear.
 */
export const exerciseNameVariations: Record<string, string> = {
  // Press militar variaciones - 'press militar' puede usar la entrada más específica
  // si no tiene su propia entrada completa
  'press militar': 'press militar barra o mancuernas',
  
  // Face pulls variaciones - 'face pull' singular mapea a plural
  'face pull': 'face pulls',
  
  // Elevaciones laterales variaciones - forma plural mapea a singular específico
  'elevaciones laterales': 'elevación lateral mancuerna',
  
  // Remo en polea baja - versión simple mapea a versión con agarre específico
  // cuando se requiere el agarre específico
  'remo en polea baja': 'remo en polea baja (agarre v o neutro)',
};

/**
 * Busca el nombre normalizado de un ejercicio, considerando variaciones
 */
export function getNormalizedExerciseKey(name: string): string {
  const normalized = normalizeExerciseName(name);
  
  // Primero verificar si hay una variación mapeada
  if (exerciseNameVariations[normalized]) {
    return exerciseNameVariations[normalized];
  }
  
  return normalized;
}
