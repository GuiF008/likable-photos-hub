
import React from "react";
import ImageCard from "./ImageCard";

interface ImageGalleryProps {
  images: Array<{ url: string; id: string }>;
  isAdmin?: boolean;
  onDeleteImage?: (id: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  isAdmin = false,
  onDeleteImage 
}) => {
  return (
    <div className="w-full">
      {images.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Aucune image n'a été téléchargée. Téléchargez votre première image !
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <ImageCard 
              key={image.id} 
              image={image} 
              isAdmin={isAdmin}
              onDelete={onDeleteImage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
