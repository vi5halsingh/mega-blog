
import { useEffect, useState } from 'react';
import './App.css'
import appWrite from './config/config';
import { Databases } from 'appwrite';
import { useDispatch } from 'react-redux';
import authServices from './appwrite/auth';
import { Footer, Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    // Check for existing session
    authServices.getCurrentUser()
      .then((userData) => {
        if (userData) {
          // Dispatch login action with user data
          dispatch({
            type: 'auth/login',
            payload: userData
          });
        }
      })
      .catch((error) => {
        console.error("Auth check failed:", error);
        // On error, ensure user is logged out in Redux store
        dispatch({
          type: 'auth/logout'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);
  return !loading ? 
    <div>
      <Header/>
      ToDo:{/* <Outlet/> */}
      <Footer />
    </div>
   : 
    <div>
      <h1 className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>Loading...</h1>
    </div>
  
}

export default App
