// file: src/services/user.ts

export interface UserData {
    email: string;
    password?: string;
    phoneNo?: string;
    name?: string;
  }
  
  export interface User extends UserData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export const userService = {
    async getUsers(): Promise<User[]> {
      const response = await fetch('/api/user');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data.users;
    },
  
    async createUser(userData: UserData): Promise<User> {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      const data = await response.json();
      return data.user;
    },
  
    async deleteUser(id: string): Promise<void> {
      const response = await fetch(`/api/user?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    },
  
    async updateUser(id: string, userData: Partial<UserData>): Promise<User> {
      const response = await fetch(`/api/user?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      return data.user;
    },
  
    async getUserById(id: string): Promise<User> {
      const response = await fetch(`/api/user/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      return data.user;
    },
  };