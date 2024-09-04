// file: src/services/contact.ts

export interface ContactData {
  customerName: string;
  email: string;
  message: string;
}

export interface Contact extends ContactData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const contactService = {
  async getContacts(): Promise<Contact[]> {
  try {
    const response = await fetch('/api/contactservice');
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    const data = await response.json();
    return data.contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
},

  async createContact(contactData: ContactData): Promise<Contact> {
    const response = await fetch('/api/contactservice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) {
      throw new Error('Failed to create contact');
    }
    const data = await response.json();
    return data.contact;
  },

  async deleteContact(id: string): Promise<void> {
    const response = await fetch(`/api/contactservice?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  },

  async updateContact(id: string, contactData: Partial<ContactData>): Promise<Contact> {
    const response = await fetch(`/api/contactservice?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    const data = await response.json();
    return data.contact;
  },
};