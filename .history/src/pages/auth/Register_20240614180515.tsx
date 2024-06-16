import { Fragment, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';
import FirstRegPage from './FirstRegPage';
import SecondRegPage from './SecondRegPage';
import useCurrentUser from '../../hooks/useCurrentUser.zustand';

function Register() {
	const [searchParam, setSearchParam] = useSearchParams();
	const [newUser, setNewUser] = useState({
		name: searchParam.get('name') ?? '',
		email: searchParam.get('email') ?? '',
		password: '',
		confirm_password: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { setCurrentUser, setLoginModal } = useCurrentUser((state) => state);

	const moveToNextPage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/register/second');
		setSearchParam({
			...searchParam,
			name: newUser.name,
			email: newUser.email,
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setNewUser((newUserData) => ({
			...newUserData,
			[name]: value,
		}));
		if (name !== 'password') {
			setSearchParam({
				...searchParam,
				name: newUser.name,
				email: newUser.email,
				[name]: value,
			});
		}
	};

	const createNewUser = async () => {
		try {
			setIsLoading(true);
			setCurrentUser({ name: newUser.name, email: newUser.email });
			setLoginModal(false)
			navigate('/');

		} catch {
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Fragment>
			<div className="auth__form__content">
				<h1>Sign up 🎯</h1>
				<Routes>
					<Route
						index
						element={
							<FirstRegPage
								newUser={newUser}
								handleChange={handleChange}
								handleNext={moveToNextPage}
							/>
						}
					/>
					<Route
						path="/second"
						element={
							newUser.name && newUser.email ? (
								<SecondRegPage
									handleChange={handleChange}
									handleSubmit={createNewUser}
									newUser={newUser}
									isLoading={isLoading}
								/>
							) : (
								<Navigate replace to={'/register'} />
							)
						}
					/>
				</Routes>
			</div>
		</Fragment>
	);
}

export default Register;
