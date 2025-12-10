export interface ExerciseImage {
  id: number;
  image: string; // URL de la imagen
  is_main: boolean;
}

export interface ExerciseInfo {
  id: number;
  name: string;
  description: string;
  instructions: string;
  muscles: number[]; // IDs de músculos trabajados
  muscles_secondary: number[]; // IDs de músculos secundarios
  equipment: number[]; // IDs de equipamiento necesario
  images: ExerciseImage[];
  category: number; // ID de categoría
}

export interface ExerciseSearchResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExerciseInfo[];
}

