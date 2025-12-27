import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Articles from './Pages/Articles';
import Article from './Pages/Article';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Write from './Pages/Write';
import MyArticle from './Pages/MyArticle';
import { AuthtProvider } from './Context/AuthContext';
import { UnAuthenticatedRoute } from './Component/UnAuthanticatedRoute';
import SingnUp from './Pages/SingnUp';
import SingIn from './Pages/SingIn'
const App = () => {
  return (
    <>
    <AuthtProvider>
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
          <SingIn />
         </UnAuthenticatedRoute>
         } />
         <Route path='/signup' 
         element={
       <UnAuthenticatedRoute>
        <SingnUp />
       </UnAuthenticatedRoute>
          } />
         <Route path='/write' element={<Write />} />
         <Route path='/myArticles' element={<MyArticle />} />
        </Routes>
      </main>
      {/* footer */}
      <Footer />
    </div>
    </AuthtProvider>
    </>
  )
}

export default App;