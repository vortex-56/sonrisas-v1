import { useState, useEffect, useCallback, useRef } from 'react';
import { Curtain } from '@/components/Curtain';
import { LogoReveal } from '@/components/LogoReveal';
import { FloatingNav } from '@/components/FloatingNav';
import { FloatingExplainButton } from '@/components/FloatingExplainButton';
import { Segment1_Portada } from '@/segments/Segment1_Portada';
import { Segment2_ReglasPrincipales } from '@/segments/Segment2_ReglasPrincipales';
import { Segment3_Juego1 } from '@/segments/Segment3_Juego1';
import { Segment4_Juego2 } from '@/segments/Segment4_Juego2';
import { Segment5_Juego3 } from '@/segments/Segment5_Juego3';
import { Segment6_Galeria } from '@/segments/Segment6_Galeria';
import { Segment6_Indecopi } from '@/segments/Segment6_Indecopi';

type AppPhase = 'logo' | 'curtain' | 'content';

const TOTAL_SEGMENTS = 7;

function App() {
  const [phase, setPhase] = useState<AppPhase>('logo');
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(1);
  const isNavigating = useRef(false);

  // Manejar final del logo
  const handleLogoComplete = useCallback(() => {
    setPhase('curtain');
    setTimeout(() => {
      setCurtainOpen(true);
    }, 300);
  }, []);

  // Manejar final de la animación del telón
  const handleCurtainComplete = useCallback(() => {
    setPhase('content');
  }, []);

  // Navegar a un segmento específico - VERSIÓN ROBUSTA
  const navigateToSegment = useCallback((segment: number) => {
    if (segment < 1 || segment > TOTAL_SEGMENTS) return;

    isNavigating.current = true;
    setCurrentSegment(segment);

    const element = document.getElementById(`segment-${segment}`);
    if (element) {
      // Calcular la posición exacta del elemento
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset + rect.top;

      // Scroll inmediato y preciso
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });

      // Después del scroll, permitir que el detector de scroll funcione de nuevo
      setTimeout(() => {
        isNavigating.current = false;
      }, 800);
    }
  }, []);

  // Detectar segmento actual al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      // No actualizar durante la navegación manual
      if (isNavigating.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let foundSegment = 1;

      for (let i = 1; i <= TOTAL_SEGMENTS; i++) {
        const segment = document.getElementById(`segment-${i}`);
        if (segment) {
          const offsetTop = segment.offsetTop;
          if (scrollPosition >= offsetTop) {
            foundSegment = i;
          }
        }
      }

      setCurrentSegment(foundSegment);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Detectar posición inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejar teclado (Flechas arriba/abajo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'content' || isNavigating.current || window.innerWidth < 768) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentSegment < TOTAL_SEGMENTS) {
          navigateToSegment(currentSegment + 1);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentSegment > 1) {
          navigateToSegment(currentSegment - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentSegment, navigateToSegment]);

  // Manejar scroll del mouse (Rueda) para efecto "one-page"
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Solo en fase de contenido, si no estamos ya navegando y solo en ESCRITORIO
      if (phase !== 'content' || isNavigating.current || window.innerWidth < 768) return;

      // Detectar umbral para evitar disparos accidentales (especialmente en trackpads)
      if (Math.abs(e.deltaY) < 30) return;

      if (e.deltaY > 0) {
        // Scroll hacia abajo
        if (currentSegment < TOTAL_SEGMENTS) {
          e.preventDefault();
          navigateToSegment(currentSegment + 1);
        }
      } else {
        // Scroll hacia arriba
        if (currentSegment > 1) {
          e.preventDefault();
          navigateToSegment(currentSegment - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [phase, currentSegment, navigateToSegment]);

  // Navegar a las reglas desde la portada
  const handleGoToRules = useCallback(() => {
    navigateToSegment(2);
  }, [navigateToSegment]);

  return (
    <div className="relative min-h-screen">
      {/* Fase 1: Logo Reveal */}
      {phase === 'logo' && <LogoReveal onComplete={handleLogoComplete} />}

      {/* Fase 2: Curtain Animation */}
      {phase === 'curtain' && (
        <Curtain isOpen={curtainOpen} onAnimationComplete={handleCurtainComplete} />
      )}

      {/* Fase 3: Content */}
      {(phase === 'curtain' || phase === 'content') && (
        <main className="relative">
          <Segment1_Portada onGoToRules={handleGoToRules} />
          <Segment2_ReglasPrincipales />
          <Segment3_Juego1 />
          <Segment4_Juego2 />
          <Segment5_Juego3 />
          <Segment6_Galeria />
          <Segment6_Indecopi />
        </main>
      )}

      {/* Navegación flotante (solo en fase content) */}
      {phase === 'content' && (
        <FloatingNav
          currentSegment={currentSegment}
          totalSegments={TOTAL_SEGMENTS}
          onNavigate={navigateToSegment}
        />
      )}

      {/* Botón flotante de explicación - siempre visible en la fase de contenido */}
      {phase === 'content' && (
        <FloatingExplainButton
          onClick={() => console.log('¿Quieres una explicación? clicked')}
        />
      )}
    </div>
  );
}

export default App;
