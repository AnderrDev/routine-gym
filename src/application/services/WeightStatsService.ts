import { RoutineTracking, WeightHistoryEntry } from '../../domain/entities/ExerciseTracking';
import { WeeklyRoutine } from '../../domain/entities/WeeklyRoutine';

export interface ExerciseWeightStats {
  exerciseName: string;
  exerciseIndex: number;
  dayNumber: number;
  currentWeight?: number;
  entries: WeightHistoryEntry[];
  averageWeight?: number;
  maxWeight?: number;
  minWeight?: number;
  trend: 'up' | 'down' | 'stable' | 'none'; // Tendencia basada en últimos registros
  firstRecordedDate?: string;
  lastRecordedDate?: string;
}

export interface PeriodStats {
  period: 'day' | 'week' | 'month';
  startDate: string;
  endDate: string;
  exercises: ExerciseWeightStats[];
  totalExercises: number;
  exercisesWithWeight: number;
}

export class WeightStatsService {
  /**
   * Obtiene estadísticas de pesos para un período específico
   */
  getPeriodStats(
    routine: WeeklyRoutine,
    tracking: RoutineTracking | null,
    period: 'day' | 'week' | 'month',
    referenceDate: Date = new Date()
  ): PeriodStats {
    const { startDate, endDate } = this.getPeriodDates(period, referenceDate);
    
    const exercises: ExerciseWeightStats[] = [];
    const exerciseMap = new Map<string, ExerciseWeightStats>();

    if (!tracking) {
      return {
        period,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        exercises: [],
        totalExercises: 0,
        exercisesWithWeight: 0,
      };
    }

    // Recorrer todos los días de la rutina
    routine.days.forEach(day => {
      day.exercises.forEach((exercise, exerciseIndex) => {
        const key = `${day.dayNumber}-${exerciseIndex}`;
        
        // Buscar tracking para este ejercicio
        const dayTracking = tracking.days.find(d => d.dayNumber === day.dayNumber);
        const exerciseTracking = dayTracking?.exercises.find(
          e => e.exerciseIndex === exerciseIndex
        );

        if (!exerciseTracking) return;

        // Filtrar historial por período
        const filteredHistory = (exerciseTracking.weightHistory || []).filter(entry => {
          const entryDate = new Date(entry.date);
          return entryDate >= startDate && entryDate <= endDate;
        });

        if (filteredHistory.length === 0 && !exerciseTracking.weight) return;

        // Obtener o crear estadísticas para este ejercicio
        let stats = exerciseMap.get(key);
        if (!stats) {
          stats = {
            exerciseName: exercise.name,
            exerciseIndex,
            dayNumber: day.dayNumber,
            entries: [],
            trend: 'none',
          };
          exerciseMap.set(key, stats);
        }

        // Agregar entradas del historial
        stats.entries.push(...filteredHistory);
        
        // Si hay peso actual y está en el período, agregarlo también
        if (exerciseTracking.weight) {
          const weightDate = exerciseTracking.completedAt 
            ? new Date(exerciseTracking.completedAt)
            : new Date();
          
          if (weightDate >= startDate && weightDate <= endDate) {
            // Verificar si ya existe en el historial
            const exists = filteredHistory.some(
              e => new Date(e.date).toDateString() === weightDate.toDateString() && 
                   e.weight === exerciseTracking.weight
            );
            
            if (!exists) {
              stats.entries.push({
                weight: exerciseTracking.weight,
                date: weightDate.toISOString(),
                dayNumber: day.dayNumber,
              });
            }
          }
        }
      });
    });

    // Calcular estadísticas para cada ejercicio
    const statsArray = Array.from(exerciseMap.values()).map(stats => {
      if (stats.entries.length === 0) return stats;

      // Ordenar por fecha
      stats.entries.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Calcular estadísticas
      const weights = stats.entries.map(e => e.weight);
      stats.averageWeight = weights.reduce((a, b) => a + b, 0) / weights.length;
      stats.maxWeight = Math.max(...weights);
      stats.minWeight = Math.min(...weights);
      stats.currentWeight = stats.entries[stats.entries.length - 1]?.weight;
      stats.firstRecordedDate = stats.entries[0]?.date;
      stats.lastRecordedDate = stats.entries[stats.entries.length - 1]?.date;

      // Calcular tendencia (comparar últimos 2-3 registros)
      if (stats.entries.length >= 2) {
        const recent = stats.entries.slice(-3);
        const first = recent[0].weight;
        const last = recent[recent.length - 1].weight;
        const diff = last - first;
        const threshold = 0.5; // kg

        if (diff > threshold) {
          stats.trend = 'up';
        } else if (diff < -threshold) {
          stats.trend = 'down';
        } else {
          stats.trend = 'stable';
        }
      }

      return stats;
    });

    return {
      period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      exercises: statsArray,
      totalExercises: statsArray.length,
      exercisesWithWeight: statsArray.filter(e => e.entries.length > 0).length,
    };
  }

  /**
   * Obtiene estadísticas agrupadas por ejercicio (todas las fechas)
   */
  getExerciseStats(
    routine: WeeklyRoutine,
    tracking: RoutineTracking | null,
    exerciseName: string
  ): ExerciseWeightStats | null {
    if (!tracking) return null;

    let foundStats: ExerciseWeightStats | null = null;

    routine.days.forEach(day => {
      day.exercises.forEach((exercise, exerciseIndex) => {
        if (exercise.name !== exerciseName) return;

        const dayTracking = tracking.days.find(d => d.dayNumber === day.dayNumber);
        const exerciseTracking = dayTracking?.exercises.find(
          e => e.exerciseIndex === exerciseIndex
        );

        if (!exerciseTracking) return;

        if (!foundStats) {
          foundStats = {
            exerciseName: exercise.name,
            exerciseIndex,
            dayNumber: day.dayNumber,
            entries: [],
            trend: 'none',
          };
        }

        // Agregar historial
        if (exerciseTracking.weightHistory) {
          foundStats.entries.push(...exerciseTracking.weightHistory);
        }

        // Agregar peso actual si existe
        if (exerciseTracking.weight) {
          const weightDate = exerciseTracking.completedAt 
            ? new Date(exerciseTracking.completedAt)
            : new Date();
          
          foundStats.entries.push({
            weight: exerciseTracking.weight,
            date: weightDate.toISOString(),
            dayNumber: day.dayNumber,
          });
        }
      });
    });

    if (!foundStats || foundStats.entries.length === 0) return null;

    // Ordenar y calcular estadísticas
    foundStats.entries.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const weights = foundStats.entries.map(e => e.weight);
    foundStats.averageWeight = weights.reduce((a, b) => a + b, 0) / weights.length;
    foundStats.maxWeight = Math.max(...weights);
    foundStats.minWeight = Math.min(...weights);
    foundStats.currentWeight = foundStats.entries[foundStats.entries.length - 1]?.weight;
    foundStats.firstRecordedDate = foundStats.entries[0]?.date;
    foundStats.lastRecordedDate = foundStats.entries[foundStats.entries.length - 1]?.date;

    // Calcular tendencia
    if (foundStats.entries.length >= 2) {
      const recent = foundStats.entries.slice(-3);
      const first = recent[0].weight;
      const last = recent[recent.length - 1].weight;
      const diff = last - first;
      const threshold = 0.5;

      if (diff > threshold) {
        foundStats.trend = 'up';
      } else if (diff < -threshold) {
        foundStats.trend = 'down';
      } else {
        foundStats.trend = 'stable';
      }
    }

    return foundStats;
  }

  /**
   * Calcula las fechas de inicio y fin para un período
   */
  private getPeriodDates(
    period: 'day' | 'week' | 'month',
    referenceDate: Date
  ): { startDate: Date; endDate: Date } {
    const startDate = new Date(referenceDate);
    const endDate = new Date(referenceDate);

    switch (period) {
      case 'day':
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'week':
        // Lunes a domingo
        const day = startDate.getDay();
        const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Ajustar a lunes
        startDate.setDate(diff);
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(diff + 6);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'month':
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // Último día del mes
        endDate.setHours(23, 59, 59, 999);
        break;
    }

    return { startDate, endDate };
  }
}
