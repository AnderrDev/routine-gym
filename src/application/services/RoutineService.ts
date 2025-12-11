import { WeeklyRoutine } from '../../domain/entities/WeeklyRoutine';
import { RoutineRepository } from '../../domain/ports/RoutineRepository';
import { RoutineTracking, ExerciseTracking } from '../../domain/entities/ExerciseTracking';
import { TrackingRepository } from '../../domain/ports/TrackingRepository';

export class RoutineService {
  constructor(
    private repository: RoutineRepository,
    private trackingRepository: TrackingRepository
  ) {}

  async saveRoutine(routine: WeeklyRoutine): Promise<void> {
    await this.repository.save(routine);
  }

  async loadRoutine(): Promise<WeeklyRoutine | null> {
    return await this.repository.load();
  }

  getDayByNumber(routine: WeeklyRoutine, dayNumber: number) {
    return routine.days.find(day => day.dayNumber === dayNumber);
  }

  getCurrentDayNumber(): number {
    const today = new Date().getDay();
    // Convertir domingo (0) a 7, y ajustar para que lunes sea 1
    return today === 0 ? 7 : today;
  }

  // Tracking methods
  async saveTracking(tracking: RoutineTracking): Promise<void> {
    await this.trackingRepository.save(tracking);
  }

  async loadTracking(): Promise<RoutineTracking | null> {
    return await this.trackingRepository.load();
  }

  async toggleExerciseTracking(
    routine: WeeklyRoutine,
    currentTracking: RoutineTracking | null,
    dayNumber: number,
    exerciseIndex: number
  ): Promise<RoutineTracking> {
    // Obtener el ejercicio para saber cuántas series tiene
    const day = this.getDayByNumber(routine, dayNumber);
    if (!day) {
      throw new Error('Día no encontrado');
    }
    const exercise = day.exercises[exerciseIndex];
    if (!exercise) {
      throw new Error('Ejercicio no encontrado');
    }
    const totalSets = exercise.sets;

    // Crear una copia profunda del tracking para evitar mutaciones
    const baseTracking = currentTracking || this.initializeTracking(routine);
    const tracking: RoutineTracking = JSON.parse(JSON.stringify(baseTracking));
    
    // Buscar o crear el día
    let dayTracking = tracking.days.find(d => d.dayNumber === dayNumber);
    
    if (!dayTracking) {
      dayTracking = {
        dayNumber,
        exercises: [],
      };
      tracking.days.push(dayTracking);
    }

    // Buscar el ejercicio existente
    const existingIndex = dayTracking.exercises.findIndex(
      e => e.exerciseIndex === exerciseIndex
    );

    let exerciseTracking: ExerciseTracking;
    if (existingIndex >= 0) {
      // Si existe, toggle el estado
      const currentCompleted = dayTracking.exercises[existingIndex].completed;
      const newCompleted = !currentCompleted;
      
      // Para finishers, no crear tracking de series
      const completedSets = exercise.isFinisher 
        ? undefined 
        : new Array(totalSets).fill(newCompleted);
      
      exerciseTracking = {
        ...dayTracking.exercises[existingIndex],
        dayNumber,
        exerciseIndex,
        completed: newCompleted,
        completedAt: newCompleted ? new Date().toISOString() : undefined,
        completedSets: completedSets,
      };
      
      dayTracking.exercises[existingIndex] = exerciseTracking;
    } else {
      // Si no existe, crear nuevo con estado completado
      // Para finishers, no crear tracking de series
      const completedSets = exercise.isFinisher 
        ? undefined 
        : new Array(totalSets).fill(true);
      exerciseTracking = {
        dayNumber,
        exerciseIndex,
        completed: true,
        completedAt: new Date().toISOString(),
        completedSets: completedSets,
      };
      dayTracking.exercises.push(exerciseTracking);
    }

    await this.saveTracking(tracking);
    return tracking;
  }

  initializeTracking(routine: WeeklyRoutine): RoutineTracking {
    return {
      days: routine.days.map(day => ({
        dayNumber: day.dayNumber,
        exercises: [],
      })),
    };
  }

  isExerciseCompleted(
    tracking: RoutineTracking | null,
    dayNumber: number,
    exerciseIndex: number
  ): boolean {
    if (!tracking) return false;
    
    const dayTracking = tracking.days.find(d => d.dayNumber === dayNumber);
    if (!dayTracking) return false;

    const exerciseTracking = dayTracking.exercises.find(
      e => e.exerciseIndex === exerciseIndex
    );
    
    return exerciseTracking?.completed || false;
  }

  getDayProgress(
    routine: WeeklyRoutine,
    tracking: RoutineTracking | null,
    dayNumber: number
  ): { completed: number; total: number; percentage: number } {
    const day = this.getDayByNumber(routine, dayNumber);
    if (!day) {
      return { completed: 0, total: 0, percentage: 0 };
    }

    // Excluir finishers del cálculo de progreso
    const nonFinisherExercises = day.exercises.filter(ex => !ex.isFinisher);
    const totalExercises = nonFinisherExercises.length;

    if (totalExercises === 0) {
      return { completed: 0, total: 0, percentage: 0 };
    }

    if (!tracking) {
      return { completed: 0, total: totalExercises, percentage: 0 };
    }

    const dayTracking = tracking.days.find(d => d.dayNumber === dayNumber);
    if (!dayTracking) {
      return { completed: 0, total: totalExercises, percentage: 0 };
    }

    // Contar solo ejercicios no finisher completados
    const completed = nonFinisherExercises.filter((exercise) => {
      const exerciseIndex = day.exercises.findIndex(ex => ex === exercise);
      if (exerciseIndex === -1) return false;
      const exerciseTracking = dayTracking.exercises.find(
        e => e.exerciseIndex === exerciseIndex
      );
      return exerciseTracking?.completed || false;
    }).length;

    const percentage = Math.round((completed / totalExercises) * 100);

    return { completed, total: totalExercises, percentage };
  }

  isDayFullyCompleted(
    routine: WeeklyRoutine,
    tracking: RoutineTracking | null,
    dayNumber: number
  ): boolean {
    const day = this.getDayByNumber(routine, dayNumber);
    if (!day || !tracking) {
      return false;
    }

    const dayTracking = tracking.days.find(d => d.dayNumber === dayNumber);
    if (!dayTracking) {
      return false;
    }

    // Verificar que TODOS los ejercicios estén completados (incluyendo finishers)
    return day.exercises.every((_, exerciseIndex) => {
      const exerciseTracking = dayTracking.exercises.find(
        e => e.exerciseIndex === exerciseIndex
      );
      return exerciseTracking?.completed || false;
    });
  }

  getExerciseWeight(
    tracking: RoutineTracking | null,
    dayNumber: number,
    exerciseIndex: number
  ): number | undefined {
    if (!tracking) return undefined;
    
    const dayTracking = tracking.days.find(d => d.dayNumber === dayNumber);
    if (!dayTracking) return undefined;

    const exerciseTracking = dayTracking.exercises.find(
      e => e.exerciseIndex === exerciseIndex
    );
    
    return exerciseTracking?.weight;
  }

  async updateExerciseWeight(
    routine: WeeklyRoutine,
    currentTracking: RoutineTracking | null,
    dayNumber: number,
    exerciseIndex: number,
    weight: number | undefined
  ): Promise<RoutineTracking> {
    // Crear una copia profunda del tracking
    const baseTracking = currentTracking || this.initializeTracking(routine);
    const tracking: RoutineTracking = JSON.parse(JSON.stringify(baseTracking));
    
    // Buscar o crear el día
    let dayTracking = tracking.days.find(d => d.dayNumber === dayNumber);
    
    if (!dayTracking) {
      dayTracking = {
        dayNumber,
        exercises: [],
      };
      tracking.days.push(dayTracking);
    }

    // Buscar el ejercicio existente
    const existingIndex = dayTracking.exercises.findIndex(
      e => e.exerciseIndex === exerciseIndex
    );

    if (existingIndex >= 0) {
      // Si existe, actualizar el peso
      dayTracking.exercises[existingIndex] = {
        ...dayTracking.exercises[existingIndex],
        weight: weight,
      };
    } else {
      // Si no existe, crear nuevo con el peso
      dayTracking.exercises.push({
        dayNumber,
        exerciseIndex,
        completed: false,
        weight: weight,
      });
    }

    await this.saveTracking(tracking);
    return tracking;
  }

  getCompletedSets(
    tracking: RoutineTracking | null,
    dayNumber: number,
    exerciseIndex: number,
    totalSets: number
  ): boolean[] {
    if (!tracking) {
      return new Array(totalSets).fill(false);
    }
    
    const dayTracking = tracking.days.find(d => d.dayNumber === dayNumber);
    if (!dayTracking) {
      return new Array(totalSets).fill(false);
    }

    const exerciseTracking = dayTracking.exercises.find(
      e => e.exerciseIndex === exerciseIndex
    );
    
    if (!exerciseTracking || !exerciseTracking.completedSets) {
      return new Array(totalSets).fill(false);
    }

    // Asegurar que el array tenga el tamaño correcto
    const completedSets = [...exerciseTracking.completedSets];
    while (completedSets.length < totalSets) {
      completedSets.push(false);
    }
    return completedSets.slice(0, totalSets);
  }

  async toggleSet(
    routine: WeeklyRoutine,
    currentTracking: RoutineTracking | null,
    dayNumber: number,
    exerciseIndex: number,
    setIndex: number,
    totalSets: number
  ): Promise<RoutineTracking> {
    // Crear una copia profunda del tracking
    const baseTracking = currentTracking || this.initializeTracking(routine);
    const tracking: RoutineTracking = JSON.parse(JSON.stringify(baseTracking));
    
    // Buscar o crear el día
    let dayTracking = tracking.days.find(d => d.dayNumber === dayNumber);
    
    if (!dayTracking) {
      dayTracking = {
        dayNumber,
        exercises: [],
      };
      tracking.days.push(dayTracking);
    }

    // Buscar el ejercicio existente
    const existingIndex = dayTracking.exercises.findIndex(
      e => e.exerciseIndex === exerciseIndex
    );

    let exerciseTracking: ExerciseTracking;
    if (existingIndex >= 0) {
      exerciseTracking = { ...dayTracking.exercises[existingIndex] };
    } else {
      exerciseTracking = {
        dayNumber,
        exerciseIndex,
        completed: false,
        completedSets: new Array(totalSets).fill(false),
      };
    }

    // Inicializar completedSets si no existe
    if (!exerciseTracking.completedSets) {
      exerciseTracking.completedSets = new Array(totalSets).fill(false);
    }

    // Asegurar que el array tenga el tamaño correcto
    while (exerciseTracking.completedSets.length < totalSets) {
      exerciseTracking.completedSets.push(false);
    }

    // Toggle la serie específica
    exerciseTracking.completedSets[setIndex] = !exerciseTracking.completedSets[setIndex];

    // Actualizar el estado completado del ejercicio (si todas las series están completadas)
    const allSetsCompleted = exerciseTracking.completedSets.slice(0, totalSets).every(set => set === true);
    exerciseTracking.completed = allSetsCompleted;
    if (allSetsCompleted && !exerciseTracking.completedAt) {
      exerciseTracking.completedAt = new Date().toISOString();
    } else if (!allSetsCompleted) {
      exerciseTracking.completedAt = undefined;
    }

    if (existingIndex >= 0) {
      dayTracking.exercises[existingIndex] = exerciseTracking;
    } else {
      dayTracking.exercises.push(exerciseTracking);
    }

    await this.saveTracking(tracking);
    return tracking;
  }

  getSetsProgress(
    tracking: RoutineTracking | null,
    dayNumber: number,
    exerciseIndex: number,
    totalSets: number
  ): { completed: number; total: number } {
    const completedSets = this.getCompletedSets(tracking, dayNumber, exerciseIndex, totalSets);
    const completed = completedSets.filter(set => set === true).length;
    return { completed, total: totalSets };
  }
}

