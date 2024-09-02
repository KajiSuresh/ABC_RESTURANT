import { Prisma } from '@prisma/client';

export interface ReservationData {
  date: Date;
  time: Date;
  person: string;
  customerName: string;
  customerEmail: string;
  description: string;
}

export interface Reservation extends ReservationData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const reservationService = {
  async getReservations(): Promise<Reservation[]> {
    const response = await fetch('/api/reservation');
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    const data = await response.json();
    return data.reservations;
  },

  async createReservation(reservationData: ReservationData): Promise<Reservation> {
    const response = await fetch('/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });
    if (!response.ok) {
      throw new Error('Failed to create reservation');
    }
    const data = await response.json();
    return data.reservation;
  },

  async deleteReservation(id: string): Promise<void> {
    const response = await fetch(`/api/reservationservice?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete reservation');
    }
  },

  async updateReservation(id: string, reservationData: Partial<ReservationData>): Promise<Reservation> {
    const response = await fetch(`/api/reservation?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });
    if (!response.ok) {
      throw new Error('Failed to update reservation');
    }
    const data = await response.json();
    return data.reservation;
  },
};