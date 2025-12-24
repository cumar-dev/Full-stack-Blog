import { useState } from 'react';
import React  from 'react'
import { Link } from 'react-router-dom';
const SingIn = () => {
  const [email, setEmail] = useState("");
    const [password, setIspassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray px-4'>
     <div className='max-w-md w-full mt-[150px]'>
       <div className='text-center mb-10'>
        <h1 className='text-3xl font-bold'>Welcome Back</h1>
        <p className='text-gray-600 mt-2'>Sign into access your account</p>
       </div>
       {/* form */}
       <div className='bg-white rounded-lg shadow-md p-8'>
       <form>
        <div className='mb-6'>
          <label htmlFor='email' className='block text-gray-700 text-sm font-semibold mb-2'>Email Address</label>
          <input id='email' type="email" value={email}
           onChange={(e) => setEmail(e.target.value)} required placeholder='your@mail.com'
           className="w-full px-4 py-2 border rounded-md
               focus:outline-none focus:ring-2 focus:ring-orange-500"
           />
        </div>
        
         <div className='mb-6'>
          <label htmlFor='password' className='block text-gray-700 text-sm font-semibold mb-2'>Password</label>
          <input id='password' type="password" value={password}
           onChange={(e) => setIspassword(e.target.value)} required placeholder='••••••••' minLength={6}
           className="w-full px-4 py-2 border rounded-md
               focus:outline-none focus:ring-2 focus:ring-orange-500"
           />
           <p className='text-xs text-gray-500 mt-1'>Must be at least 6 characteristcics</p>
        </div>
        
         <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 disabled:cursor-not-allowed disabled:bg-orange-500"
              disabled={isLoading}
            >
             
                {isLoading ? 'Signing in...' : 'Sing In'}
             
            </button>
       </form>
      < div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-orange-600 hover:text-orange-800 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
       </div>
     </div>
    </div>
  )
}

export default SingIn;