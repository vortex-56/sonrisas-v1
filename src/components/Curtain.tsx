import { useState, useEffect } from 'react';

interface CurtainProps {
  isOpen: boolean;
  onAnimationComplete?: () => void;
}

export function Curtain({ isOpen, onAnimationComplete }: CurtainProps) {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (isOpen && !animationStarted) {
      setAnimationStarted(true);
      // Esperar a que termine la animación
      setTimeout(() => {
        onAnimationComplete?.();
      }, 1500);
    }
  }, [isOpen, animationStarted, onAnimationComplete]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Mitad izquierda del telón */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full velvet-curtain origin-left ${
          animationStarted ? 'animate-curtain-left' : ''
        }`}
        style={{
          boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.3), 10px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Pliegues del telón */}
        <div className="absolute inset-0 flex">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-black/10"
              style={{
                background: `linear-gradient(90deg, 
                  rgba(0,0,0,0.1) 0%, 
                  transparent 20%, 
                  transparent 80%, 
                  rgba(0,0,0,0.1) 100%)`,
              }}
            />
          ))}
        </div>
        {/* Borde dorado */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-4"
          style={{
            background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
          }}
        />
      </div>

      {/* Mitad derecha del telón */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full velvet-curtain origin-right ${
          animationStarted ? 'animate-curtain-right' : ''
        }`}
        style={{
          boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.3), -10px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Pliegues del telón */}
        <div className="absolute inset-0 flex">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-black/10"
              style={{
                background: `linear-gradient(90deg, 
                  rgba(0,0,0,0.1) 0%, 
                  transparent 20%, 
                  transparent 80%, 
                  rgba(0,0,0,0.1) 100%)`,
              }}
            />
          ))}
        </div>
        {/* Borde dorado */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-4"
          style={{
            background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
          }}
        />
      </div>

      {/* Parte superior del telón (cenefa) */}
      <div 
        className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-red-900 to-red-700 z-10 ${
          animationStarted ? 'opacity-0 transition-opacity duration-500' : ''
        }`}
        style={{
          boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-yellow-400"
                style={{
                  boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
