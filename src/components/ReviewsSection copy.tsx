
import { MessageSquare, ThumbsUp } from "lucide-react";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";

interface Review {
  id: number;
  author: string;
  role: string;
  rating: number;
  date: string;
  recommendation: string;
  bestAspect: string;
  improvements: string;
  helpful: number;
}

const ReviewsSection = () => {
  const reviews: Review[] = [
    {
      id: 1,
      author: "Exalumno/a",
      role: "Sí, totalmente",
      rating: 5,
      date: "Hace 2 meses",
      recommendation: "Lo recomiendas?: Sí, totalmente",
      bestAspect: "Que tiene un muy buen ambiente, siempre velan por el bien y tiene una muy buena formación humana, busca el desarrolló de virtudes e por parte de las alumnas. Además a pesar de ser un colegio católico \"conservador\", no obligan a nadie a hacer nada. Yo creo que de las cosas más importantes es que las profesoras son súper cercanas, siempre buscan que una aprenda, lo que da una motivación muy grande.",
      improvements: "Mmm quizás el apoyar más otras áreas, como deportes y música, pero se entiende que no sea tan así, ya que tiene un enfoque académico de excelencia.",
      helpful: 12
    },
    {
      id: 2,
      author: "Exalumno/a",
      role: "Sí, totalmente",
      rating: 5,
      date: "Hace 3 meses",
      recommendation: "Lo recomiendas?: Sí, totalmente",
      bestAspect: "Formación académica, valores y el ambiente del colegio. Siempre todos dispuestos a ayudarte.",
      improvements: "Elegir bien a algunas profesoras",
      helpful: 8
    },
    {
      id: 3,
      author: "Exapoderado/a",
      role: "Sí, totalmente",
      rating: 5,
      date: "Hace 6 meses",
      recommendation: "Lo recomiendas?: Sí, totalmente",
      bestAspect: "Formación académica , excelentes profesores y la calidad humana y compañerismo entre las alumnas . Inculcan miy buenos valores .",
      improvements: "No agregar mas alumnas por curso . Mantener una cantidad  de alumnas  por sala, que les permita  aprender y desenvolverse de la mejor forma posible .",
      helpful: 15
    }
  ];

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

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{review.author}</h4>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{review.role}</span>
                </div>
                <div className="flex items-center gap-3">
                  <StarRating rating={review.rating} size="sm" showNumber={false} />
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-bold text-sm text-gray-800 mb-2">¿Qué fue lo mejor del colegio según tu experiencia?</h5>
                <p className="text-gray-700 leading-relaxed">
                  {review.bestAspect}
                </p>
              </div>
              
              <div>
                <h5 className="font-bold text-sm text-gray-800 mb-2">¿Qué aspectos crees que podrían mejorar?</h5>
                <p className="text-gray-700 leading-relaxed">
                  {review.improvements}
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
          Ver Todas las Reseñas (142)
        </Button>
      </div>
    </section>
  );
};

export default ReviewsSection;
