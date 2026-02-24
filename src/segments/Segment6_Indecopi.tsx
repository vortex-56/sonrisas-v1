import { Award, Shield, CheckCircle, FileCheck } from 'lucide-react';
import { BubbleDecorations } from '@/components/BubbleDecorations';

export function Segment6_Indecopi() {
  return (
    <section className="segment segment-7" id="segment-7">
      <div className="w-full max-w-4xl mx-auto h-full flex flex-col justify-center md:gap-2 gap-6">
        {/* Título */}
        <div className="text-center animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
            Juego <span className="text-purple-600">Patentado</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Reconocimiento oficial de propiedad intelectual
          </p>
        </div>

        {/* Sello Indecopi */}
        <div className="flex justify-center animate-bounce-in">
          <div className="seal-stamp relative">
            {/* Círculo exterior */}
            <div
              className="w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
              }}
            >
              {/* Círculo interior */}
              <div
                className="w-36 h-36 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center border-2 md:border-4 border-yellow-400"
                style={{
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
                }}
              >
                {/* Icono */}
                <Award className="w-10 h-10 md:w-14 md:h-14 text-yellow-400 mb-2" />

                {/* Texto */}
                <div className="text-center px-2 md:px-4">
                  <p className="text-yellow-400 font-bold text-sm md:text-base tracking-wider">
                    INDECOPI
                  </p>
                  <p className="text-white text-xs mt-1">
                    DERECHOS DE AUTOR
                  </p>
                  <p className="text-yellow-400 text-xs mt-1">
                    PERÚ
                  </p>
                </div>

                {/* Línea decorativa */}
                <div className="w-20 md:w-24 h-0.5 bg-yellow-400 my-2" />

                <p className="text-white text-xs text-center px-2">
                  Registro de Obra
                </p>
              </div>
            </div>

            {/* Efecto de brillo */}
            <div
              className="absolute inset-0 rounded-full animate-sparkle"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)',
              }}
            />
          </div>
        </div>

        {/* Información de registro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          <div className="rule-card animate-slide-up p-3 md:p-4" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-800">Protección Legal</h3>
            </div>
            <p className="text-gray-600 text-xs md:text-sm">
              Este juego está protegido por derechos de autor registrados ante
              <strong> INDECOPI</strong>, garantizando su originalidad y protección legal.
            </p>
          </div>

          <div className="rule-card animate-slide-up p-3 md:p-4" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FileCheck className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-800">Obra Registrada</h3>
            </div>
            <p className="text-gray-600 text-xs md:text-sm">
              <strong>Sonrisas de Colores</strong> es una obra intelectual registrada
              que protege su diseño, reglas y elementos creativos.
            </p>
          </div>
        </div>

        {/* Autor */}
        <div className="rule-card text-center animate-slide-up p-3 md:p-4" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center gap-1 md:gap-2 mb-2">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
            <span className="text-sm md:text-base font-semibold text-gray-700">Autor del Juego</span>
          </div>
          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Dr. W. García
          </p>
          <p className="text-gray-500 mt-1 text-xs md:text-sm">
            Creador y propietario intelectual de Sonrisas de Colores
          </p>
        </div>

        {/* Footer - Oculto en escritorio para ahorrar espacio */}
        <div className="md:hidden text-center text-gray-400 text-xs animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <p>© 2024 Sonrisas de Colores. Todos los derechos reservados.</p>
          <p className="mt-1">Un juego educativo para toda la familia</p>
          <p className="mt-1 font-semibold text-purple-500">By: W56</p>
        </div>
      </div>
      <BubbleDecorations variant={7} />
    </section>
  );
}
