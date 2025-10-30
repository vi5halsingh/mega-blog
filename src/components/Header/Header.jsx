import React, { act } from 'react';
import { useSelector } from 'react-redux';
import { Link , useNavigate} from 'react-router-dom'
import LogOut from './LogOut';

const Header = () => {
   const Navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    console.log("Auth Status in Header:", authStatus);

    const navItems = [
        {
            name: 'Home',
            slug : '/',
            active: true
        } ,
        {
            name: 'login',
            slug : '/login',
            active: !authStatus
        },
        {
            name: 'sign up',
            slug : '/register',
            active: !authStatus
        }
        ,
        {
            name: 'allposts',
            slug : '/allposts',
            active: authStatus
        },
        {
            name: 'add post',
            slug : '/addpost',
            active: authStatus
        }
    ]
    return (
        <>
       <header className="bg-blue-600 text-white p-4">
                <div className='logo mr-4 '>
                    <h1>logo</h1>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                    {navItems.map((item) => (
                        item.active && (
                            <li key={item.name}><button
                            onClick={() => Navigate(item.slug)}>
                                {item.name}
                            </button>
                            </li>
                        )
                    ))}
                    {authStatus && (
                        <li>
                            <LogOut />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
     
        </>
    )
};



export default Header;