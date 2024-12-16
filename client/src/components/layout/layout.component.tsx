import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/navbar.component';

const Layout = () => (
    <div>
        <Navbar />
        <Outlet />
    </div>

);

export default Layout;