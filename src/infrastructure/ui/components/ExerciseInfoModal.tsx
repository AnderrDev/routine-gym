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
              <p className="text-gym-text-secondary mb-2">No se encontró información para este ejercicio</p>
              <p className="text-xs text-gym-text-secondary">
                Intenta buscar "{exerciseName}" en internet para ver cómo se realiza
              </p>
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

