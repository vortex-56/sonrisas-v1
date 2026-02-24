import { Play, Users, UserCheck, Trophy, RotateCcw } from 'lucide-react';
import { AudioButton } from '@/components/AudioButton';
import { useState, useRef } from 'react';
import { BubbleDecorations } from '@/components/BubbleDecorations';

const reglasJuego1Texto = `
Modo de Juego 1: Con Adulto y Varios Niños. De 1 a 4 jugadores.

Preparación: Un adulto, como el doctor o el padre, es quien tiene todas las cartas. De 1 a 4 niños juegan escogiendo un color cada uno. Cada niño recibe su carta inicial según su edad.

Si tiene de 5 meses a 5 años, recibe la carta del Príncipe.
Si tiene de 6 a 11 años, recibe la carta Mixta, que tiene diente de leche y adulto.
Si tiene 12 años o más, recibe la carta del Diente Adulto.

Desarrollo del juego: En cada turno, un jugador saca una carta de la baraja del adulto. Si la carta es un diente de su color y le sirve para completar su set de 3, se la queda. Si no le sirve, la devuelve a la baraja. Cada niño toma una carta, la conserva si le sirve y si no la devuelve. Esto continúa hasta que un jugador complete su set de 3 dientes del mismo color.

Condición de victoria: Debe tener los 3 dientes de su color: el Príncipe, el Mixto y el Adulto. No pueden repetirse cartas de dientes. Por ejemplo, tener 2 Príncipes no cuenta. Solo puede conservar los dientes de su arreglo de 3 de su color.

Final del juego: El primer niño que consiga sus 3 dientes del mismo color gana. Los demás pueden seguir jugando hasta que encuentren sus 3 dientes.
`;

export function Segment3_Juego1() {
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

  const pasos = [
    {
      icon: Users,
      titulo: 'Preparación',
      descripcion: '1 adulto con las cartas. 1-4 niños eligen un color.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: UserCheck,
      titulo: 'Desarrollo',
      descripcion: 'Saca carta. Si sirve, te la quedas. Si no, la devuelves.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Trophy,
      titulo: 'Victoria',
      descripcion: 'Completa tu set de 3 dientes del mismo color.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const reglas = [
    { icon: '↩️', texto: 'Cartas que no sirven se devuelven al adulto' },
    { icon: '🎨', texto: 'Cada niño tiene un color fijo' },
    { icon: '🧠', texto: 'No hay memoria - cartas vuelven a la baraja' },
    { icon: '❌', texto: 'No repetir: 2 Príncipes no cuentan' },
  ];

  return (
    <section className="segment segment-3" id="segment-3">
      <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center md:gap-2 gap-6">
        {/* Badge del modo */}
        <div className="flex justify-center animate-slide-up">
          <div className="bg-green-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full font-bold text-xs md:text-sm shadow-lg">
            Modo de Juego 1
          </div>
        </div>

        {/* Título */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-1">
            Con Adulto y <span className="text-green-600">Varios Niños</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            <span className="font-semibold">1 a 4 jugadores</span> • El adulto controla las cartas
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
            <source src="/video-juego1.mp4" type="video/mp4" />
            <p className="text-white text-center p-4 text-sm">
              Video explicativo del Modo de Juego 1
            </p>
          </video>

          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              onClick={handlePlayVideo}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-green-600 ml-0.5" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        {/* Botón de audio */}
        <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <AudioButton text={reglasJuego1Texto} label="Escuchar reglas" />
        </div>

        {/* Pasos del juego - Compacto */}
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {pasos.map((paso, index) => (
            <div
              key={paso.titulo}
              className="bg-[#ededed] backdrop-blur-sm rounded-xl p-2 md:p-3 shadow-sm border border-transparent hover:border-green-400 transition-all animate-slide-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${paso.bgColor} flex items-center justify-center mx-auto mb-1 md:mb-2`}>
                <paso.icon className={`w-4 h-4 md:w-5 md:h-5 ${paso.color}`} />
              </div>
              <h3 className="text-xs md:text-sm font-bold text-center text-gray-800 mb-1">
                {paso.titulo}
              </h3>
              <p className="text-gray-600 text-center text-xs leading-tight">
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>

        {/* Reglas detalladas - Grid compacto */}
        <div className="bg-[#ededed] backdrop-blur-sm rounded-xl p-2 md:p-3 shadow-sm animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2 flex items-center gap-1 md:gap-2">
            <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            Reglas Importantes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
            {reglas.map((regla, index) => (
              <div
                key={index}
                className="bg-green-50 rounded-lg p-1 md:p-2 flex items-start gap-1"
              >
                <span className="text-base md:text-lg flex-shrink-0">{regla.icon}</span>
                <span className="text-xs text-gray-700 leading-tight">{regla.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BubbleDecorations variant={3} />
    </section>
  );
}
