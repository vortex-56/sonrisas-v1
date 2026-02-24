import { useState, useEffect } from 'react';

interface LogoRevealProps {
  onComplete: () => void;
}

export function LogoReveal({ onComplete }: LogoRevealProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'showing' | 'exiting'>('entering');

  useEffect(() => {
    // Fase de entrada (0-500ms)
    const enteringTimer = setTimeout(() => {
      setAnimationPhase('showing');
    }, 500);

    // Fase de mostrar (500-2500ms)
    const showingTimer = setTimeout(() => {
      setAnimationPhase('exiting');
    }, 2500);

    // Fase de salida (2500-3000ms)
    const exitingTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(enteringTimer);
      clearTimeout(showingTimer);
      clearTimeout(exitingTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 50%, #991b1b 100%)',
      }}
    >
      {/* Efecto de brillo detrás del logo */}
      <div
        className={`absolute w-[600px] h-[600px] rounded-full transition-all duration-1000 ${animationPhase === 'showing' ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
          }`}
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.5) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Logo */}
      <div
        className={`relative transition-all duration-500 ${animationPhase === 'entering'
            ? 'opacity-0 scale-50'
            : animationPhase === 'showing'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110'
          }`}
      >
        <img
          src="/dientes.png"
          alt="Sonrisas de Colores - Dr. W. García"
          className="w-[80vw] max-w-[500px] h-auto drop-shadow-2xl"
        />

        {/* Efecto de destello */}
        <div
          className={`absolute -inset-4 rounded-3xl transition-opacity duration-500 ${animationPhase === 'showing' ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            animation: animationPhase === 'showing' ? 'shine 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      {/* Partículas de brillo */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-3 h-3 rounded-full bg-yellow-400 transition-all duration-1000 ${animationPhase === 'showing' ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
            animation: animationPhase === 'showing'
              ? `sparkle ${1 + Math.random()}s ease-in-out infinite ${Math.random()}s`
              : 'none',
            boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
          }}
        />
      ))}

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}
