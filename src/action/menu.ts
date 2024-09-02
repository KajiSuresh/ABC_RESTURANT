// file: src/services/menu.ts

export interface MenuData {
    name: string;
    description?: string;
    price: number;
    category: string;
  }
  
  export interface Menu extends MenuData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export const menuService = {
    async getMenuItems(): Promise<Menu[]> {
      const response = await fetch('/api/menu');
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const data = await response.json();
      return data.menuItems;
    },
  
    async createMenuItem(menuData: MenuData): Promise<Menu> {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      });
      if (!response.ok) {
        throw new Error('Failed to create menu item');
      }
      const data = await response.json();
      return data.menuItem;
    },
  
    async deleteMenuItem(id: string): Promise<void> {
      const response = await fetch(`/api/menu?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete menu item');
      }
    },
  
    async updateMenuItem(id: string, menuData: Partial<MenuData>): Promise<Menu> {
      const response = await fetch(`/api/menu?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      });
      if (!response.ok) {
        throw new Error('Failed to update menu item');
      }
      const data = await response.json();
      return data.menuItem;
    },
  };