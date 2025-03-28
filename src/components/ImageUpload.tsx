
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageUpload: (image: { url: string; id: string }) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const newImage = {
          url: e.target.result.toString(),
          id: Date.now().toString(),
        };
        onImageUpload(newImage);
        toast.success("Image téléchargée avec succès");
      }
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-blue-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500">
            Glissez-déposez une image ici ou
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="cursor-pointer" asChild>
              <span>Parcourir</span>
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
