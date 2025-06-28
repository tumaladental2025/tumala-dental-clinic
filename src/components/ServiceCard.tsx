
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: string;
  };
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const { targetRef, isIntersecting } = useIntersectionObserver();

  return (
    <div
      ref={targetRef}
      className={`transform transition-all duration-700 ease-out ${
        isIntersecting
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white h-full">
        <CardHeader className="text-center">
          <CardTitle className="text-primary">{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">{service.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCard;
