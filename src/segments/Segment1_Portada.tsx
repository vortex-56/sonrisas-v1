import { useState, useRef } from 'react';
import { Play, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BubbleDecorations } from '@/components/BubbleDecorations';

interface Segment1Props {
  onGoToRules: () => void;
}

export function Segment1_Portada({ onGoToRules }: Segment1Props) {
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

  return (
    <section className="segment segment-1" id="segment-1">
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4">

        {/* Left Column: Fixed Width Content (Text and Buttons) */}
        <div className="flex flex-col gap-6 w-full md:w-[275px] shrink-0 items-center md:items-end text-center md:text-right animate-slide-right z-10">

          {/* Titles - Constrained to button width */}
          <div className="w-full">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 leading-tight whitespace-nowrap">
              <span className="text-red-500">¡</span>Bienvenido a
              <span className="text-red-500">!</span>
            </h1>
            <h2 className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent whitespace-nowrap">
              Sonrisas de Colores
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Un juego educativo del <span className="font-semibold text-blue-600">Dr. W. García</span>
            </p>
          </div>

          {/* Call to Actions - Vertical Stack, Fixed Width */}
          <div className="flex flex-col gap-4 w-full">
            <Button
              onClick={handlePlayVideo}
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <Play className="w-6 h-6" />
              {isPlaying ? 'Pausar Video' : 'Ver Video'}
            </Button>

            <Button
              onClick={onGoToRules}
              size="lg"
              variant="outline"
              className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <BookOpen className="w-6 h-6" />
              Leer Reglas
            </Button>
          </div>
        </div>

        {/* Right Column: Video - Fills remaining space and aligns nicely */}
        <div className="flex justify-start items-center">
          <div className="relative w-full max-w-md md:max-w-[500px] aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-2xl animate-bounce-in border-4 border-white/50">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/logo.jpg"
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/video-intro.mp4" type="video/mp4" />
              <p className="text-white text-center p-4">
                Tu navegador no soporta videos.
              </p>
            </video>

            {/* Overlay de play */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer hover:bg-black/20 transition-colors"
                onClick={handlePlayVideo}
              >
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
                  <Play className="w-10 h-10 md:w-14 md:h-14 text-red-600 ml-1" fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      <BubbleDecorations variant={1} />
    </section>
  );
}
