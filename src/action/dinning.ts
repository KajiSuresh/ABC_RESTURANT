import { Prisma } from '@prisma/client';

export interface DiningTableData {
  diningName: string;
  diningImage: string;
}

export interface DiningTable extends DiningTableData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const diningTableService = {
  async getDiningTables(): Promise<DiningTable[]> {
    const response = await fetch('/api/dinning');
    if (!response.ok) {
      throw new Error('Failed to fetch dining tables');
    }
    const data = await response.json();
    return data.diningTables;
  },

  async createDiningTable(diningTableData: DiningTableData): Promise<DiningTable> {
    const response = await fetch('/api/dinning', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diningTableData),
    });
    if (!response.ok) {
      throw new Error('Failed to create dining table');
    }
    const data = await response.json();
    return data.diningTable;
  },

  async deleteDiningTable(id: string): Promise<void> {
    const response = await fetch(`/api/dinning?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete dining table');
    }
  },

  async updateDiningTable(id: string, diningTableData: Partial<DiningTableData>): Promise<DiningTable> {
    const response = await fetch(`/api/dinning?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diningTableData),
    });
    if (!response.ok) {
      throw new Error('Failed to update dining table');
    }
    const data = await response.json();
    return data.diningTable;
  },
};