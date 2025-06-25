
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

const PhotoGallery = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  
  const photos = [
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop",
  ];

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-t-lg bg-gray-100">
      <img
        src={photos[currentPhoto]}
        alt={`Colegio foto ${currentPhoto + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      
      {/* Navigation buttons */}
      <button
        onClick={prevPhoto}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={nextPhoto}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Expand button */}
      <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200">
        <Expand className="w-5 h-5" />
      </button>

      {/* Photo indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhoto(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentPhoto ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
