import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Staff, StaffData, staffService } from '@/action/staff';


interface EditStaffProps {
  staff: Staff;
  onStaffUpdated: () => void;
}

export default function EditStaff({ staff, onStaffUpdated }: EditStaffProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<StaffData>({
    staffname: staff.staffname,
    email: staff.email,
    phone: staff.phone,
    password: '', // We don't populate the password for security reasons
    position: staff.position,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await staffService.updateStaff(staff.id, formData);
      onStaffUpdated();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update staff:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="mt-1 mr-2">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staffname">Name</Label>
              <Input 
                id="staffname" 
                name="staffname"
                value={formData.staffname}
                onChange={handleInputChange}
                placeholder="Enter name" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input 
                id="position" 
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Enter Position" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter new password (leave blank to keep current)" 
            />
          </div>

          <Button type="submit" className="w-full">
            Update Staff
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}