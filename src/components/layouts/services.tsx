import React from 'react';
import Image from 'next/image';

const ServiceCard: React.FC<{ imageSrc: string; title: string; description: string }> = ({ imageSrc, title, description }) => (
  <div className="flex-1 min-w-[250px] max-w-[300px]">
    <Image
      src={imageSrc}
      alt={title}
      width={300}
      height={200}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      imageSrc: "/services/roomser.jpg",
      title: "Room service",
      description: "Grill Room Service. In this type of service, various vegetables and meats are displayed for better view and choice.",
    },
    {
      imageSrc: "/services/bufser.jpg",
      title: "Buffet service",
      description: "Buffet Service Style. The buffet is self-service, where food is displayed on tables.",
    },
    {
      imageSrc: "/services/gueser.jpg",
      title: "Gueridon service",
      description: "Partially cooked food from the kitchen is taken to the Gueridon Trolly for cooking it completely.",
    },
    {
      imageSrc: "/services/fcser.jpg",
      title: "Food court",
      description: "Fast-food restaurants have become an integral part of modern dining culture, offering quick and convenient service for people on the go.",
    },
    
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 max-w-2xl">
        We also offer unique services for your events
      </h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;