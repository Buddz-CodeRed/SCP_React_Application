import { NavLink, Link } from 'react-router-dom' // navigate through links with out full page reloads
import { useState } from 'react';
import './assets/NavMenu.css'

export default function NavMenu({ setViewMode }) {

    const [isAdminOpen, setIsAdminOpen] = useState(false)

    const handleAdminAction = (mode) => {
        console.log("handleAdminAction called with:", mode)
        setViewMode(mode);
        setIsAdminOpen(false);
    }
    

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
                    <NavLink to={`/window/admin`} onClick={() => setIsAdminOpen(prev => !prev)}>
                        <div >Admin Panel</div>
                    </NavLink>
                    
                    {isAdminOpen && (
                    <ul className='nav-sub-link'>
                        <li className="link-btn" onClick={() => handleAdminAction("add")}>Add</li>
                        <li className="link-btn" onClick={() => handleAdminAction("edit")}>Edit</li>
                        <li className="link-btn" onClick={() => handleAdminAction("delete")}>Delete</li>                       
                    </ul>)
                    }                    
                </nav>
            </div>
        </div>
    )
}

