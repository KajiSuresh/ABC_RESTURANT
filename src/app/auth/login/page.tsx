'use client'
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserData, userService } from '@/action/user';

interface User extends UserData {
  password: string;
}

class LoginManager {
  private readonly ADMIN_EMAIL = "admin@example.com";
  private readonly ADMIN_PASSWORD = "adminpassword";

  constructor(private router: any) {}

  public async signUp(user: User): Promise<void> {
    console.log('Signing up:', user);
    try {
      const newUser = await userService.createUser({
        name: user.name || '',
        email: user.email,
        password: user.password,
        phoneNo: user.phoneNo || '',
      });
      console.log('User created successfully:', newUser);
      toast.success('Account created successfully!');
      // this.router.push('/dashboard');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Error creating account. Please try again.');
      throw error;
    }
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
    try {
      const users = await userService.getUsers();
      const user = users.find(user => user.email === email && user.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      console.log('User logged in successfully:', user);
      toast.success('Logged in successfully!');
      this.router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials and try again.');
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  }
}

const Login: React.FC = () => {
  const router = useRouter();
  const loginManager = new LoginManager(router);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: '',
    phoneNo: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(null);
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
    setError(null);
    try {
      if (isSignUp) {
        await loginManager.signUp(formData);
      } else {
        await loginManager.signIn(formData.email, formData.password);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
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
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" onChange={handleInputChange} value={formData.name} />
                  </div>
                  <div>
                    <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input type="tel" name="phoneNo" id="phoneNo" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+1 (123) 456-7890" onChange={handleInputChange} value={formData.phoneNo} />
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
