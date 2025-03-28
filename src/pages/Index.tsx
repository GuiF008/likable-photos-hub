
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ImageUpload";
import ImageGallery from "@/components/ImageGallery";

const Index = () => {
  const [images, setImages] = useState<Array<{ url: string; id: string }>>([]);

  const handleImageUpload = (newImage: { url: string; id: string }) => {
    setImages([newImage, ...images]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Galerie de Photos
        </h1>
        <p className="text-gray-600">
          Téléchargez vos photos et laissez les autres les évaluer
        </p>
      </header>

      <Separator className="my-6" />

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Télécharger une nouvelle photo
        </h2>
        <ImageUpload onImageUpload={handleImageUpload} />
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl font-semibold mb-6 text-center">
          {images.length > 0 ? "Galerie de photos" : "Aucune photo"}
        </h2>
        <ImageGallery images={images} />
      </section>
    </div>
  );
};

export default Index;
