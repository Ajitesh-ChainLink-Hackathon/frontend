import { Outlet } from 'react-router-dom';
import Hero from '../../components/dashboard/hero/Hero';
import NavBar from '../../components/dashboard/navbar/NavBar';
import Footer from '../../components/dashboard/footer/Footer';
import Modal from '../../components/modal/Modal';
import SellingModal from '../../components/sell/selling-modal/SellingModal';

function Dashboard() {
	return (
		<section>
			<NavBar />
			<Hero />
			<Outlet />
			<Footer />
			<Modal />
			<SellingModal />
		</section>
	);
}
export default Dashboard;
