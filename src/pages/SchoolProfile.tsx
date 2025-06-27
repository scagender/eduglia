
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SchoolBanner from "@/components/SchoolBanner";
import PhotoGallery from "@/components/PhotoGallery";
import InfoSection from "@/components/InfoSection";
import ReviewsSection from "@/components/ReviewsSection";
import StarRating from "@/components/StarRating";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  UserCheck,
  Brain,
  Dumbbell,
  Zap
} from "lucide-react";

interface SchoolData {
  id: number;
  rbd: string;
  nombre: string;
  direccion: string;
  comuna: string;
  region: string;
  telefono: string;
  email: string;
  pagina_web: string;
  dependencia: string;
  sostenedor: string;
  nivel_ensenanza: string;
  matricula_total: number;
  numero_docentes: number;
  google_place_id: string;
  google_rating_promedio: number;
  google_total_reviews: number;
  latitud: number;
  longitud: number;
  convenio_de_subvencion: string;
  curso_ingreso_principal: string;
  orientacion_religiosa: string;
  promedio_alumnos_curso: number;
  vacantes_curso_ingreso: number;
  infraestructura: string;
  deportes: string;
  actividades_extraprogramaticas: string;
  apoyo_aprendizaje: string;
  pago_matricula: string;
  pago_mensual: string;
  becas_disponibles: number;
  tipo_conexion_internet: string;
  velocidad_conexion: string;
  google_nombre: string;
  google_direccion: string;
  created_at: string;
  updated_at: string;
  reviews: any[];
  resultados_simce: any[];
}

interface ApiReview {
  id: number;
  rating: number;
  texto: string;
  autor: string;
  fecha_relativa: string;
  idioma: string;
  created_at: string;
}

interface ReviewsResponse {
  items: ApiReview[];
  count: number;
}

interface SchoolReviewsResult {
  averageRating: number;
  reviewCount: number;
  reviews: ApiReview[];
}

const fetchSchoolReviews = async (schoolId: number): Promise<SchoolReviewsResult> => {
  try {
    const response = await fetch(`https://tucolegioapi.onrender.com/api/colegios/${schoolId}/reviews`);
    if (!response.ok) {
      console.warn(`Failed to fetch reviews for school ${schoolId}`);
      return {
        averageRating: 0,
        reviewCount: 0,
        reviews: []
      };
    }
    
    const data: ReviewsResponse = await response.json();
    const reviews = data.items || [];
    
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        reviewCount: 0,
        reviews: []
      };
    }
    
    const totalRating = reviews.reduce((sum: number, review) => sum + (review.rating || 0), 0);
    const averageRating = totalRating / reviews.length;
    
    return {
      averageRating,
      reviewCount: data.count || reviews.length,
      reviews
    };
    
  } catch (error) {
    console.error(`Error fetching reviews for school ${schoolId}:`, error);
    return {
      averageRating: 0,
      reviewCount: 0,
      reviews: []
    };
  }
};

const SchoolProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`https://tucolegioapi.onrender.com/api/colegios/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo cargar la información del colegio`);
        }
        
        const data = await response.json();
        const { averageRating, reviewCount, reviews } = await fetchSchoolReviews(parseInt(id));
        setSchoolData({
          ...data,
          google_rating_promedio: averageRating,
          google_total_reviews: reviewCount,
          reviews: reviews
        });
        setReviewsData({
          items: reviews,
          count: reviewCount
        });
        const nombre = "Albamar";
        const response2 = await fetch(`https://tucolegioapi.onrender.com/api/colegios?nombre=${encodeURIComponent(nombre)}`);
        const data2 = await response2.json();
        console.log(data2)
      } catch (error) {
        console.error("Error fetching school data:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando información del colegio...</p>
        </div>
      </div>
    );
  }

  if (error || !schoolData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar el colegio</h2>
          <p className="text-gray-600 mb-6">{error || "No se encontró la información del colegio"}</p>
          <Link to="/resultados">
            <Button>Volver a los resultados</Button>
          </Link>
        </div>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link to="/resultados">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a resultados
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Photo Gallery */}
        <PhotoGallery />

        {/* School Banner - no spacing above */}
        <SchoolBanner 
          name={schoolData.nombre}
          location={`${schoolData.direccion}, ${schoolData.comuna}, ${schoolData.region}`}
          rating={schoolData.google_rating_promedio}
          reviewCount={schoolData.google_total_reviews}
        />

        {/* Rest of content with spacing */}
        <div className="p-6 space-y-8">
          {/* Contact Information */}
          <InfoSection title="Información de Contacto" icon={Phone}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Contacto</h3>
                <div className="space-y-2">
                  {schoolData.telefono && (
                    <p>📞 <a href={`tel:${schoolData.telefono}`} className="text-blue-600 hover:text-blue-800 underline">{schoolData.telefono}</a></p>
                  )}
                  {schoolData.email && (
                    <p>✉️ <a href={`mailto:${schoolData.email}`} className="text-blue-600 hover:text-blue-800 underline">{schoolData.email}</a></p>
                  )}
                  {schoolData.pagina_web && (
                    <p>🌐 <a href={schoolData.pagina_web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">{schoolData.pagina_web}</a></p>
                  )}
                </div>
              </div>
              <div>
                <p><strong>Dirección:</strong> {schoolData.direccion}, {schoolData.comuna}, {schoolData.region}</p>
                <p><strong>RBD:</strong> {schoolData.rbd}</p>
                <p><strong>Dependencia:</strong> {schoolData.dependencia}</p>
                <p><strong>Sostenedor:</strong> {schoolData.sostenedor}</p>
              </div>
            </div>
          </InfoSection>

          {/* General Information */}
          <InfoSection title="Información General" icon={BookOpen}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Características</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Nivel de Enseñanza:</strong> {schoolData.nivel_ensenanza}</p>
                    <p><strong>Matrícula Total:</strong> {schoolData.matricula_total} estudiantes</p>
                    <p><strong>Número de Docentes:</strong> {schoolData.numero_docentes}</p>
                    <p><strong>Promedio Alumnos por Curso:</strong> {schoolData.promedio_alumnos_curso}</p>
                  </div>
                  <div>
                    <p><strong>Curso de Ingreso Principal:</strong> {schoolData.curso_ingreso_principal}</p>
                    <p><strong>Vacantes Curso de Ingreso:</strong> {schoolData.vacantes_curso_ingreso}</p>
                    <p><strong>Orientación Religiosa:</strong> {schoolData.orientacion_religiosa}</p>
                    <p><strong>Becas Disponibles:</strong> {schoolData.becas_disponibles}</p>
                  </div>
                </div>
              </div>
            </div>
          </InfoSection>

          {/* Cost Information */}
          {(schoolData.pago_matricula || schoolData.pago_mensual) && (
            <InfoSection title="Información de Costos" icon={Award}>
              <div className="space-y-4">
                {schoolData.pago_matricula && (
                  <div>
                    <h3 className="font-bold text-lg mb-2">Matrícula</h3>
                    <p>{schoolData.pago_matricula}</p>
                  </div>
                )}
                {schoolData.pago_mensual && (
                  <div>
                    <h3 className="font-bold text-lg mb-2">Colegiatura Mensual</h3>
                    <p>{schoolData.pago_mensual}</p>
                  </div>
                )}
              </div>
            </InfoSection>
          )}

          {/* Infrastructure */}
          {schoolData.infraestructura && (
            <InfoSection title="Infraestructura" icon={Users}>
              <div>
                <p>{schoolData.infraestructura}</p>
              </div>
            </InfoSection>
          )}

          {/* Sports */}
          {schoolData.deportes && (
            <InfoSection title="Deportes" icon={Dumbbell}>
              <div>
                <p>{schoolData.deportes}</p>
              </div>
            </InfoSection>
          )}

          {/* Extracurricular Activities */}
          {schoolData.actividades_extraprogramaticas && (
            <InfoSection title="Actividades Extraprogramáticas" icon={Zap}>
              <div>
                <p>{schoolData.actividades_extraprogramaticas}</p>
              </div>
            </InfoSection>
          )}

          {/* Learning Support */}
          {schoolData.apoyo_aprendizaje && (
            <InfoSection title="Apoyo al Aprendizaje" icon={Brain}>
              <div>
                <p>{schoolData.apoyo_aprendizaje}</p>
              </div>
            </InfoSection>
          )}

          {/* Internet Connection */}
          {(schoolData.tipo_conexion_internet || schoolData.velocidad_conexion) && (
            <InfoSection title="Conectividad" icon={Globe}>
              <div className="space-y-2">
                {schoolData.tipo_conexion_internet && (
                  <p><strong>Tipo de Conexión:</strong> {schoolData.tipo_conexion_internet}</p>
                )}
                {schoolData.velocidad_conexion && (
                  <p><strong>Velocidad de Conexión:</strong> {schoolData.velocidad_conexion}</p>
                )}
              </div>
            </InfoSection>
          )}

          {/* Reviews Section */}
          <ReviewsSection reviewsData={reviewsData} />

          {/* Rating Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Calificación Promedio</h3>
            <div className="flex items-center justify-center gap-4">
              <StarRating rating={schoolData.google_rating_promedio} size="lg" />
              <span className="text-3xl font-bold text-gray-900">{(schoolData.google_rating_promedio || 0)}</span>
              <span className="text-gray-500">({schoolData.google_total_reviews} reseñas)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolProfile;