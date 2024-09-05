'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (

    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link href="#home" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/abc.png" alt="Flowbite Logo" width={150} height={180} className='h-12' />

          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" className="text-sm text-gray-500 dark:text-white hover:underline">(555) 412-1234</a>
            <Button className="text-sm bg-[#0a6e5f] text-blue-600 dark:text-blue-500 hover:underline">Login</Button>
          </div>
        </div>
      </nav>
      <nav className="bg-[#F4F4F4] dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex justify-center">
            <ul className="flex flex-row font-medium space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link href="#home" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link>
              </li>
              <li>
                <Link href="" className="text-gray-900 dark:text-white hover:underline">Company</Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-900 dark:text-white hover:underline">Team</Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-900 dark:text-white hover:underline">Features</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>

  )
}
