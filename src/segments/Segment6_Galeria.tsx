import { useRef, useEffect, useCallback } from 'react';
import { Play, Image as ImageIcon } from 'lucide-react';
import { BubbleDecorations } from '@/components/BubbleDecorations';

// ──────────────────────────────────────────────────────────────
// Tipos
// ──────────────────────────────────────────────────────────────
type ItemType = 'youtube' | 'square' | 'landscape' | 'portrait';

interface GalleryItem {
    id: number;
    type: ItemType;
    // Cuando tengas contenido real, descomenta y usa:
    // youtubeId?: string;  // e.g. "dQw4w9WgXcQ"
    // src?: string;        // e.g. "/gallery/foto1.jpg"
    label: string;
}

// ──────────────────────────────────────────────────────────────
// Contenido de la galería – edita aquí para agregar reales
// ──────────────────────────────────────────────────────────────
const ROW_1: GalleryItem[] = [
    { id: 1, type: 'youtube', label: 'Video 1' },
    { id: 2, type: 'landscape', label: 'Foto 1' },
    { id: 3, type: 'square', label: 'Foto 2' },
    { id: 4, type: 'landscape', label: 'Foto 3' },
    { id: 5, type: 'youtube', label: 'Video 2' },
    { id: 6, type: 'square', label: 'Foto 4' },
    { id: 7, type: 'landscape', label: 'Foto 5' },
];

const ROW_2: GalleryItem[] = [
    { id: 11, type: 'portrait', label: 'Foto 6' },
    { id: 12, type: 'square', label: 'Foto 7' },
    { id: 13, type: 'portrait', label: 'Foto 8' },
    { id: 14, type: 'landscape', label: 'Foto 9' },
    { id: 15, type: 'square', label: 'Foto 10' },
    { id: 16, type: 'portrait', label: 'Foto 11' },
    { id: 17, type: 'landscape', label: 'Foto 12' },
];

// Proporción ancho/alto según tipo
const ASPECT_RATIO: Record<ItemType, number> = {
    youtube: 16 / 9,
    landscape: 4 / 3,
    square: 1 / 1,
    portrait: 2 / 3,
};

// ──────────────────────────────────────────────────────────────
// Tile individual (placeholder sky-blue)
// ──────────────────────────────────────────────────────────────
function Tile({ item, rowHeight }: { item: GalleryItem; rowHeight: number }) {
    const width = Math.round(rowHeight * ASPECT_RATIO[item.type]);
    const isVideo = item.type === 'youtube';

    return (
        <div
            className="
        shrink-0 rounded-2xl overflow-hidden
        bg-gradient-to-br from-sky-200 to-sky-300
        border-2 border-sky-400/50
        shadow-md
        flex items-center justify-center
        select-none
      "
            style={{ width, height: rowHeight }}
            draggable={false}
        >
            <div className="flex flex-col items-center gap-1 text-sky-600 p-2 pointer-events-none">
                {isVideo ? (
                    <>
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-md">
                            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                        </div>
                        <span className="text-[10px] font-bold text-sky-700 text-center">{item.label}</span>
                    </>
                ) : (
                    <>
                        <ImageIcon className="w-7 h-7 text-sky-400" />
                        <span className="text-[10px] text-sky-500 text-center">{item.label}</span>
                    </>
                )}
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────
// Hook de Marquee con arrastre (mouse + touch)
// ──────────────────────────────────────────────────────────────
function useMarquee(speed: number) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(0);
    const rafRef = useRef(0);
    const isDragging = useRef(false);
    const drag = useRef({ startX: 0, startPos: 0 });

    // Loop de animación
    useEffect(() => {
        const tick = () => {
            if (!isDragging.current && trackRef.current) {
                posRef.current -= speed;
                const halfWidth = trackRef.current.scrollWidth / 2;
                if (Math.abs(posRef.current) >= halfWidth) {
                    posRef.current = 0;
                }
                trackRef.current.style.transform = `translateX(${posRef.current}px)`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [speed]);

    // Normalizar posición al soltar (para que el loop sea correcto)
    const normalizePos = useCallback(() => {
        if (!trackRef.current) return;
        const halfWidth = trackRef.current.scrollWidth / 2;
        posRef.current = posRef.current % (-halfWidth);
        if (posRef.current > 0) posRef.current -= halfWidth;
        if (posRef.current < -halfWidth) posRef.current += halfWidth;
    }, []);

    // ── Mouse ──
    const onMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = true;
        drag.current = { startX: e.clientX, startPos: posRef.current };
    }, []);

    // Necesitamos capturar mousemove/mouseup en window para que no se "pegue" al salir
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!isDragging.current || !trackRef.current) return;
            const delta = e.clientX - drag.current.startX;
            posRef.current = drag.current.startPos + delta;
            trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        };
        const onUp = () => {
            if (!isDragging.current) return;
            isDragging.current = false;
            normalizePos();
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [normalizePos]);

    // ── Touch (passive:false para poder preventDefault) ──
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const onTouchStart = (e: TouchEvent) => {
            isDragging.current = true;
            drag.current = { startX: e.touches[0].clientX, startPos: posRef.current };
        };
        const onTouchMove = (e: TouchEvent) => {
            if (!isDragging.current || !trackRef.current) return;
            e.preventDefault(); // evita scroll de página al arrastrar
            const delta = e.touches[0].clientX - drag.current.startX;
            posRef.current = drag.current.startPos + delta;
            trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        };
        const onTouchEnd = () => {
            if (!isDragging.current) return;
            isDragging.current = false;
            normalizePos();
        };

        wrapper.addEventListener('touchstart', onTouchStart, { passive: true });
        wrapper.addEventListener('touchmove', onTouchMove, { passive: false });
        wrapper.addEventListener('touchend', onTouchEnd, { passive: true });
        return () => {
            wrapper.removeEventListener('touchstart', onTouchStart);
            wrapper.removeEventListener('touchmove', onTouchMove);
            wrapper.removeEventListener('touchend', onTouchEnd);
        };
    }, [normalizePos]);

    return { wrapperRef, trackRef, onMouseDown };
}

// ──────────────────────────────────────────────────────────────
// Fila de marquee
// ──────────────────────────────────────────────────────────────
function MarqueeRow({
    items,
    speed,
    rowHeight,
}: {
    items: GalleryItem[];
    speed: number;
    rowHeight: number;
}) {
    const { wrapperRef, trackRef, onMouseDown } = useMarquee(speed);
    // Duplicar items para el loop infinito
    const doubled = [...items, ...items];

    return (
        <div
            ref={wrapperRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ height: rowHeight, userSelect: 'none' }}
            onMouseDown={onMouseDown}
        >
            <div
                ref={trackRef}
                className="flex gap-2"
                style={{ willChange: 'transform', display: 'flex', padding: '0 4px' }}
            >
                {doubled.map((item, i) => (
                    <Tile key={`${item.id}-${i}`} item={item} rowHeight={rowHeight} />
                ))}
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────
// Sección principal
// ──────────────────────────────────────────────────────────────
export function Segment6_Galeria() {
    // Alturas de fila (en px). Ajusta según tu diseño.
    const ROW_HEIGHT_1 = 180; // fila superior (videos + landscape)
    const ROW_HEIGHT_2 = 160; // fila inferior (portraits + squares)

    return (
        <section className="segment segment-6-gallery" id="segment-6">
            <div className="w-full h-full flex flex-col justify-center gap-4 overflow-hidden">

                {/* Encabezado */}
                <div className="text-center shrink-0 animate-slide-up px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-0.5">
                        🎞️ <span className="text-sky-600">Galería</span>
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">
                        Arrastra para navegar &nbsp;·&nbsp; Click sostenido para pausar
                    </p>
                </div>

                {/* Fila 1 – Más alta: videos + landscape */}
                <div className="shrink-0">
                    <MarqueeRow items={ROW_1} speed={0.55} rowHeight={ROW_HEIGHT_1} />
                </div>

                {/* Fila 2 – Portraits + squares (velocidad distinta) */}
                <div className="shrink-0">
                    <MarqueeRow items={ROW_2} speed={0.38} rowHeight={ROW_HEIGHT_2} />
                </div>

            </div>
            <BubbleDecorations variant={6} />
        </section>
    );
}
