import { Play, User, Palette, Trash2, CheckCircle } from 'lucide-react';
import { AudioButton } from '@/components/AudioButton';
import { useState, useRef } from 'react';
import { BubbleDecorations } from '@/components/BubbleDecorations';

const reglasJuego2Texto = `
Modo de Juego 2: Con Adulto y Un Solo Niño. 1 jugador.

Preparación: Un adulto tiene todas las cartas. Juega solo un niño. El niño puede escoger un arreglo de 3 dientes pero sin importar los colores. Puede mezclar colores.

Desarrollo del juego: En cada turno, el niño pide una carta al adulto. Si le sirve para su combinación, la conserva. Si no le sirve, no la regresa a la mano del adulto, sino que la descarta definitivamente.

Condición de victoria: Completar su arreglo de 3 dientes. Los colores pueden ser mixtos.
`;

export function Segment4_Juego2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const diferencias = [
    {
      icon: Palette,
      titulo: 'Colores Mixtos',
      descripcion: 'Combina diferentes colores',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Trash2,
      titulo: 'Descartadas',
      descripcion: 'Las cartas no vuelven',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: User,
      titulo: '1 Jugador',
      descripcion: 'Solo un niño juega',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  const pasos = [
    { num: 1, titulo: 'Preparación', desc: 'Escoge 3 dientes sin importar colores' },
    { num: 2, titulo: 'Desarrollo', desc: 'Pide carta. Si sirve, la guardas. Si no, se descarta.' },
    { num: 3, titulo: 'Victoria', desc: 'Completa 3 dientes con colores mixtos' },
  ];

  return (
    <section className="segment segment-4" id="segment-4">
      <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center md:gap-2 gap-6">
        {/* Badge del modo */}
        <div className="flex justify-center animate-slide-up">
          <div className="bg-yellow-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full font-bold text-xs md:text-sm shadow-lg">
            Modo de Juego 2
          </div>
        </div>

        {/* Título */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-1">
            Con Adulto y <span className="text-yellow-600">Un Solo Niño</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            <span className="font-semibold">1 jugador</span> • ¡Puedes mezclar colores!
          </p>
        </div>

        {/* Video */}
        <div className="video-container aspect-video bg-gray-900 animate-bounce-in md:max-h-[28vh]" style={{ animationDelay: '0.2s' }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/logo.jpg"
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/video-juego2.mp4" type="video/mp4" />
            <p className="text-white text-center p-4 text-sm">
              Video explicativo del Modo de Juego 2
            </p>
          </video>

          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              onClick={handlePlayVideo}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-yellow-600 ml-0.5" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        {/* Botón de audio */}
        <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <AudioButton text={reglasJuego2Texto} label="Escuchar reglas" />
        </div>

        {/* Diferencias clave - Compacto */}
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {diferencias.map((item, index) => (
            <div
              key={item.titulo}
              className="bg-[#ededed] backdrop-blur-sm rounded-xl p-2 md:p-3 shadow-sm border border-transparent hover:border-yellow-400 transition-all animate-slide-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${item.bgColor} flex items-center justify-center mx-auto mb-1 md:mb-2`}>
                <item.icon className={`w-4 h-4 md:w-5 md:h-5 ${item.color}`} />
              </div>
              <h3 className="text-xs md:text-sm font-bold text-center text-gray-800 mb-1">
                {item.titulo}
              </h3>
              <p className="text-gray-600 text-center text-xs leading-tight">
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Cómo Jugar - Pasos compactos */}
        <div className="bg-[#ededed] backdrop-blur-sm rounded-xl p-2 md:p-3 shadow-sm animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2 flex items-center gap-1 md:gap-2">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
            Cómo Jugar
          </h3>
          <div className="space-y-1 md:space-y-2">
            {pasos.map((paso) => (
              <div key={paso.num} className="flex items-start gap-2 bg-yellow-50 rounded-lg p-1 md:p-2">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {paso.num}
                </div>
                <div>
                  <h4 className="font-bold text-yellow-800 text-xs md:text-sm">{paso.titulo}</h4>
                  <p className="text-gray-700 text-xs leading-tight">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BubbleDecorations variant={4} />
    </section>
  );
}
