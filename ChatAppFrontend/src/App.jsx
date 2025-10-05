import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatWindow from './component/ChatWindow'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Register />}></Route>
        <Route path='/chat' element={<ChatWindow />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App