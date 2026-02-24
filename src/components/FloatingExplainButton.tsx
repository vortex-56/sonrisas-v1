interface FloatingExplainButtonProps {
    onClick?: () => void;
}

export function FloatingExplainButton({ onClick }: FloatingExplainButtonProps) {
    return (
        <button
            id="floating-explain-btn"
            onClick={onClick}
            title="¿Quieres una explicación?"
            aria-label="¿Quieres una explicación?"
            className="
        group
        fixed z-50

        left-6 bottom-6
        md:left-auto md:right-6 md:bottom-6

        w-14 h-14 md:w-16 md:h-16
        rounded-full
        overflow-hidden
        shadow-lg hover:shadow-2xl
        border-2 border-white/70
        bg-gradient-to-br from-amber-400 to-orange-500
        transition-all duration-300
        hover:scale-110 active:scale-95
        flex items-center justify-center
      "
        >
            {/*
        ────────────────────────────────────────────
        IMAGEN: reemplaza el <div> de abajo con:
          <img src="/tu-imagen.png" alt="¿Quieres una explicación?" className="w-full h-full object-cover" />
        ────────────────────────────────────────────
      */}
            <div className="w-full h-full flex flex-col items-center justify-center text-white select-none">
                <span className="text-2xl leading-none">💬</span>
                <span className="text-[8px] font-bold leading-tight mt-0.5 hidden md:block text-center px-1">
                    ¿Explicación?
                </span>
            </div>

            {/* Tooltip visible al hacer hover en escritorio */}
            <span className="
        pointer-events-none
        absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2
        whitespace-nowrap
        bg-gray-900/90 text-white text-xs font-semibold
        px-3 py-1.5 rounded-full shadow-md
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        hidden md:block
      ">
                ¿Quieres una explicación?
            </span>
        </button>
    );
}
