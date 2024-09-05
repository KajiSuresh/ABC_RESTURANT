"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contactService } from '@/action/contactus';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactService.createContact({ 
        customerName: formData.name, 
        email: formData.email, 
        message: formData.message 
      });
      toast.success('Message sent successfully!');
      resetForm();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl" id='contact'>
      <ToastContainer position="top-right" autoClose={5000} />
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="block mb-1 font-medium">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="block mb-1 font-medium">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="message" className="block mb-1 font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your message here..."
                required
              ></Textarea>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="md:w-1/2">
          <div className="relative h-full min-h-[300px]">
            <Image
              src="/cont.jpeg"
              alt="Contact Us"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
