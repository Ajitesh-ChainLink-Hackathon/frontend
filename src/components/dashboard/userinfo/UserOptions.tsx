
import { useNavigate } from 'react-router-dom';
import './style.scss';

function UserOptions() {
	const navigate = useNavigate();

	const handleSignOutUser = () => {
		navigate('/auth');
	};
	return (
		<div className="user__options__modal">
			<div className="user__details">
				<span>AS</span>
				<div>
					<p className="user__name">Anioke Sebastian</p>
					<p className="user__email">aniokechukwudi7@gmail.com</p>
				</div>
			</div>
			<div onClick={handleSignOutUser} className='option'>
				<img src="/icons/logout.svg" alt="" />
				<p>Log out</p>
			</div>
		</div>
	);
}


export default UserOptions