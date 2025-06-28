
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MenuIcon, PhoneIcon } from 'lucide-react';

interface HeaderProps {
  onBookNow: () => void;
  onDentistAccess: () => void;
}

const Header = ({
  onBookNow,
  onDentistAccess
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = 64; // Height of the sticky header (h-16 = 64px)
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerHeight - 20; // Extra 20px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const handleLogoDoubleClick = () => {
    onDentistAccess();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div 
              className="w-14 h-14 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              onDoubleClick={handleLogoDoubleClick}
            >
              <img 
                src="/lovable-uploads/6a05d520-602e-4c7d-8853-bc4fe00a965f.png" 
                alt="Tumala Dental Clinic Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-primary text-lg">TUMALA</span>
              <span className="text-primary dental-shimmer font-semibold text-2xl">Dental Clinic</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleSmoothScroll('services-area')} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
              Services
            </button>
            <button onClick={() => handleSmoothScroll('about-area')} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => handleSmoothScroll('contact-area')} className="text-gray-600 hover:text-primary transition-colors cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={onBookNow} className="bg-primary hover:bg-primary/90">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => handleSmoothScroll('services-area')} className="text-gray-600 hover:text-primary transition-colors text-left">
                Services
              </button>
              <button onClick={() => handleSmoothScroll('about-area')} className="text-gray-600 hover:text-primary transition-colors text-left">
                About
              </button>
              <button onClick={() => handleSmoothScroll('contact-area')} className="text-gray-600 hover:text-primary transition-colors text-left">
                Contact
              </button>
              <div className="pt-4 border-t">
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  +63 999 464 8865
                </div>
                <Button onClick={onBookNow} className="w-full bg-primary hover:bg-primary/90">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Book Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
