import React, { useEffect, useState } from 'react'
import { FiCamera, FiUser, FiMail } from 'react-icons/fi';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { getUserProfile } from '../Lib/Auth';
import Supabase from '../Lib/Supabase';
const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async (event)=> {
   event.preventDefault();
   try {
    setLoading(true);
    let updates = {user_name: username};
    // if files selecte upload files
    if(avatar) {
      // omar.jpg
      const fileEx = avatar.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}`
      const filePath = `avatars/${fileName}.${fileEx}`;

      // upload suparpase or Supabase aa wacanaynaa
      const { error: uploadError } = await Supabase.storage.from('avatars').upload(filePath, avatar);
      if(uploadError) throw uploadError;

      // get the uploadUrl

      const {data} =  Supabase.storage.from('avatars')
      .getPublicUrl(filePath);
      console.log('puplic url uploaded :', data);

      // update databse and add avatar_url

      updates = {
        ...updates,
        avatar_url: data.publicUrl
      }

      setAvatarUrl(data.publicUrl);
    }

    console.log('updates to be applied');

    // updates table users

    const {data, error} = await Supabase.from('users')
    .update(updates)
    .eq('id', user.id)
    .select('user_name, avatar_url')
    .single();

    if(error) throw error;

    if(data) {
    setAvatarUrl(data.avatar_url);
     setUsername(data.user_name);
    }

    toast.success('Profile updated successfully...')
   } catch (error) {
    console.error(error.message || 'error updating user profile')
   } finally {
    setLoading(false);
   }
  }

  useEffect(()=> {
    fetchUserProfile();
  }, [user]);
   const fetchUserProfile  = async () => {
    try {
      setLoading(true);
      // const profileInfo = await getUserProfile(user.id);
      // console.log('user profile info', profileInfo);
      const {user_name, avatar_url} = await getUserProfile(user.id)
      if(user_name) {
        setUsername(user_name);
        setAvatarUrl(avatar_url);
      }
    } catch (error) {
      console.error('error profile exist', error)
    } finally {
      setLoading(false);
    }
   }

  const handleAvatarChange = (e)=> {
   if(e.target.files && e.target.files[0]) {
    const files = e.target.files[0];
    console.log('file size is:', files);
    if(files.size > 1 * 1024 * 1024) {
  toast.error('Image must be ≤ 1 MB', {position: 'top-right'});
  return;
}
    setAvatar(files);
    const previewUrl = URL.createObjectURL(files);
    setAvatarUrl(previewUrl);
   }
  }
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
          <input type="file" id="avatar-upload" className=" hidden" onChange={handleAvatarChange} accept="image/*" />
                                    
        </div>
        <h2 className='mt-4 text-2xl font-bold text-white'>{username || "Your Profile"}</h2>
        <p className='text-orange-100'>{user?.email}</p>
      </div>
      </div>

         {/* profile Form */}
         <form onSubmit={handleSubmit} className='space-y-6 p-6'>
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
           <button type="submit" disabled={loading}
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