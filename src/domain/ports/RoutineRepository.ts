import { WeeklyRoutine } from '../entities/WeeklyRoutine';

export interface RoutineRepository {
  save(routine: WeeklyRoutine): Promise<void>;
  load(): Promise<WeeklyRoutine | null>;
}

