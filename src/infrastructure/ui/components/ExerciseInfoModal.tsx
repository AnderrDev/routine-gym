import { useEffect } from 'react';
import { ExerciseInfo } from '../../../domain/entities/ExerciseInfo';

interface ExerciseInfoModalProps {
  exerciseInfo: ExerciseInfo | null;
  exerciseName: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

export const ExerciseInfoModal = ({ 
  exerciseInfo, 
  exerciseName, 
  isOpen, 
  isLoading = false,
  onClose 
}: ExerciseInfoModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mainImage = exerciseInfo?.images?.find(img => img.is_main) || exerciseInfo?.images?.[0];
  const secondaryImages = exerciseInfo?.images?.filter(img => !img.is_main) || [];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-gym-card border border-gym-border rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gym-border">
          <h2 className="text-xl sm:text-2xl font-bold text-gym-text">
            {exerciseInfo?.name || exerciseName}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gym-border transition-colors text-gym-text-secondary hover:text-gym-text"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="w-12 h-12 mx-auto border-4 border-gym-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-gym-text-secondary">Buscando información del ejercicio...</p>
            </div>
          ) : exerciseInfo ? (
            <>
              {/* Main Image */}
              {mainImage && (
                <div className="mb-4 rounded-lg overflow-hidden bg-gym-dark">
                  <img
                    src={mainImage.image}
                    alt={exerciseInfo.name}
                    className="w-full h-auto max-h-64 sm:max-h-80 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Description */}
              {exerciseInfo.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gym-accent mb-2">Descripción</h3>
                  <p className="text-sm text-gym-text-secondary leading-relaxed whitespace-pre-line">
                    {exerciseInfo.description}
                  </p>
                </div>
              )}

              {/* Instructions */}
              {exerciseInfo.instructions && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gym-accent mb-2">Instrucciones</h3>
                  <div className="text-sm text-gym-text-secondary leading-relaxed whitespace-pre-line">
                    {exerciseInfo.instructions.split('\n').map((instruction, index) => (
                      instruction.trim() && (
                        <div key={index} className="mb-2 flex gap-2">
                          <span className="text-gym-accent font-bold flex-shrink-0">{index + 1}.</span>
                          <span>{instruction.trim()}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Secondary Images */}
              {secondaryImages.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gym-accent mb-2">Más imágenes</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {secondaryImages.map((img) => (
                      <div key={img.id} className="rounded-lg overflow-hidden bg-gym-dark">
                        <img
                          src={img.image}
                          alt={`${exerciseInfo.name} - vista ${img.id}`}
                          className="w-full h-24 sm:h-32 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gym-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gym-text-secondary mb-2 font-medium">No se encontró información para este ejercicio</p>
              <p className="text-xs text-gym-text-secondary mb-4">
                No hay información disponible sobre "{exerciseName}" en este momento.
              </p>
              <div className="bg-gym-dark border border-gym-border rounded-lg p-4 text-left space-y-3">
                <p className="text-xs text-gym-text-secondary">
                  <strong className="text-gym-text">Sugerencia:</strong> Busca este ejercicio en internet para ver videos e instrucciones.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exerciseName + ' ejercicio gimnasio')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gym-accent hover:bg-gym-accent/90 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>Buscar en YouTube</span>
                  </a>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(exerciseName + ' como hacer ejercicio')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gym-card border border-gym-border hover:border-gym-accent text-gym-text rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Buscar en Google</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gym-border bg-gym-dark/50">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gym-accent hover:bg-gym-accent/90 text-white rounded-lg font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

