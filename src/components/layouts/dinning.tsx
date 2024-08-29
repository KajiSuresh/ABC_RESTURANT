'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const Dinning = () => {
  const treatments = [
    { name: "Harbour Court", image: "/dining/d1.jpg" },
    { name: "Steakbar", image: "/dining/d2.jpg" },
    { name: "Ocean", image: "/dining/d3.jpg" },
    { name: "Sky Lounge", image: "/dining/d4.jpg" },
    { name: "Honey Beach Club", image: "/dining/d5.jpg" },
    { name: "Ghost Restaurant", image: "/dining/d6.jpg" },
    
  ];

  const [selectedTreatment, setSelectedTreatment] = useState(treatments[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
      <h1 className="text-4xl font-bold text-center mb-4">DINING AT THE ABC</h1>
      <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
      Elegant dining experiences in beautifully designed restaurants and bars with award winning chefs curating unique dishes to satisfy any craving.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          {treatments.map((treatment, index) => (
            <div 
              key={index} 
              className={`py-2 px-4 mb-2 cursor-pointer hover:bg-gray-900 transition-colors rounded-2xl ${
                treatment.name === selectedTreatment.name ? 'bg-gray-900 font-semibold text-yellow-500' : ''
              }`}
              onClick={() => setSelectedTreatment(treatment)}
            >
              {treatment.name}
            </div>
          ))}
        </div>

        <div className="w-full md:w-3/4">
          <div className="relative h-[600px]">
            <Image
              src={selectedTreatment.image}
              alt={`${selectedTreatment.name} at Serenity Spa`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dinning;