'use client';
import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price }) => (
  <div className="p-4 bg-gray-800 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 gap-2">
    <div className="flex justify-between items-baseline mb-1">
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <span className="text-sm text-yellow-400 font-bold">Rs {price}.00</span>
    </div>
    <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
    <div className="border-b border-dotted border-gray-600 mt-4"></div>
  </div>
);

const MenuPage = () => {
  const [activeMenu, setActiveMenu] = useState('Starters');
  const [menuCategories, setMenuCategories] = useState<Record<string, MenuItemProps[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();
        
        // Organize menu items by category
        const categorizedMenu: Record<string, MenuItemProps[]> = data.menuItems.reduce(
          (acc: Record<string, MenuItemProps[]>, item: MenuItemProps) => {
            const { category } = item;
            if (!acc[category]) acc[category] = [];
            acc[category].push(item);
            return acc;
          },
          {}
        );

        setMenuCategories(categorizedMenu);
      } catch (err) {
        setError('Error fetching menu items.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white p-8 h-[900px]" id='menu'>
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
          {menuCategories[activeMenu]?.map((item) => (
            <MenuItem key={item.id} {...item} />
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
