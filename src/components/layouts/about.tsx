import React from 'react'
import Image from 'next/image';

const About = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-yellow-500 mb-4">About Us</h2>
                        <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-800">We believe in pure and organic quality</h1>
                        <p className="mb-6 text-[#21304F] leading-relaxed">
                        Welcome to ABC Restaurant, where great food meets exceptional service! Established in 2000, ABC Restaurant has been a beloved dining destination for those who appreciate high-quality cuisine in a warm and inviting atmosphere.
                        </p>
                       
                        <p className="mb-8 text-[#21304F] leading-relaxed">
                        For over two decades, we have been dedicated to serving our community with delicious dishes crafted from the finest ingredients. Our commitment to excellence is reflected in every plate we serve and every interaction we have with our guests. We believe that dining out should be more than just a meal—it should be an experience that delights all your senses.
                        </p>
                        <button className="bg-yellow-500 text-white px-8 py-3 rounded-sm text-lg font-semibold transition duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg">
                            VIEW MORE
                        </button>
                    </div>
                    <div className="relative">
                        <div className="bg-[#E1EBFF] rounded-lg p-8 absolute top-0 right-0 shadow-lg z-10 max-w-sm">
                            <p className="text-[18px] italic text-gray-700 leading-relaxed">
                            Where Flavor Meets Warmth, and Every Meal Feels Like Home.
                            </p>
                            <p className="mt-4 font-semibold text-yellow-500">— ABC Restaurant</p>
                        </div>
                        <Image
                            src="/resturant/img2.jpg"
                            alt="Farmers"
                            width={500}
                            height={400}
                            className="rounded-lg mt-24 shadow-2xl object-cover"
                        />
                       
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
