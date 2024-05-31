import { Outlet } from 'react-router-dom';
import Hero from '../../components/dashboard/hero/Hero';
import NavBar from '../../components/dashboard/navbar/NavBar';
import Footer from '../../components/dashboard/footer/Footer';
import Modal from '../../components/modal/Modal';

function Dashboard() {
	return (
		<section>
			<NavBar />
			<Hero />
			<Outlet />
			<Footer />
			<Modal />
		</section>
	);
}
export default Dashboard;
