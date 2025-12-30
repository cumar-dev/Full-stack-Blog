import { data } from "react-router-dom";
import Supabase from "./Supabase";

export async function signUp(email, password, username = "") {
    
let { data, error } = await Supabase.auth.signUp({
  email: email,
  password: password
})
console.log("Auth singup successful" ,data);
if(data?.user) {
    const {data: sessionData} = await Supabase.auth.getSession();
    if(!sessionData?.session) {
        console.log('no activate session yet -profile will be created on first sign', data);
        return data
    }


 const displayName = username || email.split('@')[0];
// profileCreation
 const {data: profileData, error: profileError} = await Supabase
 .from("users")
 .insert({
    id: data.user.id,
    user_name: displayName,
    avatar_url: null
 })
 .select()
 .single()

 if(profileError) {
    console.error("profile creation error", error);
    
 }else {
    console.log("profile created successfully", profileData);
 }
}
 return data;
}

export async function signIn(email, password) {
   
let { data, error } = await Supabase.auth.signInWithPassword({
  email: email,
  password: password
})
console.log("user info", data);
if(error) {
   throw error;
}
if(data?.user) {
   try{
    const profile = await getUserProfile(data.user.id);
     console.log("profile get", profile);
   }catch(profileError) {
   console.log('user profile error exsists during signin', profileError);
   }
}
}

// reading if exsists allready profile

export async function getUserProfile(userId) {
const {data: sessionData} = await Supabase.auth.getSession();
console.log('session data:', sessionData);
// const userId = sessionData?.user?.id;
console.log('user id now:', userId);   
const {data , error} = await Supabase
.from('users')
.select("*")
.eq('id', userId)
.single()

if(error && error.code === "PGRST116") {
   console.log("no profile found, attempting to create one for users:", userId);
   // getting email
    const { data : userData } = await Supabase.auth.getUser();
    console.log('user data:', userData);
 const email = userData?.user.email;
 console.log("email now" ,email)
 console.log("true data", userData)
const defaultUsername = email ? email.split('@')[0] : `user_${Date.now()}`;
console.log('default username', defaultUsername);
// creating new profile

const {data: newProfile, error: profileError} = await Supabase
 .from("users")
 .insert({
    id: userId,
    user_name: defaultUsername,
    avatar_url: null
 })
 .select()
 .single()

 if(profileError) {
    console.error("profile creation error", profileError);
    throw profileError
 }else {
    console.log("profile created successfully", newProfile);
 }
 return newProfile;
}

// general error
if(error) {
   console.error("Error fetching profile", error);
}
console.log("exsisting profile");
return data;
}

// AuthChanges or is badalada authka ku dhacaayo

export function authChange(callback) {
  const { data } = Supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null, _event);
  });
// cleanAup
  return () => data.subscription.unsubscribe();
}

// kana waa lamid
// export function authChange(callback) {
//   // Supabase.onAuthStateChange waxay return-gareysaa object leh subscription
//   const { data: subscriptionData } = Supabase.auth.onAuthStateChange(
//     (event, session) => {
//       // callback user-ka saxda ah
//       callback(session?.user || null, event);
//     }
//   );

//   // cleanup
//   return () => {
//     if (subscriptionData?.subscription) {
//       subscriptionData.subscription.unsubscribe();
//     }
//   };
// }


// Auth.js

// Auth.js
export async function signOut() {
  const { error } = await Supabase.auth.signOut();
  if (error) throw error;
}
