import { Outlet } from 'react-router-dom';
import Hero from '../../components/dashboard/hero/Hero';
import NavBar from '../../components/dashboard/navbar/NavBar';

function Dashboard() {
	return (
		<section>
			<NavBar />
			<Hero />
			<Outlet />
		</section>
	);
}
export default Dashboard;
