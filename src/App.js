import './css/index.css'
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import MainPage from './components/MainPage';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
      <>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/' element={<MainPage />} />
      </Routes> 
      <Toaster />
     </>

  );
}

export default App;
