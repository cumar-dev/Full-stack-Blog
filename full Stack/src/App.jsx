import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Articles from './Pages/Articles';
import Article from './Pages/Article';
import SingIn from './Pages/SingIn';
import SingnUp from './Pages/SingnUp';
import Header from './Component/Header';
import Footer from './Component/Footer';
const App = () => {
  return (
    <div>
      {/* header */}
      <Header/>
      {/* Routes */}
      <main>
        <Routes>
         <Route path='/' element={<Home/> } />
         <Route path="/articles" element={<Articles />} />
         <Route path='/article/:id ' element={<Article />} />
         <Route path='/singin' element={<SingIn />} />
         <Route path='/signup' element={<SingnUp />} />
        </Routes>
      </main>
      {/* footer */}
      <Footer />
    </div>
  )
}

export default App;