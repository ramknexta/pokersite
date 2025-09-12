
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

// Default placeholder image
const PLACEHOLDER_IMAGE = "/placeholder.svg";

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  // Filter out empty strings and null/undefined values
  const filteredImages = images?.filter(img => img && img.trim() !== "") || [];
  
  // Use at least 3 placeholder images if no valid images provided
  const displayImages = filteredImages.length > 0 
    ? filteredImages 
    : [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setDialogOpen(true);
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleImageError = (index: number) => {
    setFailedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // Get the image source, using placeholder for failed images
  const getImageSrc = (index: number) => {
    return failedImages[index] ? PLACEHOLDER_IMAGE : displayImages[index];
  };

  if (!displayImages || displayImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg h-48 text-muted-foreground">
        <ImageOff className="h-12 w-12 mb-4 opacity-50" />
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayImages.map((image, index) => (
          <Card 
            key={index} 
            className={cn("overflow-hidden cursor-pointer transition-transform hover:scale-[1.03]", 
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            )}
            onClick={() => handleImageClick(index)}
          >
            <div className="aspect-video md:aspect-auto h-full">
              <img 
                src={getImageSrc(index)} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                onError={() => handleImageError(index)}
              />
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 border-none text-white"
              onClick={() => setDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center justify-center h-[80vh]">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 z-10 bg-black/50 hover:bg-black/70 border-none text-white"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <img
                src={getImageSrc(selectedImageIndex)}
                alt={`Full size image ${selectedImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                onError={() => handleImageError(selectedImageIndex)}
              />
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 z-10 bg-black/50 hover:bg-black/70 border-none text-white"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === selectedImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  )}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
