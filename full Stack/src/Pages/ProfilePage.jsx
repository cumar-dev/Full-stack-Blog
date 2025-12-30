import React, { useState } from 'react'
import { FiCamera, FiUser, FiMail } from 'react-icons/fi';
import { useAuth } from '../Context/AuthContext';
const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatrUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const {user} = useAuth();
  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
          {/* profile header */}

      <div className='bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8'>
      <div className='flex flex-col items-center'>
        <div className='relative group'>
          <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg'>
            <img src={avatarUrl || 'https://placehold.co/150'} alt="profile" className='w-full h-full object-cover' />
          </div>
          <label htmlFor='avatar-upload' className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-110"> <FiCamera className="w-5 h-5 text-orange-600" /></label>
          <input type="file" id="avatar-upload" className=" hidden" accept="image/*" />
                                    
        </div>
        <h2 className='mt-4 text-2xl font-bold text-white'>{username || "your profile"}</h2>
        <p className='text-orange-100'>{user?.email}</p>
      </div>
      </div>

         {/* profile Form */}
         <form className='space-y-6 p-6'>
          <div className='space-y-6'>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md mb-2
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required/>
              </div>
              
             <div>
               <label className="block text-sm font-medium text-gray-700">Email</label>
               <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" value={user?.email} 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required/>
              </div>
             </div>
            
            </div>
          </div>
          {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium 
                                 rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 
                                focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>

                        </div>
         </form>


        </div>
      </div>
    </div>
  )
}

export default ProfilePage;