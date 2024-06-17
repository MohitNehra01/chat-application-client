
import './App.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AccountProvider';


function App() {
         const {setAuthenticated , setAccount} = useContext(AuthContext)

      useEffect(()=>{
               if(localStorage.getItem('auth_token') !== null){
                setAuthenticated(true);
                setAccount(JSON.parse(localStorage.getItem('Login_user')))
               }
               else{
                setAccount('');
                setAuthenticated(false)
               }
               // eslint-disable-next-line
      },[])

  return (
    <>
      <BrowserRouter>
      <Toaster />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
