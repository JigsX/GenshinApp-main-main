import {Route, Routes} from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import DeleteContentPage from './pages/DeleteContentPage';
import './App.css'

function App() {

  return (
    <>
      <button></button>
      <Routes>
        <Route path = "/" element={<HomePage />} />
        <Route path = "/createContent" element={<CreatePage />} />
        <Route path = "/deleteContent" element={<DeleteContentPage />} />
      </Routes>
    </>
  )
}

export default App
