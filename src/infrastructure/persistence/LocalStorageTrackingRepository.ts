import { RoutineTracking } from '../../domain/entities/ExerciseTracking';
import { TrackingRepository } from '../../domain/ports/TrackingRepository';

const STORAGE_KEY = 'gym-routine-app-tracking';

export class LocalStorageTrackingRepository implements TrackingRepository {
  async save(tracking: RoutineTracking): Promise<void> {
    try {
      const serialized = JSON.stringify(tracking);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Error saving tracking to localStorage:', error);
      throw new Error('Failed to save tracking');
    }
  }

  async load(): Promise<RoutineTracking | null> {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        return null;
      }
      return JSON.parse(serialized) as RoutineTracking;
    } catch (error) {
      console.error('Error loading tracking from localStorage:', error);
      return null;
    }
  }
}

