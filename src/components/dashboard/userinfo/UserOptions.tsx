
import { useNavigate } from 'react-router-dom';
import './style.scss';
import useCurrentUser from '../../../hooks/useCurrentUser.zustand';

function UserOptions() {
	const currentUser = useCurrentUser(state => state.currentUser)
	const navigate = useNavigate();

	const handleSignOutUser = () => {
		navigate('/login');
	};
	return (
		<div className="user__options__modal">
			<div className="user__details">
				<span>AS</span>
				<div>
					<p className="user__name">{currentUser?.name}</p>
					<p className="user__email">{currentUser?.email}</p>
				</div>
			</div>
			<div onClick={handleSignOutUser} className='option'>
				<img src="/icons/selling.svg" alt="" />
				<p>Selling</p>
			</div>
			<div onClick={handleSignOutUser} className='option'>
				<img src="/icons/order.svg" alt="" />
				<p>Orders</p>
			</div>
			<div onClick={handleSignOutUser} className='option logout'>
				<img src="/icons/logout.svg" alt="" />
				<p>Log out</p>
			</div>
		</div>
	);
}


export default UserOptions