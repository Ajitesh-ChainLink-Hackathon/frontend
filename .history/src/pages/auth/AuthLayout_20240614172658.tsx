import "./auth.scss";
import { Outlet } from "react-router-dom";

function AuthLayout() {
	return (
		<div className="auth__page">
			<img className="auth__bg" src="/images/auth-bg.jpg" alt="" />
			<div className="logo__container">
				<img src="/logo.svg" alt="" />
				<p>SkinSwaprherthteet</p>
			</div>
			<div className="auth__image__container">
				<img
					className="auth__image"
					src={`/images/auth-bg.jpeg`}
					alt="auth__image"
				/>
			</div>
			<div className="auth__container">
				<Outlet />
			</div>
		</div>
	);
}

export default AuthLayout;