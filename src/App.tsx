import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import './App.css'
import Layout from './layout/Layout'
import ReadingPage from './pages/ReadingPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Layout />}>
            <Route index element={<ReadingPage />} />
            <Route path='*' element={<div>404 Not Found</div>} />
            
            
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
