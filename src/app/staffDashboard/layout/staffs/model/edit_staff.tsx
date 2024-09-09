import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Staff, staffService } from '@/action/staff';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditStaffProps {
  staff: Staff;
  onClose: () => void;
  onSave: () => void;
}

export default function EditStaff({ staff, onClose, onSave }: EditStaffProps) {
  const [formData, setFormData] = useState<Staff>(staff);

  useEffect(() => {
    setFormData(staff);
  }, [staff]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await staffService.updateStaff(formData.id, formData);
      toast.success("Staff member updated successfully!");
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to update staff member:", error);
      toast.error("Failed to update staff member. Please try again.");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staffname">Name</Label>
              <Input id="staffname" value={formData.staffname} onChange={handleChange} placeholder="Enter name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" value={formData.position} onChange={handleChange} placeholder="Enter position" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={formData.role} onChange={handleChange} placeholder="Enter role" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}