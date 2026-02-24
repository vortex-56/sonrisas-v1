import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface FloatingNavProps {
  currentSegment: number;
  totalSegments: number;
  onNavigate: (segment: number) => void;
}

const SECTIONS = [
  { id: 1, title: 'Intro' },
  { id: 2, title: 'Reglas' },
  { id: 3, title: 'Juego I' },
  { id: 4, title: 'Juego II' },
  { id: 5, title: 'Juego III' },
  { id: 6, title: 'Galería' },
  { id: 7, title: 'Área Legal' },
];

export function FloatingNav({ currentSegment, onNavigate }: FloatingNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigate = (sectionId: number) => {
    onNavigate(sectionId);
    // En móvil, cerrar el menú después de navegar
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Versión Escritorio - Esquina superior derecha */}
      <div className="hidden md:flex fixed top-6 right-6 z-50 flex-col gap-2 items-end">
        {/* Botón Hamburguesa */}
        <button
          onClick={toggleExpanded}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle menu"
          title="Menú de navegación"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Botones de Navegación - Escritorio */}
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`
              ${isExpanded ? 'min-w-[120px]' : 'w-12'} 
              h-12 rounded-full 
              ${currentSegment === section.id
                ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                : 'bg-gradient-to-br from-gray-700 to-gray-900'
              }
              text-white shadow-lg hover:shadow-xl 
              transition-all duration-300 
              flex items-center justify-center 
              hover:scale-105
              font-semibold text-sm
            `}
            aria-label={`Ir a ${section.title}`}
            title={section.title}
          >
            {isExpanded ? (
              <span className="whitespace-nowrap">{section.title}</span>
            ) : (
              <span>{section.id}</span>
            )}
          </button>
        ))}
      </div>

      {/* Versión Móvil - Esquina inferior derecha */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        {/* Botón Hamburguesa Móvil */}
        <button
          onClick={toggleExpanded}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-2xl transition-all duration-300 flex items-center justify-center active:scale-95"
          aria-label="Toggle menu"
          title="Menú de navegación"
        >
          {isExpanded ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>

        {/* Menú Expandido Móvil - Aparece arriba del botón */}
        {isExpanded && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavigate(section.id)}
                className={`
                  min-w-[120px] py-3 rounded-full 
                  ${currentSegment === section.id
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                    : 'bg-gradient-to-br from-gray-700 to-gray-900'
                  }
                  text-white shadow-lg active:scale-95
                  transition-all duration-200 
                  font-semibold text-sm
                  flex items-center justify-center
                `}
                aria-label={`Ir a ${section.title}`}
              >
                {section.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
