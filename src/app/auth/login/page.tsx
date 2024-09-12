"use client"
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserData, userService } from '@/action/user';
import { staffService } from '@/action/staff';

interface User extends UserData {
  password: string;
  role: string;
}
class LoginManager {
  private readonly ADMIN_EMAIL = 'admin@gmail.com';
  private readonly ADMIN_PASSWORD = 'admin';
  private readonly ADMIN_ROLE = 'ADMIN';
  
  public async signUp(user: User, redirect: any): Promise<void> {
    console.log('Signing up:', user);
    try {
      await userService.createUser({
        name: user.name || '',
        email: user.email,
        password: user.password,
        phoneNo: user.phoneNo || '',
      });
      toast.success('Account created successfully!');
      redirect.push('/');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Error creating account. Please try again.');
      throw error;
    }
  }

  public async signIn(email: string, password: string, router: any): Promise<void> {
    try {
      if (this.isAdminLogin(email, password)) {
        this.handleSuccessfulLogin('mocked-token-from-backend', email, this.ADMIN_ROLE, router, '/dashboard');
        toast.success('Admin login successful!'); // Success toast for admin login
      } else {
        await this.staffUserLogin(email, password, router); 
        
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  }

  private isAdminLogin(email: string, password: string): boolean {
    return email === this.ADMIN_EMAIL && password === this.ADMIN_PASSWORD;
  }

  private async staffUserLogin(email: string, password: string, router: any): Promise<void> {
    try {
      const staff = await staffService.getStaffByEmail(email, password); 
      console.log('Fetched staff:', staff);
      if (!staff || staff.password !== password || staff.role !== 'STAFF') {
        throw new Error('Invalid credentials');
      }
      this.handleSuccessfulLogin('mocked-token-from-backends', email, 'STAFF', router, '/dashboard/layout/staffs'); // Redirect staff to staff dashboard
    } catch (error) {
      console.error('Staff user login error:', error);
      throw error;
    }
  }

  private handleSuccessfulLogin(token: string, email: string, role: string, router: any, redirectPath: string): void {
    localStorage.setItem('authToken', token);
    this.setCookie('authToken', token, 7);
    this.setCookie('email', email, 7);
    this.setCookie('role', role, 7);
    router.push(redirectPath);
  }

  private setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }
}

const Login: React.FC = () => {
  const router = useRouter();
  const loginManager = new LoginManager();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    name: '',
    phoneNo: '',
    email: '',
    password: '',
    role: '',
  });
  const [error, setError] = useState<string | null>(null);

  const toggleForm = () => {
    setIsSignUp(prevState => !prevState);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        await loginManager.signUp(formData, router);
      } else {
        await loginManager.signIn(formData.email, formData.password, router);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Form submission error:', error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/lgimg.jpg')" }}>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isSignUp ? 'Create an account' : 'Sign in to your account'}
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" onChange={handleInputChange} value={formData.name} />
                  </div>
                  <div>
                    <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input type="tel" name="phoneNo" id="phoneNo" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="+1 (123) 456-7890" onChange={handleInputChange} value={formData.phoneNo} />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required onChange={handleInputChange} value={formData.email} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required onChange={handleInputChange} value={formData.password} />
              </div>
              <button type="submit" className="w-full text-black bg-yellow-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">
                {isSignUp ? 'Create account' : 'Login'}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isSignUp ? 'Already have an account?' : 'Do not have an account yet?'}
                <button type="button" onClick={toggleForm} className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
                  {isSignUp ? 'Sign In' : 'Sign up'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;