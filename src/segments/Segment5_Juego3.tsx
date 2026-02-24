import { Play, Users, Brain, Eye, Target } from 'lucide-react';
import { AudioButton } from '@/components/AudioButton';
import { useState, useRef } from 'react';
import { BubbleDecorations } from '@/components/BubbleDecorations';

const reglasJuego3Texto = `
Modo de Juego 3: Sin Adultos. De 2 a 4 jugadores.

Preparación: Cada niño, de 2 a 4 jugadores, escoge un color. Reciben su diente respectivo según su edad, igual que en el Modo 1. El resto de las cartas se ponen en la mesa boca abajo.

Desarrollo del juego: En cada turno, un jugador levanta cualquier carta de la mesa. Si le sirve para su set de 3 de su color, se la queda. Si no le sirve, la devuelve boca abajo a la mesa. Esto continúa hasta que cada uno consiga su arreglo de 3 dientes del color que escogió al inicio.

Condición de victoria: Completar el set de 3 dientes del mismo color que eligió al inicio: Príncipe, Mixto y Adulto.

Importante: Este modo sí involucra memoria. Hay que recordar dónde quedaron las cartas.
`;

export function Segment5_Juego3() {
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

  const caracteristicas = [
    {
      icon: Users,
      titulo: '2 a 4 Jugadores',
      descripcion: 'Niños juegan sin adulto',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: Eye,
      titulo: 'Cartas en Mesa',
      descripcion: 'Boca abajo sobre la mesa',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Brain,
      titulo: '¡Memoria!',
      descripcion: 'Recuerda dónde quedaron',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const pasos = [
    { num: 1, titulo: 'Preparación', desc: 'Escoge color. Recibe diente según edad. Resto boca abajo en mesa.' },
    { num: 2, titulo: 'Desarrollo', desc: 'Levanta carta. Si sirve, te la quedas. Si no, boca abajo de vuelta.' },
    { num: 3, titulo: '¡Memoriza!', desc: '¡Recuerda dónde quedaron! La memoria es clave.' },
  ];

  return (
    <section className="segment segment-5" id="segment-5">
      <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center md:gap-2 gap-6">
        {/* Badge del modo */}
        <div className="flex justify-center animate-slide-up">
          <div className="bg-red-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full font-bold text-xs md:text-sm shadow-lg">
            Modo de Juego 3
          </div>
        </div>

        {/* Título */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-1">
            Sin Adultos <span className="text-red-600">¡Memoriza!</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            <span className="font-semibold">2 a 4 jugadores</span> • ¡Pon a prueba tu memoria!
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
            <source src="/video-juego3.mp4" type="video/mp4" />
            <p className="text-white text-center p-4 text-sm">
              Video explicativo del Modo de Juego 3
            </p>
          </video>

          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              onClick={handlePlayVideo}
            >
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110">
                <Play className="w-7 h-7 md:w-10 md:h-10 text-red-600 ml-0.5" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        {/* Botón de audio */}
        <div className="flex justify-center mb-6 md:mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <AudioButton text={reglasJuego3Texto} label="Escuchar reglas" />
        </div>

        {/* Características - Compacto */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 mb-6 md:mb-8">
          {caracteristicas.map((item, index) => (
            <div
              key={item.titulo}
              className="bg-[#ededed] backdrop-blur-sm rounded-xl p-2 md:p-3 shadow-sm border border-transparent hover:border-red-400 transition-all animate-slide-up"
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

        {/* Reglas del juego - Pasos compactos */}
        <div className="bg-[#ededed] backdrop-blur-sm rounded-xl p-2 md:p-3 shadow-sm animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2 flex items-center gap-1 md:gap-2">
            <Target className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
            Reglas del Juego
          </h3>
          <div className="space-y-1 md:space-y-2">
            {pasos.map((paso) => (
              <div key={paso.num} className="flex items-start gap-2 bg-red-50 rounded-lg p-1 md:p-2">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {paso.num}
                </div>
                <div>
                  <h4 className="font-bold text-red-800 text-xs md:text-sm">{paso.titulo}</h4>
                  <p className="text-gray-700 text-xs leading-tight">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BubbleDecorations variant={5} />
    </section>
  );
}
