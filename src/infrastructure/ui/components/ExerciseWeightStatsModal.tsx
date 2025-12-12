import { useState, useEffect } from 'react';
import { ExerciseWeightStats } from '../../../application/services/WeightStatsService';

interface ExerciseWeightStatsModalProps {
  exerciseName: string;
  stats: ExerciseWeightStats | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseWeightStatsModal = ({
  exerciseName,
  stats,
  isOpen,
  onClose,
}: ExerciseWeightStatsModalProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'day' | 'week' | 'month'>('all');
  const [filteredEntries, setFilteredEntries] = useState(stats?.entries || []);

  useEffect(() => {
    if (!stats) {
      setFilteredEntries([]);
      return;
    }

    const now = new Date();
    let startDate: Date;

    switch (selectedPeriod) {
      case 'day':
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        startDate = new Date(now.setDate(diff));
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        setFilteredEntries(stats.entries);
        return;
    }

    const filtered = stats.entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate;
    });

    setFilteredEntries(filtered);
  }, [selectedPeriod, stats]);

  if (!isOpen) return null;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return (
          <div className="flex items-center gap-1 text-green-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-sm font-medium">Subiendo</span>
          </div>
        );
      case 'down':
        return (
          <div className="flex items-center gap-1 text-red-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-sm font-medium">Bajando</span>
          </div>
        );
      case 'stable':
        return (
          <div className="flex items-center gap-1 text-yellow-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
            <span className="text-sm font-medium">Estable</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 text-gym-text-secondary">
            <span className="text-sm">Sin datos suficientes</span>
          </div>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderChart = () => {
    if (filteredEntries.length === 0) return null;

    const weights = filteredEntries.map(e => e.weight);
    const maxWeight = Math.max(...weights);
    const minWeight = Math.min(...weights);
    const range = maxWeight - minWeight || 1;
    const chartHeight = 200;

    return (
      <div className="mt-6 p-4 bg-gym-dark rounded-lg border border-gym-border">
        <div className="text-sm font-medium text-gym-text mb-4">
          Evolución del Peso
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
            {filteredEntries.length > 1 && (
              <polyline
                points={filteredEntries.map((entry, i) => {
                  const x = (i / (filteredEntries.length - 1 || 1)) * 100;
                  const y = chartHeight - ((entry.weight - minWeight) / range) * chartHeight;
                  return `${x}%,${y}`;
                }).join(' ')}
                fill="none"
                stroke="var(--gym-accent)"
                strokeWidth="3"
              />
            )}

            {/* Puntos */}
            {filteredEntries.map((entry, i) => {
              const x = (i / (filteredEntries.length - 1 || 1)) * 100;
              const y = chartHeight - ((entry.weight - minWeight) / range) * chartHeight;
              return (
                <g key={i}>
                  <circle
                    cx={`${x}%`}
                    cy={y}
                    r="6"
                    fill="var(--gym-accent)"
                    stroke="var(--gym-dark)"
                    strokeWidth="2"
                  />
                  <text
                    x={`${x}%`}
                    y={y - 10}
                    textAnchor="middle"
                    className="text-xs fill-gym-text-secondary"
                  >
                    {entry.weight.toFixed(1)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex justify-between mt-4 text-xs text-gym-text-secondary">
          <div className="text-left">
            <div>Mínimo: {minWeight.toFixed(1)} kg</div>
          </div>
          <div className="text-right">
            <div>Máximo: {maxWeight.toFixed(1)} kg</div>
          </div>
        </div>
      </div>
    );
  };

  const calculateStats = () => {
    if (filteredEntries.length === 0) {
      return {
        average: 0,
        max: 0,
        min: 0,
        change: 0,
        changePercent: 0,
      };
    }

    const weights = filteredEntries.map(e => e.weight);
    const average = weights.reduce((a, b) => a + b, 0) / weights.length;
    const max = Math.max(...weights);
    const min = Math.min(...weights);
    const first = weights[0];
    const last = weights[weights.length - 1];
    const change = last - first;
    const changePercent = first > 0 ? (change / first) * 100 : 0;

    return { average, max, min, change, changePercent };
  };

  const periodStats = calculateStats();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gym-dark rounded-lg border border-gym-border w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gym-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gym-text mb-2">
                {exerciseName}
              </h2>
              <p className="text-sm text-gym-text-secondary">
                Estadísticas de progreso de peso
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gym-text-secondary hover:text-gym-text transition-colors ml-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filtros de período */}
        <div className="p-4 border-b border-gym-border bg-gym-card">
          <div className="flex flex-wrap gap-2">
            {(['all', 'day', 'week', 'month'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  selectedPeriod === period
                    ? 'bg-gym-accent text-white'
                    : 'bg-gym-dark text-gym-text hover:bg-gym-card border border-gym-border'
                }`}
              >
                {period === 'all' ? 'Todo' : period === 'day' ? 'Día' : period === 'week' ? 'Semana' : 'Mes'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!stats || stats.entries.length === 0 ? (
            <div className="text-center py-12 text-gym-text-secondary">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>No hay datos de peso registrados para este ejercicio</p>
              <p className="text-xs mt-2">Comienza a registrar pesos para ver tu progreso</p>
            </div>
          ) : (
            <>
              {/* Estadísticas principales */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-gym-card border border-gym-border rounded-lg p-4">
                  <div className="text-xs text-gym-text-secondary mb-1">Peso Actual</div>
                  <div className="text-2xl font-bold text-gym-accent">
                    {stats.currentWeight?.toFixed(1) || '-'} kg
                  </div>
                </div>
                <div className="bg-gym-card border border-gym-border rounded-lg p-4">
                  <div className="text-xs text-gym-text-secondary mb-1">Promedio</div>
                  <div className="text-2xl font-bold text-gym-text">
                    {periodStats.average > 0 ? periodStats.average.toFixed(1) : '-'} kg
                  </div>
                </div>
                <div className="bg-gym-card border border-gym-border rounded-lg p-4">
                  <div className="text-xs text-gym-text-secondary mb-1">Máximo</div>
                  <div className="text-2xl font-bold text-green-500">
                    {periodStats.max > 0 ? periodStats.max.toFixed(1) : '-'} kg
                  </div>
                </div>
                <div className="bg-gym-card border border-gym-border rounded-lg p-4">
                  <div className="text-xs text-gym-text-secondary mb-1">Mínimo</div>
                  <div className="text-2xl font-bold text-red-500">
                    {periodStats.min > 0 ? periodStats.min.toFixed(1) : '-'} kg
                  </div>
                </div>
              </div>

              {/* Cambio y tendencia */}
              {filteredEntries.length >= 2 && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gym-card border border-gym-border rounded-lg p-4">
                    <div className="text-xs text-gym-text-secondary mb-1">Cambio</div>
                    <div className={`text-xl font-bold ${periodStats.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {periodStats.change >= 0 ? '+' : ''}{periodStats.change.toFixed(1)} kg
                    </div>
                    <div className="text-xs text-gym-text-secondary mt-1">
                      {periodStats.changePercent >= 0 ? '+' : ''}{periodStats.changePercent.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-gym-card border border-gym-border rounded-lg p-4">
                    <div className="text-xs text-gym-text-secondary mb-1">Tendencia</div>
                    {getTrendIcon(stats.trend)}
                  </div>
                </div>
              )}

              {/* Gráfico */}
              {renderChart()}

              {/* Historial detallado */}
              {filteredEntries.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gym-text mb-4">
                    Historial ({filteredEntries.length} registro{filteredEntries.length !== 1 ? 's' : ''})
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredEntries.map((entry, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-gym-card border border-gym-border rounded p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gym-accent"></div>
                          <div>
                            <div className="text-sm font-medium text-gym-text">
                              {formatDate(entry.date)}
                            </div>
                            <div className="text-xs text-gym-text-secondary">
                              Día {entry.dayNumber}
                            </div>
                          </div>
                        </div>
                        <div className="text-lg font-bold text-gym-accent">
                          {entry.weight.toFixed(1)} kg
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gym-border">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gym-accent text-white rounded hover:bg-gym-accent-secondary transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
