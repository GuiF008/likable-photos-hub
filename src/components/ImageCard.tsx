
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: {
    url: string;
    id: string;
  };
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, isAdmin = false, onDelete }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => {
    if (userVote === "like") {
      setLikes(likes - 1);
      setUserVote(null);
    } else {
      if (userVote === "dislike") {
        setDislikes(dislikes - 1);
      }
      setLikes(likes + 1);
      setUserVote("like");
    }
  };

  const handleDislike = () => {
    if (userVote === "dislike") {
      setDislikes(dislikes - 1);
      setUserVote(null);
    } else {
      if (userVote === "like") {
        setLikes(likes - 1);
      }
      setDislikes(dislikes + 1);
      setUserVote("dislike");
    }
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(image.id);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-2">
        <div className="relative overflow-hidden rounded-md aspect-square">
          <img
            src={image.url}
            alt="Uploaded image"
            className="object-cover w-full h-full"
          />
          {isAdmin && (
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 opacity-80 hover:opacity-100"
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-gray-50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              userVote === "like" && "text-blue-600"
            )}
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              userVote === "dislike" && "text-red-600"
            )}
            onClick={handleDislike}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{dislikes}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
