import {NavLink} from 'react-router-dom' // navigate through links with out full page reloads
import {supabase} from './supabase' // connects to database
import CardMenu from './CardMeun';
import RecordDetails from './RecordDetails';
import AdminPanel from './AdminPanel';

export default function NavMenu() {

    return(
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
                    <NavLink to={`/window/admin/`}>Admin Panel</NavLink>
                </nav>
            </div>
        </div>
    )
}

