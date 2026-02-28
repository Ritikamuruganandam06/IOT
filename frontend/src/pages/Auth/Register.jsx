import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card1";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from 'react-spinners';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const { registerUser, error, loading } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  const onSubmit = async (data) => {
    if (data.confirmPassword) delete data.confirmPassword;
    try {
      await registerUser(data);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      navigate('/register');
    }
  };

  const password = watch('password');

  // Generate the last 4 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear + i);

  return (
    <div className="flex justify-center -mt-16 pt-12 pb-12 items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <Card className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="flex justify-center text-2xl md:text-3xl lg:text-3xl text-white pt-3">Register to the Application</CardTitle>
          <CardDescription className="text-gray-300 text-lg md:text-xl lg:text-xl font-medium flex justify-center">Join the IoT world</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="registerForm" className="text-white" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2 text-white">First Name</Label>
              <Input
                type="text"
                {...register('firstName', { required: 'First Name is required' })}
                placeholder="Enter your First Name"
              />
              {errors.firstName && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.firstName.message}</p>}

              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2 text-white">Last Name</Label>
              <Input
                type="text"
                {...register('lastName', { required: 'Last Name is required' })}
                placeholder="Enter your Last Name"
              />
              {errors.lastName && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.lastName.message}</p>}

              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2 text-white">Register Number</Label>
              <Input
                type="text"
                {...register('registerNumber', { required: 'Register Number is required' })}
                placeholder="Enter your Register Number"
              />
              {errors.registerNumber && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.registerNumber.message}</p>}

              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2 text-white">Batch</Label>
              <Select onValueChange={(value) => setValue('batch', value)}>
                <SelectTrigger className="w-full px-3 py-2 border rounded-md text-gray-500">
                  <SelectValue placeholder='Select Batch'>{watch('batch')? watch('batch') : ""}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Choose year</SelectLabel>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.batch && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.batch.message}</p>}

              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2 text-white">Username</Label>
              <Input
                type="text"
                {...register('username', { required: 'Username is required' })}
                placeholder="Enter your Username"
              />
              {errors.username && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.username.message}</p>}

              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2 text-white">Email</Label>
              <Input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Enter your College Email"
              />
              {errors.email && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.email.message}</p>}

              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2 text-white">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register('password', { required: 'Password is required' })}
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 md:pr-5 flex items-center text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.password.message}</p>}

              <Label className="block font-bold text-base md:text-lg lg:text-xl px-2 text-white">Confirm Password</Label>
              <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: value => value === password || 'Passwords do not match'
                })}
                placeholder="Confirm your Password"
              />
              <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 md:p-5 flex items-center text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
              {errors.confirmPassword && <p className="flex justify-end pr-3 text-red-500 mt-0 text-sm md:text-base lg:text-lg">{errors.confirmPassword.message}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mb-4">
          <Button type="submit" form="registerForm" className="w-full md:w-72 lg:w-96 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white border border-blue-600 hover:shadow-lg hover:shadow-blue-500/40 md:text-lg flex justify-center items-center">
            {loading ? <PulseLoader color="#FFFFFF" loading={loading} radius={2} margin={2} /> : 'Register'}
          </Button>
          <Button
            className="w-full md:w-72 lg:w-96 bg-transparent border border-white/30 text-white hover:bg-white/10 md:text-lg"
            onClick={() => navigate('/login')}
          >Login</Button>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default Register;