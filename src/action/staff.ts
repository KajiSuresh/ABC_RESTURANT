// file: src/services/staff.ts

export interface StaffData {
  staffname: string;
  email: string;
  phone: string;
  password: string;
  position: string;
  role: string;
}

export interface Staff extends StaffData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const staffService = {
  async getStaff(): Promise<Staff[]> {
    const response = await fetch('/api/staff');
    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }
    const data = await response.json();
    return data.staff;
  },

  async createStaff(staffData: StaffData): Promise<Staff> {
    const response = await fetch('/api/staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staffData),
    });
    if (!response.ok) {
      throw new Error('Failed to create staff');
    }
    const data = await response.json();
    return data.staff;
  },

  async deleteStaff(id: string): Promise<void> {
    const response = await fetch(`/api/staff?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete staff');
    }
  },

  async updateStaff(id: string, staffData: Partial<StaffData>): Promise<Staff> {
    const response = await fetch(`/api/staff?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staffData),
    });
    if (!response.ok) {
      throw new Error('Failed to update staff');
    }
    const data = await response.json();
    return data.staff;
  },
  async getStaffByEmail(email: string, password: string): Promise<Staff | null> {
    const response = await fetch(`/api/staff?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch staff by email');
    }
    const data = await response.json();
    if (!data.staff) {
      throw new Error('Invalid credentials');
    }
    return data.staff;
  }
  
  
};