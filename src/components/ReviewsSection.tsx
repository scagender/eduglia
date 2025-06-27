import { MessageSquare, ThumbsUp } from "lucide-react";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";

interface Review {
  id: number;
  rating: number;
  texto: string;
  autor: string;
  fecha_relativa: string;
  idioma: string;
  created_at: string;
}

interface ReviewsSectionProps {
  reviewsData?: {
    items: Review[];
    count: number;
  };
}

const ReviewsSection = ({ reviewsData }: ReviewsSectionProps) => {
  // Transformamos los datos de la API al formato que espera el componente
  const transformedReviews = reviewsData?.items?.map((review) => ({
    id: review.id,
    author: review.autor || "Anónimo",
    role: "Exalumno/a", // Podrías mapear esto según algún campo si lo tienes
    rating: review.rating,
    date: review.fecha_relativa || new Date(review.created_at).toLocaleDateString(),
    recommendation: review.rating >= 4 ? "Sí, totalmente" : review.rating >= 2 ? "Sí, parcialmente" : "No lo recomiendo",
    bestAspect: review.texto || " ",
    improvements: "", // Este campo no viene en la API, podrías omitirlo o pedirlo
    helpful: 0 // Podrías obtener este dato si la API lo proporciona
  })) || [];

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <MessageSquare className="w-5 h-5 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Reseñas de Padres y Estudiantes</h2>
        </div>
        <Button variant="outline">
          Escribir Reseña
        </Button>
      </div>

      {transformedReviews.length > 0 ? (
        <>
          <div className="grid gap-6">
            {transformedReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{review.author}</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <StarRating rating={review.rating} size="sm" showNumber={false} />
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-bold text-sm text-gray-800 mb-2">Reseña</h5>
                    <p className="text-gray-700 leading-relaxed">
                      {review.bestAspect}
                    </p>
                  </div>

                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Útil ({review.helpful})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Button variant="outline" className="w-full md:w-auto">
              Ver Todas las Reseñas ({reviewsData?.count || 0})
            </Button>
          </div>
        </>
      ) : (
        <div className="py-8 text-center">
          <p className="text-gray-500">No hay reseñas disponibles todavía</p>
          <Button variant="outline" className="mt-4">
            Sé el primero en escribir una reseña
          </Button>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;