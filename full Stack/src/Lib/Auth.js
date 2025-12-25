import Supabase from "./Supabase";

export async function singUp(email, password, username = "") {
    
let { data, error } = await Supabase.auth.signUp({
  email: email,
  password: password
})
// console.log("Auth singup successful" ,data);
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
    username: displayName,
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