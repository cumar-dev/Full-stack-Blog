import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { singUp } from '../Lib/Auth';
const SingnUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setIspassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
   const navigate = useNavigate();
  const handleSubmit = async (event) => {
     event.preventDefault();
    setIsLoading(true);
    setError(null);
     if(password != confirmPassword) {
      setError("please password & confirmPassword don't match");
      setIsLoading(false);
      return
     }

     try {
       await singUp(email, password, username);
       setSuccess(true);
       setTimeout(() => {
        navigate('/singin');
       }, 3000)
     }catch(error) {
      console.error(error);
      setError(error.mesaage || "Failed to create an account Please try again");
     }finally {
      setIsLoading(false);
     }
  }

  if(success) {
    return(
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-4">
              Your account has been created successfully. Please check your email for verification.
            </p>
            <p className="text-gray-500 text-sm">
              Redirecting to sign in page in a few seconds...
            </p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray px-4'>
     <div className='max-w-md w-full mt-[20x]'>
       <div className='text-center mb-10'>
        <h1 className='text-3xl font-bold'>Create an Account</h1>
        <p className='text-gray-600 mt-2'>Join our community and start sharing your ideas</p>
       </div>
      
       {/* form */}
       <div className='bg-white rounded-lg shadow-md p-8'>
         {
        error && (
          <div className='bg-red-100 mb-4 p-3 text-red-700 rounded-md text-sm'>
            {error}
          </div>
        )
       }
       <form onSubmit={handleSubmit}>
        <div className='mb-6'>
          <label htmlFor='email' className='block text-gray-700 text-sm font-semibold mb-2'>Email Address</label>
          <input id='email' type="email" value={email}
           onChange={(e) => setEmail(e.target.value)} required placeholder='your@mail.com'
           className="w-full px-4 py-2 border rounded-md
               focus:outline-none focus:ring-2 focus:ring-orange-500"
           />
        </div>
         <div className='mb-6'>
          <label htmlFor='text' className='block text-gray-700 text-sm font-semibold mb-2'>Username</label>
          <input id='username' type="text" value={username}
           onChange={(e) => setUserName(e.target.value)} required placeholder='John doe'
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
         <div className='mb-6'>
          <label htmlFor='password' className='block text-gray-700 text-sm font-semibold mb-2'>Confirm Password</label>
          <input id='ConfirmPassword' type="password" value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)} required placeholder='••••••••' minLength={6}
           className="w-full px-4 py-2 border rounded-md
               focus:outline-none focus:ring-2 focus:ring-orange-500"
           />
           <p className='text-xs text-gray-500 mt-1'>Must be at least 6 characteristcics</p>
        </div>
         <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 
              rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 
              transition duration-200 disabled:cursor-not-allowed disabled:bg-orange-500"
              disabled={isLoading}
            >
              {
                isLoading ? "Creating Account..." : "Create Account"
              }
            </button>
       </form>
      < div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/singin" className="text-orange-600 hover:text-orange-800 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
       </div>
     </div>
    </div>
  )
}

export default SingnUp;