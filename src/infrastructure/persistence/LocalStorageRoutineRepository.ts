import { WeeklyRoutine } from '../../domain/entities/WeeklyRoutine';
import { RoutineRepository } from '../../domain/ports/RoutineRepository';

const STORAGE_KEY = 'gym-routine-app-routine';

export class LocalStorageRoutineRepository implements RoutineRepository {
  async save(routine: WeeklyRoutine): Promise<void> {
    try {
      const serialized = JSON.stringify(routine);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Error saving routine to localStorage:', error);
      throw new Error('Failed to save routine');
    }
  }

  async load(): Promise<WeeklyRoutine | null> {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        return null;
      }
      return JSON.parse(serialized) as WeeklyRoutine;
    } catch (error) {
      console.error('Error loading routine from localStorage:', error);
      return null;
    }
  }
}

