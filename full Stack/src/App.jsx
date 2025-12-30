import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Articles from './Pages/Articles';
import Article from './Pages/Article';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Write from './Pages/Write';
import MyArticle from './Pages/MyArticle';
import { AuthProvider } from './Context/AuthContext';
import { UnAuthenticatedRoute } from './Component/UnAuthanticatedRoute';
import SingnUp from './Pages/SingnUp';
import ProfilePage from './Pages/ProfilePage';
import ManageAricles from './Pages/ManageAricles';
import { ProtectedRoute } from './Component/ProtectedRoute';
import SigninPage from './Pages/SigninPage';
const App = () => {
  return (
    <>
    <AuthProvider>
    <div>
      {/* header */}
      <Header/>
      {/* Routes */}
      <main>
        <Routes>
         <Route path='/' element={<Home/> } />
         <Route path="/articles" element={<Articles />} />
         <Route path='/article/:id ' element={<Article />} />
         <Route path='/signin' element={
         <UnAuthenticatedRoute>
          <SigninPage />
         </UnAuthenticatedRoute>
         } />
         <Route path='/signup' 
         element={
       <UnAuthenticatedRoute>
        <SingnUp />
       </UnAuthenticatedRoute>
          } />
         <Route path='/editor' 
         element={
          <ProtectedRoute>
             <Write />
          </ProtectedRoute>
        
        } 
         />
         <Route path='/editor/:id' element={
          <ProtectedRoute>
             <Write />
          </ProtectedRoute>
          } 
          />
         <Route path='/myArticles' 
         element={
         <ProtectedRoute>
          <MyArticle />
         </ProtectedRoute>
         } 
         />
         <Route path='/profile' 
         element={
         <ProtectedRoute>
          <ProfilePage />
         </ProtectedRoute>
         } />
         <Route path='/mangeAricles' element=
         {
        <ProtectedRoute>
           <ManageAricles />
        </ProtectedRoute>
         } 
         />
        </Routes>
      </main>
      {/* footer */}
      <Footer />
    </div>
    </AuthProvider>
    </>
  )
}

export default App;