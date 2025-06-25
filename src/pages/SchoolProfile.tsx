import SchoolBanner from "@/components/SchoolBanner";
import PhotoGallery from "@/components/PhotoGallery";
import InfoSection from "@/components/InfoSection";
import ReviewsSection from "@/components/ReviewsSection";
import StarRating from "@/components/StarRating";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  BookOpen, 
  Award, 
  Globe, 
  Heart, 
  GraduationCap, 
  UserCheck 
} from "lucide-react";

const SchoolProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Photo Gallery */}
        <PhotoGallery />

        {/* School Banner - no spacing above */}
        <SchoolBanner />

        {/* Rest of content with spacing */}
        <div className="p-6 space-y-8">
          {/* Contact Information */}
          <InfoSection title="Información de Contacto" icon={Phone}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Contacto</h3>
                <div className="space-y-2">
                  <p>📞 <a href="tel:+56987088718" className="text-blue-600 hover:text-blue-800 underline">+56 9 87088718</a></p>
                  <p>✉️ <a href="mailto:secretariadireccion@colegioalbamar.cl" className="text-blue-600 hover:text-blue-800 underline">secretariadireccion@colegioalbamar.cl</a></p>
                  <p>🌐 www.colegioalbamar.cl</p>
                </div>
              </div>
              <div>
                <p><strong>Dirección:</strong> Camino El Alba 12357, Las Condes, Santiago</p>
                <p><strong>Horario de Atención:</strong> Lunes a Viernes, 8:00 - 17:00 hrs</p>
              </div>
            </div>
          </InfoSection>

          {/* General Description */}
          <InfoSection title="Descripción General" icon={BookOpen}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Misión</h3>
                <p>El Colegio Albamar busca la formación integral de sus alumnas, desarrollando al máximo sus capacidades intelectuales, humanas y espirituales, en un ambiente de libertad responsable y alegría.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">¿Cómo se logra?</h3>
                <p>A través de una educación personalizada que promueve la excelencia académica, la formación en virtudes humanas y la orientación cristiana de la vida, preparando a las alumnas para ser protagonistas en la construcción de una sociedad más justa y solidaria.</p>
              </div>
            </div>
          </InfoSection>

          {/* Admission Process */}
          <InfoSection title="Proceso de Admisión" icon={Users}>
            <div className="space-y-4">
              <ul className="space-y-3">
                <li><strong>Playgroup a 6to Básico:</strong> Evaluación psicopedagógica y entrevista familiar</li>
                <li><strong>Desde 7mo Básico:</strong> Prueba de admisión en Lenguaje, Matemáticas e Inglés, más entrevista familiar</li>
                <li><strong>Entrevista:</strong> Con Dirección del colegio para conocer la propuesta educativa y evaluar la afinidad con el proyecto</li>
                <li><strong>Padres:</strong> Ambos padres deben participar en el proceso de admisión</li>
                <li><strong>Tarifa de postulación:</strong> <strong>1 UF</strong> (no reembolsable)</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Se comunican por teléfono o correo dentro de las 3 semanas siguientes a la entrega de la documentación.
              </p>
            </div>
          </InfoSection>

          {/* Cost Information */}
          <InfoSection title="Información de Costos" icon={Award}>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Matrícula</h3>
                <ul className="space-y-2">
                  <li><strong>Tipo de pago:</strong> Anual en marzo</li>
                  <li><strong>Tope máximo:</strong> <strong>45 UF</strong> (aproximadamente <strong>$1.752.264</strong>)</li>
                </ul>
              </div>
            
              <div>
                <h3 className="font-bold text-lg mb-3">Colegiatura</h3>
                <ul className="space-y-2">
                  <li><strong>Tipo de pago:</strong> 10 cuotas mensuales (marzo a diciembre)</li>
                  <li><strong>Tope máximo:</strong> <strong>50 UF</strong> mensuales</li>
                  <li><strong>La colegiatura (ambas) incluye:</strong></li>
                  <ul className="ml-6 space-y-1">
                    <li>• Actividades académicas regulares</li>
                    <li>• Talleres extraprogramáticos</li>
                    <li>• Uso de instalaciones deportivas y biblioteca</li>
                    <li>• Materiales básicos de estudio</li>
                    <li>• Seguros</li>
                  </ul>
                  <li><strong>Seguro de accidentes del alumno:</strong> Cobertura <strong>24/7</strong></li>
                  <li><strong>Seguro de escolaridad:</strong> <strong>120 UF anuales</strong> (en caso de fallecimiento o invalidez total de los padres)</li>
                </ul>
              </div>
            
              <div>
                <h3 className="font-bold text-lg mb-3">Bono de incorporación</h3>
                <ul className="space-y-2">
                  <li><strong>Tipo de pago:</strong> Una sola vez al ingresar al colegio</li>
                  <li><strong>Tope máximo:</strong> <strong>90 UF</strong> (aproximadamente <strong>$3.504.528</strong>)</li>
                </ul>
              </div>
            </div>
          </InfoSection>

          {/* Educational Project */}
          <InfoSection title="Proyecto Educativo" icon={GraduationCap}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Educación Preescolar</h3>
                <p>Enfoque en el desarrollo integral de las habilidades básicas, creatividad y autonomía personal a través del juego dirigido y actividades lúdicas estructuradas.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Educación Básica y Media</h3>
                <p>Programa académico riguroso que combina excelencia en las asignaturas tradicionales con formación en valores, desarrollo del pensamiento crítico y preparación para la educación superior.</p>
              </div>
            </div>
          </InfoSection>

          {/* Languages */}
          <InfoSection title="Idiomas" icon={Globe}>
            <div>
              <h3 className="font-bold text-lg mb-2">Inglés</h3>
              <p>Programa intensivo de inglés desde Playgroup con <strong>enfoque comunicativo</strong>, privilegiando experiencias de aprendizaje <strong>prácticas y significativas</strong> que desarrollen el <strong>pensamiento crítico</strong> en este idioma. Las alumnas pueden rendir <strong>exámenes de Cambridge</strong> y obtener certificaciones internacionales como el <strong>First Certificate in English (FCE)</strong>.</p>
            </div>
          </InfoSection>

          {/* Religion */}
          <InfoSection title="Religión" icon={Heart}>
            <div>
              <p>Formación católica centrada en la <strong>búsqueda de la santidad en la vida cotidiana</strong>, con <strong>capellanía a cargo de la Prelatura del Opus Dei</strong>. Se promueve el <strong>amor por el conocimiento</strong>, la <strong>dedicación al estudio</strong>, la <strong>caridad</strong>, el <strong>servicio</strong>, el <strong>respeto</strong> y la <strong>piedad</strong> como pilares fundamentales de la formación espiritual.</p>
            </div>
          </InfoSection>

          {/* University Admission Process */}
          <InfoSection title="Proceso de admisión universitaria" icon={Award}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Resultados PSU/PDT (Promoción 2023):</h4>
                <ul className="space-y-2">
                  <li>• Puntaje promedio Lenguaje: <strong>95 a nivel nacional</strong>, <strong>6<sup>to</sup> a nivel regional</strong></li>
                  <li>• Puntaje promedio Matemáticas: <strong>4<sup>to</sup> a nivel regional</strong></li>
                  <li>• Puntaje promedio total: <strong>85 a nivel nacional</strong>, <strong>4<sup>to</sup> a nivel regional</strong></li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600 mt-4">
                  <sup>1</sup> Rankings basados en resultados oficiales del DEMRE para establecimientos de la Región Metropolitana.
                </p>
              </div>
            </div>
          </InfoSection>

          {/* Parents */}
          <InfoSection title="Padres" icon={UserCheck}>
            <div>
              <p>El colegio ofrece <strong>dos cursos anuales</strong> para padres, complementados con <strong>charlas</strong> y <strong>reuniones</strong> periódicas sobre <strong>temas educativos y familiares</strong>. Además, se realizan <strong>conferencias y entrevistas personalizadas</strong> para apoyar la labor formativa en el hogar y fortalecer la alianza familia-colegio.</p>
            </div>
          </InfoSection>

          {/* Reviews Section */}
          <ReviewsSection />

          {/* Rating Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Calificación Promedio</h3>
            <div className="flex items-center justify-center gap-4">
              <StarRating rating={5} size="lg" />
              <span className="text-3xl font-bold text-gray-900">5.0</span>
              <span className="text-gray-500">(142 reseñas)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolProfile;
