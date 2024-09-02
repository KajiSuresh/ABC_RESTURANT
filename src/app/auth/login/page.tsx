'use client'
import Link from 'next/link';
import React, { useState, FormEvent } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

// User interface
interface User {
  name?: string;
  phone?: string;
  email: string;
  password: string;
}

// Define the API call for regular user login
const loginApi = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    // Assuming the API returns a token or some form of authentication response
    // You might want to store this token in the browser's local storage or cookies
    localStorage.setItem('authToken', data.token);
    // Redirect to the dashboard or perform other actions
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Login failed:', error);
    // Handle the error, e.g., show an error message to the user
    alert('Login failed. Please check your credentials and try again.');
  }
};

// LoginManager class
class LoginManager {
  private readonly ADMIN_EMAIL = "admin@example.com";
  private readonly ADMIN_PASSWORD = "adminpassword";

  constructor(private router: any) {}

  public async signUp(user: User): Promise<void> {
    console.log('Signing up:', user);
    await createUser({
      name: user.name || '',
      email: user.email,
      password: user.password,
      phoneNo: user.phone || '',
    });
    // Here you might want to automatically sign in the user or redirect them
  }

  public async signIn(email: string, password: string): Promise<void> {
    console.log('Signing in:', { email, password });
    
    if (this.isAdminLogin(email, password)) {
      console.log('Admin logged in successfully');
      this.router.push('/dashboard');
    } else {
      await this.regularUserLogin(email, password);
    }
  }

  private isAdminLogin(email: string, password: string): boolean {
    return email === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD;
  }

  private async regularUserLogin(email: string, password: string): Promise<void> {
    console.log('Regular user login attempt');
    await loginApi(email, password);
  }
}

// React component
const Login: React.FC = () => {
  const router = useRouter();
  const loginManager = new LoginManager(router);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      await loginManager.signUp(formData);
    } else {
      await loginManager.signIn(formData.email, formData.password);
    }
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
                <>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required onChange={handleInputChange} value={formData.name} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+1 (123) 456-7890" required onChange={handleInputChange} value={formData.phone} />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={handleInputChange} value={formData.email} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleInputChange} value={formData.password} />
              </div>
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
  );
};

export default Login;

function createUser(arg0: { name: string; email: string; password: string; phoneNo: string; }) {
    throw new Error('Function not implemented.');
}
