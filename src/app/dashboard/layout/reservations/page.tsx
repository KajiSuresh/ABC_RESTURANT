"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import { Reservation, reservationService } from '@/action/reservation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

export default function ReservationDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const fetchedReservations = await reservationService.getReservations();
      setReservations(fetchedReservations);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await reservationService.deleteReservation(id);
      toast.success("Reservation deleted successfully"); // Show success toast
      fetchReservations(); // Refresh the list after deletion
    } catch (error) {
      toast.error("Failed to delete reservation"); // Show error toast
      console.error(`Failed to delete reservation ${id}:`, error);
    }
  }

  return (
    <div className="w-full p-6">
      <ToastContainer /> {/* Add the ToastContainer */}
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Reservations</div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.customerName}</TableCell>
                <TableCell>{reservation.customerEmail}</TableCell>
                <TableCell>{new Date(reservation.date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(reservation.time).toLocaleTimeString()}</TableCell>
                <TableCell>{reservation.person}</TableCell>
                <TableCell>{reservation.description}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(reservation.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}