'use client'
import React from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Trash2 } from "lucide-react"

const reservations = [
  {
    id: "RES001",
    customerName: "John Smith",
    email:'jhone10@gmail.com',
    date: "2024-08-28",
    time: "19:00",
    guests: 4,
    discribtion: "Confirmed",
  },
  
 
  // Add more reservations as needed
]

export default function Reservation() {
  const handleEdit = (id: string) => {
    console.log(`Edit reservation ${id}`);
    // Implement edit functionality
  }

  const handleDelete = (id: string) => {
    console.log(`Delete reservation ${id}`);
    // Implement delete functionality
  }

  const handleAddReservation = () => {
    console.log("Add new reservation");
    // Implement add reservation functionality
  }

  return (
    <div className="w-full p-6">
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
              <TableHead>Discribtion</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.customerName}</TableCell>
                <TableCell>{reservation.email}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.guests}</TableCell>
                <TableCell>{reservation.discribtion}</TableCell>
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