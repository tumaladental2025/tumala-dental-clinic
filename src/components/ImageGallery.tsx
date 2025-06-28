
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageGallery = ({ isOpen, onClose }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    {
      src: "/lovable-uploads/3eee65bc-67e3-4f0c-b12d-ac98b7cb653d.png",
      alt: "Dental chair and equipment with monitor"
    },
    {
      src: "/lovable-uploads/38e21af4-7dc0-4d8f-b9bb-659ecad5daab.png",
      alt: "Dentist working with patient"
    },
    {
      src: "/lovable-uploads/9def884f-181c-4d95-af34-6bb7534f19d9.png",
      alt: "Clinic reception area"
    },
    {
      src: "/lovable-uploads/3023fe03-b87f-4c38-97fc-d13c7fb0b3fe.png",
      alt: "Clinic waiting area"
    },
    {
      src: "/lovable-uploads/76f36abf-e29b-41ea-ae28-b301a95144e1.png",
      alt: "Dentist with dental equipment"
    },
    {
      src: "/lovable-uploads/f0e38a7f-ff68-468a-a9a4-2f8df7d93661.png",
      alt: "Modern dental chair setup"
    }
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black/95">
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-4 z-10 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-full object-contain"
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-4 z-10 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGallery;
