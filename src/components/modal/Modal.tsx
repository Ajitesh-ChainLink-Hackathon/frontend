import { Fragment } from 'react/jsx-runtime';
import useCurrentUser from '../../hooks/useCurrentUser.zustand';
import './style.scss';
import { useNavigate } from 'react-router-dom';


function Modal() {
	const { loginModal, setLoginModal } = useCurrentUser((state) => state);

	const navigate = useNavigate();

	const handleHideMOdal = () => {
		setLoginModal(false);
	};
	return (
		loginModal && (
			<Fragment>
				<div className="modal__overlay" onClick={handleHideMOdal}></div>
				<div className="modal">
					<span onClick={handleHideMOdal}>
						<img src="/icons/cancel.svg" alt="" />
					</span>
					<img
						className="modal__img"
						src="/icons/modal-login.svg"
						alt=""
					/>
					<h2>Login To Your Accout</h2>
					<p>
						It seems you are not logged in. Please log in to continue
						accessing this part of the application.
					</p>
					<button onClick={() => navigate('/login')}>
						Login <img src="/icons/arrow_right.svg" alt="" />
					</button>
				</div>
			</Fragment>
		)
	);
}
export default Modal;
