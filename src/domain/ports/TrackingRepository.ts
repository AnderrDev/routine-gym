import { RoutineTracking } from '../entities/ExerciseTracking';

export interface TrackingRepository {
  save(tracking: RoutineTracking): Promise<void>;
  load(): Promise<RoutineTracking | null>;
}

