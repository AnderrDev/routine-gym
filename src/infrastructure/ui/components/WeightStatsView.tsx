import { useState } from 'react';
import { PeriodStats, ExerciseWeightStats } from '../../../application/services/WeightStatsService';

interface WeightStatsViewProps {
  stats: PeriodStats;
  onClose: () => void;
}

export const WeightStatsView = ({ stats, onClose }: WeightStatsViewProps) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseWeightStats | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');

  const exercisesWithData = stats.exercises.filter(e => e.entries.length > 0);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      case 'stable':
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPeriod = (period: string) => {
    switch (period) {
      case 'day':
        return 'Día';
      case 'week':
        return 'Semana';
      case 'month':
        return 'Mes';
      default:
        return period;
    }
  };

  const renderSimpleChart = (exercise: ExerciseWeightStats) => {
    if (exercise.entries.length === 0) return null;

    const maxWeight = exercise.maxWeight || 0;
    const minWeight = exercise.minWeight || 0;
    const range = maxWeight - minWeight || 1;
    const chartHeight = 100;

    return (
      <div className="mt-4 p-4 bg-gym-dark rounded-lg">
        <div className="text-xs text-gym-text-secondary mb-2">
          Evolución de peso
        </div>
        <div className="relative" style={{ height: `${chartHeight}px` }}>
          <svg width="100%" height={chartHeight} className="overflow-visible">
            {/* Líneas de referencia */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <line
                key={i}
                x1="0"
                y1={chartHeight * ratio}
                x2="100%"
                y2={chartHeight * ratio}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            ))}
            
            {/* Línea del gráfico */}
            <polyline
              points={exercise.entries.map((entry, i) => {
                const x = (i / (exercise.entries.length - 1 || 1)) * 100;
                const y = chartHeight - ((entry.weight - minWeight) / range) * chartHeight;
                return `${x}%,${y}`;
              }).join(' ')}
              fill="none"
              stroke="var(--gym-accent)"
              strokeWidth="2"
            />
            
            {/* Puntos */}
            {exercise.entries.map((entry, i) => {
              const x = (i / (exercise.entries.length - 1 || 1)) * 100;
              const y = chartHeight - ((entry.weight - minWeight) / range) * chartHeight;
              return (
                <circle
                  key={i}
                  cx={`${x}%`}
                  cy={y}
                  r="4"
                  fill="var(--gym-accent)"
                />
              );
            })}
          </svg>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gym-text-secondary">
          <span>{formatDate(exercise.entries[0]?.date || '')}</span>
          <span>{formatDate(exercise.entries[exercise.entries.length - 1]?.date || '')}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gym-dark rounded-lg border border-gym-border w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gym-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gym-text">
              Estadísticas de Pesos - {formatPeriod(stats.period)}
            </h2>
            <p className="text-sm text-gym-text-secondary mt-1">
              {formatDate(stats.startDate)} - {formatDate(stats.endDate)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gym-text-secondary hover:text-gym-text transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="p-4 border-b border-gym-border bg-gym-card">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gym-text-secondary">Total Ejercicios</div>
              <div className="text-2xl font-bold text-gym-accent">{stats.totalExercises}</div>
            </div>
            <div>
              <div className="text-xs text-gym-text-secondary">Con Registros</div>
              <div className="text-2xl font-bold text-gym-accent">{stats.exercisesWithWeight}</div>
            </div>
            <div>
              <div className="text-xs text-gym-text-secondary">Período</div>
              <div className="text-2xl font-bold text-gym-accent">{formatPeriod(stats.period)}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {exercisesWithData.length === 0 ? (
            <div className="text-center py-12 text-gym-text-secondary">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>No hay datos de pesos registrados para este período</p>
            </div>
          ) : (
            <div className="space-y-4">
              {exercisesWithData.map((exercise, index) => (
                <div
                  key={`${exercise.dayNumber}-${exercise.exerciseIndex}`}
                  className="bg-gym-card border border-gym-border rounded-lg p-4 hover:border-gym-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gym-text">{exercise.exerciseName}</h3>
                      <p className="text-xs text-gym-text-secondary mt-1">
                        Día {exercise.dayNumber} • {exercise.entries.length} registro{exercise.entries.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(exercise.trend)}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gym-text-secondary">Actual</div>
                      <div className="text-lg font-bold text-gym-accent">
                        {exercise.currentWeight?.toFixed(1) || '-'} kg
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gym-text-secondary">Promedio</div>
                      <div className="text-lg font-bold text-gym-text">
                        {exercise.averageWeight?.toFixed(1) || '-'} kg
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gym-text-secondary">Máximo</div>
                      <div className="text-lg font-bold text-green-500">
                        {exercise.maxWeight?.toFixed(1) || '-'} kg
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gym-text-secondary">Mínimo</div>
                      <div className="text-lg font-bold text-red-500">
                        {exercise.minWeight?.toFixed(1) || '-'} kg
                      </div>
                    </div>
                  </div>

                  {viewMode === 'chart' && renderSimpleChart(exercise)}

                  {exercise.entries.length > 0 && (
                    <details className="mt-3">
                      <summary className="text-xs text-gym-accent cursor-pointer hover:text-gym-accent-secondary">
                        Ver historial completo ({exercise.entries.length} registros)
                      </summary>
                      <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                        {exercise.entries.map((entry, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-xs bg-gym-dark p-2 rounded"
                          >
                            <span className="text-gym-text-secondary">{formatDate(entry.date)}</span>
                            <span className="font-medium text-gym-text">{entry.weight.toFixed(1)} kg</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gym-border flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'chart' : 'list')}
              className="px-3 py-1.5 text-sm bg-gym-card border border-gym-border rounded hover:border-gym-accent/50 transition-colors text-gym-text"
            >
              {viewMode === 'list' ? 'Ver Gráficos' : 'Ver Lista'}
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gym-accent text-white rounded hover:bg-gym-accent-secondary transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
