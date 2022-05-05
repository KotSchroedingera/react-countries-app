import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main-page'; 
import CountryPage from './pages/Country-page';
import NotFound from './pages/Not-Found';


export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path='/' element={<MainPage />} />
        <Route path='/country/:name' element={<CountryPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
