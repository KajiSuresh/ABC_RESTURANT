import React from 'react'
import Image from 'next/image';
import Head from 'next/head';

const HomePage = () => {
    return (
        <section className="relative min-h-screen overflow-hidden">
            <Image
                src="/res.jpg"
                alt="Restaurant background"
                layout="fill"
                objectFit="cover"
                quality={100}
                priority
            />

            <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

            <div className="relative z-20 flex flex-col min-h-screen text-white">
                <header className="p-6 flex justify-between items-center">
                    <div className="text-2xl font-bold">ABC</div>
                    <nav className="space-x-6">
                        <a href="#" className="hover:text-white">Home</a>
                        <a href="#" className="hover:text-white">About Us</a>
                        <a href="#" className="hover:text-white">Menu</a>
                        <a href="#" className="hover:text-white">Testimonial</a>
                        <a href="#" className="hover:text-white">Contact</a>
                        <a href='/auth/login' className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black">LOGIN</a>
                    </nav>
                </header>

                <main className="flex-grow flex items-center">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-xl mb-4">GOOD PLACE. GOOD FOOD.</h2>
                        <h1 className="text-6xl font-bold mb-6">A Really Good Place to Eat<br />In the SriLanka</h1>
                        <p className="text-xl mb-8">A restaurant is a place where you go to celebrate a special occasion, or to create a new one.</p>
                    </div>
                </main>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <span className="text-sm">SCROLL DOWN</span>
                </div>
            </div>
        </section>


    )
}

export default HomePage
