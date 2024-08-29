"use client"
import React from 'react';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <form className="space-y-4">
            <div>
              <Label htmlFor="name" className="block mb-1 font-medium">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Name"
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
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="message" className="block mb-1 font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your message here..."
              ></Textarea>
            </div>
            <div>
                  <button type="submit" className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">Submit</button>
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