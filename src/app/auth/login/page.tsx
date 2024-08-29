"use client"
import Link from 'next/link'
import React, { useState, FormEvent } from 'react'
import Image from 'next/image'
import { createUser } from '@/action/user'

type Props = {}

const Login = (props: Props) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        remember: false
    });

    const toggleForm = () => {
      setIsSignUp(!isSignUp);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSignUp) {
            handleSignUp();
        } else {
            handleSignIn();
        }
    };

    const handleSignUp = () => {
        // Handle sign-up logic here
        console.log('Signing up:', formData);
        createUser({
            name: formData.name, email: formData.email, password: formData.password, phoneNo: formData.phone,
            
        })
    };

    const handleSignIn = () => {
        // Handle sign-in logic here
        console.log('Signing in:', { email: formData.email, password: formData.password });
        // You would typically send this data to your backend API
        // Example: await api.signIn(formData.email, formData.password);
    };

  return (
    <section 
  className="bg-gray-50 dark:bg-gray-900 bg-cover bg-center bg-no-repeat relative"
  style={{
    backgroundImage: "url('/lgimg.jpg')",
  }}
>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isSignUp ? 'Create an account' : 'Sign in to your account'}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required onChange={handleInputChange} value={formData.name} />
                </div>
              )}
               {isSignUp && (
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                  <input type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+1 (123) 456-7890" required onChange={handleInputChange} value={formData.phone} />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={handleInputChange} value={formData.email} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleInputChange} value={formData.password} />
              </div>
             
              {!isSignUp && (
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" name="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" onChange={handleInputChange} checked={formData.remember} />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div> */}
                  {/* <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link> */}
                </div>
              )}
              <div className="space-y-2">
                <button type="submit" className="w-full text-black bg-yellow-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  {isSignUp ? 'Create account' : 'Login'}
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isSignUp ? 'Already have an account?' : 'Do not have an account yet?'} 
                <a href="#" onClick={toggleForm} className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
                  {isSignUp ? 'Sign In' : 'Sign up'}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login