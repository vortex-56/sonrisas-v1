import { Crown, Baby, User } from 'lucide-react';
import { AudioButton } from '@/components/AudioButton';
import { BubbleDecorations } from '@/components/BubbleDecorations';

const reglasPrincipalesTexto = `
Estructura de las cartas del juego Sonrisas de Colores.

El juego tiene 4 colores: Rojo, Azul, Verde y Amarillo.
Cada color tiene 3 cartas diferentes:

Carta 1: Diente Príncipe. Un diente de leche con corona de príncipe. Es para bebés de 5 meses a 5 años.

Carta 2: Diente Mixto. Un diente de leche y un diente adulto con una gorrita. Es para niños de 6 a 11 años.

Carta 3: Diente Adulto. Un diente adulto más grande. Es para niños de 12 años en adelante.

El juego base tiene 12 cartas en total: 3 cartas por color multiplicado por 4 colores.
Se puede jugar con variantes de 12, 24, 36 o 48 cartas en distintos juegos.
`;

export function Segment2_ReglasPrincipales() {
  const cartas = [
    {
      icon: Crown,
      titulo: 'Diente Príncipe',
      descripcion: 'Diente de leche con corona',
      edad: '5 meses a 5 años',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      icon: Baby,
      titulo: 'Diente Mixto',
      descripcion: 'Leche y adulto con gorra',
      edad: '6 a 11 años',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: User,
      titulo: 'Diente Adulto',
      descripcion: 'Diente adulto grande',
      edad: '12+ años',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ];

  const colores = [
    { nombre: 'Rojo', clase: 'bg-red-500' },
    { nombre: 'Azul', clase: 'bg-blue-500' },
    { nombre: 'Verde', clase: 'bg-green-500' },
    { nombre: 'Amarillo', clase: 'bg-yellow-400' },
  ];

  return (
    <section className="segment segment-2" id="segment-2">
      <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center md:gap-2 gap-6">
        {/* Título */}
        <div className="text-center animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
            Estructura de las <span className="text-blue-600">Cartas</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Conoce los diferentes tipos de cartas y sus edades
          </p>
        </div>

        {/* Botón de audio */}
        <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <AudioButton text={reglasPrincipalesTexto} label="Escuchar estructura" />
        </div>

        {/* Cards de los dientes - Compacto */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {cartas.map((carta, index) => (
            <div
              key={carta.titulo}
              className="bg-[#ededed] backdrop-blur-sm rounded-xl p-2 md:p-4 shadow-sm border border-transparent hover:border-blue-400 transition-all animate-slide-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full ${carta.bgColor} flex items-center justify-center mx-auto mb-1 md:mb-2`}>
                <carta.icon className={`w-4 h-4 md:w-6 md:h-6 ${carta.iconColor}`} />
              </div>
              <h3 className="text-xs md:text-base font-bold text-center text-gray-800 mb-1">
                {carta.titulo}
              </h3>
              <p className="text-gray-600 text-center text-xs md:text-sm mb-1 md:mb-2 leading-tight">
                {carta.descripcion}
              </p>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${carta.bgColor} text-gray-700 mx-auto block w-fit`}>
                {carta.edad}
              </div>
            </div>
          ))}
        </div>

        {/* Info de colores - Compacto */}
        <div className="bg-[#ededed] backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-base md:text-xl font-bold text-center text-gray-800 mb-2 md:mb-3">
            Los 4 Colores
          </h3>
          <div className="grid grid-cols-4 gap-2 md:gap-3 mb-2 md:mb-3">
            {colores.map((color) => (
              <div
                key={color.nombre}
                className="flex flex-col items-center gap-1 p-1 md:p-2 rounded-lg bg-gray-50"
              >
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${color.clase} shadow-md`} />
                <span className="font-semibold text-gray-700 text-xs md:text-sm">{color.nombre}</span>
              </div>
            ))}
          </div>
          <div className="text-center text-gray-600">
            <p className="mb-1 text-xs md:text-sm">
              <span className="font-bold text-blue-600">Total:</span> 12 cartas base
            </p>
            <p className="text-xs text-gray-500 mb-2">
              (3 cartas × 4 colores)
            </p>
            <p className="text-xs md:text-sm bg-blue-50 px-2 py-1 rounded-lg inline-block">
              Variantes: <span className="font-semibold">12, 24, 36 o 48 cartas</span>
            </p>
          </div>
        </div>
      </div>

      <BubbleDecorations variant={2} />

      {/* Decoraciones */}
      <div className="absolute top-10 right-10 w-10 md:w-16 opacity-10">
        <Crown className="w-full h-full text-yellow-500" />
      </div>
      <div className="absolute bottom-10 left-10 w-8 md:w-12 opacity-10">
        <Baby className="w-full h-full text-blue-500" />
      </div>
    </section>
  );
}
