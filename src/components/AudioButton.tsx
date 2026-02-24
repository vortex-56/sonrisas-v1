import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

interface AudioButtonProps {
  text: string;
  label?: string;
}

export function AudioButton({ text, label = 'Escuchar reglas' }: AudioButtonProps) {
  const { isPlaying, playText, stopAudio } = useAudio();

  const handleClick = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playText(text);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`audio-button ${isPlaying ? 'playing' : ''}`}
      aria-label={isPlaying ? 'Detener audio' : 'Reproducir audio'}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-5 h-5" />
          <span>Detener</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
