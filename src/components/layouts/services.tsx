'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ServiceType, serviceTypeService } from '@/action/service';

const ServiceCard: React.FC<{ service: ServiceType }> = ({ service }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden min-w-[300px]">
    <Image src={service.serviceImage} alt={service.serviceName} width={300} height={200} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{service.serviceName}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  </div>
);

const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await serviceTypeService.getServiceTypes();
        setServices(fetchedServices);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch services');
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          We also offer unique services for your events
        </h2>

        <div className="flex overflow-x-auto space-x-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
