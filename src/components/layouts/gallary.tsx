import Image from 'next/image';

const menuItems = [
  { name: "Rainy Roof Signature Meal", image: "/i1.jpg" },
  { name: "Malai Kebab", image: "/i2.jpg" },
  { name: "Cashew nut Salad", image: "/i3.jpg" },
  { name: "Reyash Laham", image: "/i1.jpg" },
  { name: "Rainy Roof Mixed Grill", image: "/i1.jpg" },
  { name: "Grilled Lobster", image: "/i1.jpg" },
  { name: "Beef Sirloin Steak", image: "/i1.jpg" },
  { name: "Fish Fillet Steak", image: "/i1.jpg" },
];

export default function Gallery() {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white shadow-md overflow-hidden group">
            <div className="relative h-60 transform transition-transform duration-300 group-hover:scale-105">
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300 group-hover:opacity-80"
              />
              {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-xl font-semibold text-white bg-black bg-opacity-50 p-2 rounded">
                  {item.name}
                </h2>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}