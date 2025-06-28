import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, PhoneIcon, MailIcon, MapPinIcon, ChevronRight } from 'lucide-react';
import BookingModal from '@/components/BookingModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DentistLogin from '@/components/DentistLogin';
import ServiceCard from '@/components/ServiceCard';
import ImageGallery from '@/components/ImageGallery';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDentistLoginOpen, setIsDentistLoginOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);
  const [isCtaButtonHighlighted, setIsCtaButtonHighlighted] = useState(false);
  const {
    displayedText,
    isComplete
  } = useTypingAnimation("Your Perfect Smile Starts Here", 80, 0);
  
  const handleBookingClick = () => {
    setIsButtonHighlighted(true);
    setIsBookingOpen(true);

    // Remove highlight after animation
    setTimeout(() => {
      setIsButtonHighlighted(false);
    }, 400);
  };
  
  const handleCtaBookingClick = () => {
    setIsCtaButtonHighlighted(true);
    setIsBookingOpen(true);

    // Remove highlight after animation
    setTimeout(() => {
      setIsCtaButtonHighlighted(false);
    }, 400);
  };
  
  const handleMapClick = () => {
    window.open('https://maps.app.goo.gl/Mnej5iLxeQNfKZur7', '_blank');
  };

  const handleDentistAccess = () => {
    setIsDentistLoginOpen(true);
  };

  const handleGalleryOpen = () => {
    setIsGalleryOpen(true);
  };
  
  const services = [{
    title: "General Dentistry",
    description: "Comprehensive oral health care including cleanings, fillings, and preventive treatments.",
    icon: "🦷"
  }, {
    title: "TMJ-Practitioner",
    description: "Specialized treatment for temporomandibular joint disorders, jaw pain, and bite alignment issues.",
    icon: "🔧"
  }, {
    title: "Orthodontics",
    description: "Straighten your teeth with braces, clear aligners, and orthodontic treatments.",
    icon: "🦷"
  }, {
    title: "Pediatric Dentistry",
    description: "Specialized dental care for children, focusing on prevention and creating positive dental experiences.",
    icon: "👶"
  }, {
    title: "Radiograph (XRAY)",
    description: "Advanced digital X-ray imaging for accurate diagnosis and treatment planning.",
    icon: "📸"
  }, {
    title: "Prosthodontics",
    description: "Restoration and replacement of teeth with crowns, bridges, dentures, and implants.",
    icon: "🦷"
  }, {
    title: "Esthetics",
    description: "Cosmetic dental treatments to enhance your smile's appearance and boost confidence.",
    icon: "✨"
  }];

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onBookNow={handleBookingClick} 
        onDentistAccess={handleDentistAccess}
      />
      
      {/* Hero Section */}
      <section className="relative dental-gradient text-white py-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 md:text-5xl min-h-[4rem] flex items-center justify-center">
            {displayedText}
            {!isComplete && <span className="animate-pulse ml-1">|</span>}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Looking for a gentle & effective dental experience? Don't hesitate to visit us. We're committed to providing you with healthy, confident smile.
          </p>
          <Button size="lg" className={`bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-700 animate-zoom-gentle ${isButtonHighlighted ? 'ring-4 ring-blue-300 ring-opacity-75 shadow-lg scale-110' : ''}`} onClick={handleBookingClick}>
            <CalendarIcon className="mr-2 h-5 w-5" />
            Book Your Appointment
          </Button>
        </div>
      </section>

      <section className="py-16 px-4 dental-wave-bg">
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto relative">
            <div className="rounded-lg overflow-hidden shadow-lg relative" style={{
              paddingTop: '56.25%'
            }}>
              <iframe src="https://www.youtube.com/embed/vkijaBkDdJM?autoplay=1&mute=1&loop=1&playlist=vkijaBkDdJM&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1&hd=1&vq=hd1080&quality=hd1080&title=0&byline=0&portrait=0&branding=0&autohide=1&theme=light&color=white&start=0&end=0" className="absolute top-0 left-0 w-full h-full md:w-full md:h-full" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title="Tumala Dental Clinic Video" style={{
                aspectRatio: '16/9',
                objectFit: 'cover'
              }} />
            </div>
            
            <Button
              onClick={handleGalleryOpen}
              className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
              size="icon"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      <section id="services-area" className="py-16 px-4 dental-accent-bg">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive dental care tailored to your needs, delivered with the latest technology and gentle care.
            </p>
          </div>
          
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {services.slice(0, 6).map((service, index) => <ServiceCard key={index} service={service} index={index} />)}
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <ServiceCard service={services[6]} index={6} />
              </div>
            </div>
          </div>

          <div className="block md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, index) => <ServiceCard key={index} service={service} index={index} />)}
            </div>
          </div>
        </div>
      </section>

      <section id="about-area" className="py-16 px-4 dental-pattern">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Visit Our Modern Clinic</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-gray-600">4009-A Richtofen St. Hensonville,<br />Brgy. Malabanias, Angeles City, Pampanga</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <ClockIcon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Office Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p>Sunday: 1:00 PM - 7:00 PM</p>
                      
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <PhoneIcon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Contact</h3>
                    <p className="text-gray-600">
                      Clinic: 09994648856<br />
                      Email: tumaladentalclinic@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300" onClick={handleMapClick}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.8847742562577!2d120.58825897589!3d15.155638985276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f27a7b5c7b7b%3A0x8b8b8b8b8b8b8b8b!2s4009-A%20Richtofen%20St%2C%20Angeles%2C%20Pampanga%2C%20Philippines!5e0!3m2!1sen!2sph!4v1640995200000!5m2!1sen!2sph" width="100%" height="384" style={{
              border: 0
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Tumala Dental Clinic Location" className="pointer-events-none" />
              
            </div>
          </div>
        </div>
      </section>

      <section id="contact-area" className="py-16 px-4 dental-gradient text-white text-center">
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Schedule Your Visit?</h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards a healthier, more beautiful smile today.
          </p>
          <Button size="lg" className={`bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-700 animate-zoom-gentle ${isCtaButtonHighlighted ? 'ring-4 ring-blue-300 ring-opacity-75 shadow-lg scale-110' : ''}`} onClick={handleCtaBookingClick}>
            <CalendarIcon className="mr-2 h-5 w-5" />
            Book Now - It's Easy!
          </Button>
        </div>
      </section>

      <Footer />
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <DentistLogin isOpen={isDentistLoginOpen} onClose={() => setIsDentistLoginOpen(false)} />
      <ImageGallery isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
    </div>
  );
};

export default Index;
