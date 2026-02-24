/**
 * BubbleDecorations
 * - En MÓVIL: posicionadas dentro del segmento (nunca en top/bottom-edge)
 * - En ESCRITORIO (md+): pueden estar en las esquinas con valores negativos
 * - z-index: -1  → siempre DETRÁS del contenido
 */

interface Bubble {
    color: string;
    /** tamaño: "móvil md:escritorio" */
    size: string;
    /** position: clases Tailwind completas con responsive prefix donde necesario */
    position: string;
    delay: string;
}

const VARIANTS: Record<number, Bubble[]> = {
    // ── Sección 1: Portada ──
    1: [
        { color: 'bg-red-400', size: 'w-20 h-20 md:w-64 md:h-64', position: 'top-4    right-2  md:top-[-4rem]   md:right-[-3rem]', delay: '0s' },
        { color: 'bg-blue-400', size: 'w-14 h-14 md:w-44 md:h-44', position: 'bottom-4 left-2   md:bottom-[-3rem] md:left-[-2rem]', delay: '0.6s' },
        { color: 'bg-yellow-300', size: 'w-8  h-8  md:w-20 md:h-20', position: 'top-[38%] left-[5%]', delay: '1.2s' },
    ],
    // ── Sección 2: Reglas ──
    2: [
        { color: 'bg-blue-400', size: 'w-20 h-20 md:w-60 md:h-60', position: 'top-4    left-2   md:top-[-3rem]   md:left-[-3rem]', delay: '0s' },
        { color: 'bg-yellow-300', size: 'w-14 h-14 md:w-44 md:h-44', position: 'bottom-4 right-2  md:bottom-[-3rem] md:right-[-2rem]', delay: '0.8s' },
        { color: 'bg-red-400', size: 'w-8  h-8  md:w-18 md:h-18', position: 'top-[30%] right-[6%]', delay: '1.4s' },
    ],
    // ── Sección 3: Juego I ──
    3: [
        { color: 'bg-yellow-300', size: 'w-20 h-20 md:w-68 md:h-68', position: 'top-4    right-2  md:top-[-4rem]   md:right-[-4rem]', delay: '0s' },
        { color: 'bg-red-400', size: 'w-14 h-14 md:w-40 md:h-40', position: 'bottom-4 left-2   md:bottom-[-2rem] md:left-[-1rem]', delay: '0.7s' },
        { color: 'bg-blue-300', size: 'w-8  h-8  md:w-20 md:h-20', position: 'top-[45%] left-[4%]', delay: '1.5s' },
    ],
    // ── Sección 4: Juego II ──
    4: [
        { color: 'bg-red-400', size: 'w-20 h-20 md:w-60 md:h-60', position: 'bottom-4 right-2  md:bottom-[-3rem] md:right-[-3rem]', delay: '0s' },
        { color: 'bg-blue-400', size: 'w-14 h-14 md:w-44 md:h-44', position: 'top-4    left-2   md:top-[-2rem]   md:left-[-2rem]', delay: '0.9s' },
        { color: 'bg-yellow-300', size: 'w-8  h-8  md:w-22 md:h-22', position: 'bottom-[26%] left-[5%]', delay: '1.8s' },
    ],
    // ── Sección 5: Juego III ──
    5: [
        { color: 'bg-blue-400', size: 'w-20 h-20 md:w-72 md:h-72', position: 'top-4    right-2  md:top-[-4rem]   md:right-[-5rem]', delay: '0s' },
        { color: 'bg-yellow-300', size: 'w-14 h-14 md:w-40 md:h-40', position: 'top-4    left-2   md:top-[-2rem]   md:left-[-3rem]', delay: '1s' },
        { color: 'bg-red-400', size: 'w-8  h-8  md:w-24 md:h-24', position: 'bottom-4 right-[10%] md:bottom-[-1rem]', delay: '0.5s' },
    ],
    // ── Sección 6: Galería ──
    6: [
        { color: 'bg-yellow-300', size: 'w-20 h-20 md:w-56 md:h-56', position: 'bottom-4 left-2   md:bottom-[-2rem] md:left-[-3rem]', delay: '0s' },
        { color: 'bg-blue-400', size: 'w-14 h-14 md:w-40 md:h-40', position: 'top-4    right-2  md:top-[-2rem]   md:right-[-2rem]', delay: '0.6s' },
        { color: 'bg-red-300', size: 'w-8  h-8  md:w-18 md:h-18', position: 'top-[42%] left-[3%]', delay: '1.3s' },
    ],
    // ── Sección 7: Área Legal ──
    7: [
        { color: 'bg-red-400', size: 'w-20 h-20 md:w-64 md:h-64', position: 'top-4    left-2   md:top-[-3rem]   md:left-[-4rem]', delay: '0s' },
        { color: 'bg-yellow-300', size: 'w-14 h-14 md:w-44 md:h-44', position: 'bottom-4 right-2  md:bottom-[-2rem] md:right-[-1rem]', delay: '0.8s' },
        { color: 'bg-blue-300', size: 'w-8  h-8  md:w-22 md:h-22', position: 'top-[25%] right-[6%]', delay: '1.6s' },
    ],
};

export function BubbleDecorations({ variant }: { variant: number }) {
    const bubbles = VARIANTS[variant] ?? [];

    return (
        <>
            {bubbles.map((b, i) => (
                <div
                    key={i}
                    className={`absolute ${b.position} ${b.size} pointer-events-none rounded-full`}
                    style={{ zIndex: -1 }}
                    aria-hidden="true"
                >
                    <div
                        className={`w-full h-full rounded-full ${b.color} animate-float opacity-30`}
                        style={{ animationDelay: b.delay }}
                    />
                </div>
            ))}
        </>
    );
}
