import { NavLink, Link } from 'react-router-dom' // navigate through links with out full page reloads
import { useState } from 'react';
import './assets/NavMenu.css'

export default function NavMenu() {

    const [isAdminOpen, setIsAdminOpen] = useState(false)    

    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <div>
                    <div className='sidebar-title'>SCP</div>
                    <div className='sidebar-sub'>Foundation</div>
                </div>
            </div>
            <div className='sidebar-tagline'>Secure. Contain. Protect.</div>

            <div className='fluid nav-items'>
                <nav className='nav-link-items'>
                    <NavLink to={`/window/cards/`}>Card Menu</NavLink>
                    <NavLink to={`/window/details/1`}>Records</NavLink>
                    <div >
                        <NavLink to={`/window/admin`} onClick={() => setIsAdminOpen(prev => !prev)} className="link-btn-AP">Admin Panel</NavLink>
                    </div>
                    
                    {isAdminOpen && (
                    <ul className='nav-sub-link'>
                        <li>
                            <NavLink className="link-btn" to="/window/admin/add">Add</NavLink>
                        </li>
                        <li>
                            <NavLink className="link-btn" to="/window/admin/edit">Edit</NavLink>
                        </li>
                        <li>
                            <NavLink className="link-btn" to="/window/admin/delete">Delete</NavLink>
                        </li>                     
                    </ul>)
                    }                    
                </nav>
            </div>
        </div>
    )
}

