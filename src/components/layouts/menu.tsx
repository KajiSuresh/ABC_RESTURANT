'use client'
import React, { useState } from 'react';
import { Menu } from 'lucide-react';

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price }) => (
  
  <div className=" p-4 bg-gray-800 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 gap-2">
  <div className="flex justify-between items-baseline mb-1">
    <h3 className="text-lg font-semibold text-white">{name}</h3>
    <span className="text-sm text-yellow-400 font-bold">Rs{price}</span>
  </div>
  <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
  <div className="border-b border-dotted border-gray-600 mt-4"></div>
</div>

  
);

const MenuPage = () => {
  const [activeMenu, setActiveMenu] = useState('Starters');

  const menuCategories: Record<'Starters' | 'Main Course' | 'Desserts', MenuItemProps[]> = {
    Starters: [
      { name: "Mutton Rolls", description: "Easy, flavorful Short Eats with seasoned potato and slow-cooked mutton.", price: "250.00" },
      { name: "Fish Cutlets", description: "These delicious deep-fried balls contain a spicy fish filling. They’re perfect as a snack or as a side-dish.", price: "100.00" },
      { name: "Coconut Fudge", description: "Saffron infused Coconut FudgeNot your regular “Pol Toffee” or “Coconut.", price: "300.00" },
      { name: "Jaggery Cake", description: "Cashew loaded Jaggery Cake on a chilled Sunday Evening with", price: "500.00" },

    ],
    "Main Course": [
      { name: " Rice and Curry", description: "Rice and Curry! A typical Sri Lankan meal consists of steamed rice served with a variety of curries.", price: "500.00" },
      { name: "Hoppers (Appam)", description: "a bowl-shaped pancakes made from a fermented rice flour batter.", price: "100.00" },
      { name: "Indiappa", description: " Crafting these delights involves creating a soft dough by blending rice flour and water.", price: "200.00" },
      { name: "Kottu Roti", description: "Experience the most popular street food dish from Sri Lanka", price: "1000.00" },
      { name: "Lamprais", description: "A legacy of Dutch colonial and Portuguese influence, Lamprais is a flavorful and popular dish.", price: "800.00" },
      { name: "Pol Roti", description: "Pol Roti, in Sinhalese translates to coconut roti, or coconut flatbread is a very popular type of flatbread made in Sri Lanka.", price: "200.00" },
    ],
    // Seafood: [
    //   { name: "Oysters Rockefeller", description: "Five pieces of imported oysters topped with spinach and breadcrumbs", price: "20.00" },
    //   { name: "Lobster Tail", description: "Butter-poached lobster tail with garlic and herbs", price: "35.00" },
    // ],
    Desserts: [
      { name: "Aluwa", description: "palm treacle or coconut and rice flour and garnished with cashews, the simple rice flour aluwa is a pure delight to have", price: "100.00" },
      { name: "Aasmi", description: "Mouthwatering dessert made with rice flour, coconut milk, and cinnamon leaves.", price: "150.00" },
      { name: "Aasmi", description: "made from buffalo milk curd which takes it to a healthier side.", price: "550.00" },
      { name: "Wattalapam ", description: "mouth-smacking pudding that is made during festivals in Sri Lanka or any other special occasion.", price: "250.00" },
      { name: "Kalu Dodol", description: "coconut desserts which is made from rice flour, jaggery, and thick coconut milk which is garnished with raisins and nuts", price: "800.00" },
      { name: "Kokis", description: "Kokis, a simple batter is prepared with rice flour, coconut milk, and a pinch of salt", price: "150.00" },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white p-8 h-[900px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">OUR MENU</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
          ABC Restaurants menu features a diverse selection of dishes, crafted from the finest ingredients, offering flavors that cater to every palate.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 mb-12 overflow-x-auto pb-4">
          {Object.keys(menuCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveMenu(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeMenu === category
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuCategories[activeMenu as keyof typeof menuCategories].map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200 flex items-center mx-auto">
            <Menu className="mr-2" />
            VIEW FULL MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;