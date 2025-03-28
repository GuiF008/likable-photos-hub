
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";
import ImageGallery from "@/components/ImageGallery";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

// Mot de passe admin simple (en situation réelle, il faudrait utiliser une méthode plus sécurisée)
const ADMIN_PASSWORD = "admin123";

const Index = () => {
  const [images, setImages] = useState<Array<{ url: string; id: string }>>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const handleImageUpload = (newImage: { url: string; id: string }) => {
    setImages([newImage, ...images]);
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter(image => image.id !== id));
    toast.success("Image supprimée avec succès");
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      toast.success("Connecté en tant qu'administrateur");
    } else {
      toast.error("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setPassword("");
    toast.info("Déconnecté du mode administrateur");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="text-left flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            JustLike
          </h1>
          <p className="text-gray-600 text-sm max-w-2xl">
            Partage ton opinion sur ces images en cliquant sur "J'aime" si elles te plaisent ou sur "Je n'aime pas" si elles ne te conviennent pas. Ton avis nous aide à mieux comprendre tes préférences !
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-3 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600 font-medium">Mode Admin</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-500"
              >
                Déconnexion
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Admin</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-4">
                  <h3 className="font-medium">Connexion administrateur</h3>
                  <Input 
                    type="password" 
                    placeholder="Mot de passe" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={handleLogin} className="w-full">
                    Se connecter
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
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
        <ImageGallery 
          images={images} 
          isAdmin={isAdmin}
          onDeleteImage={handleDeleteImage}
        />
      </section>
    </div>
  );
};

export default Index;
