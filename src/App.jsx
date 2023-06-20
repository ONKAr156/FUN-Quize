import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import AddQuestions from './Pages/AddQuestions'
import StartExam from './Pages/StartExam'

const App = () => {
  return <div className='bg-dark '>
  <BrowserRouter>
  <Navbar/>
  <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/add-questions' element={<AddQuestions/>}/>
<Route path='/start-exam' element={<StartExam/>}/>
<Route path='/*' element={<h4>Error 404 page not found</h4>}/>
  </Routes>
  </BrowserRouter>
  
  </div>
}

export default App