import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import './App.css'
import Layout from './layout/Layout'
import ReadingPage from './pages/ReadingPage'
import { BookmarkProvider } from './context/BookmarkContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <BookmarkProvider>
          <Routes>

            <Route path='/' element={<Layout />}>
              <Route index element={<ReadingPage />} />
              <Route path='chapter/:chapterId' element={<ReadingPage />} />
              <Route path='*' element={<div>404 Not Found</div>} />
              
              
            </Route>
            
          </Routes>
        </BookmarkProvider>
      </BrowserRouter>
    </>
  )
}

export default App
