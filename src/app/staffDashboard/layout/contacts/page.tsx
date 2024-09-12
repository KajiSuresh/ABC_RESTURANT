"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Contact, contactService } from '@/action/contactus';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const fetchedContacts = await contactService.getContacts();
      setContacts(fetchedContacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await contactService.deleteContact(id);
      fetchContacts(); // Refresh the list after deletion
      toast.success('Contact deleted successfully!'); // Show success toast
    } catch (error) {
      console.error(`Failed to delete contact ${id}:`, error);
      toast.error('Failed to delete contact.'); // Show error toast
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0 text-[25px] font-semibold p-2">Contacts</div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.customerName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.message}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(contact.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ToastContainer /> 
    </div>
  );
}