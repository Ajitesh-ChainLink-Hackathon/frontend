import "./auth-buttons.scss";
import Loader from "../../loader/Loader";

interface authButtonProps  {
	children: string;
	goggleAuth?: boolean;
	src?: string;
   isLoading: boolean;
   isDisabled?: boolean;
   handleGoogleAuth?: ()=> Promise<void>;
}


function AuthButtons({ isLoading, children, goggleAuth, src, isDisabled, handleGoogleAuth }: authButtonProps) {
	return (
		<div  className="auth__buttons">
			<button
            disabled={isLoading || isDisabled}
				style={{ width: !goggleAuth ? "100%" : "80%" }}
				className="auth__submit__btn"
			>
				{isLoading ? <Loader />: children}
				{src && !isLoading && (
					<img
						src={`/icons/${src}.svg`}
						alt="btn-img"
					/>
				)}
			</button>
			{goggleAuth && (
				<button
               disabled={isLoading || isDisabled}
					type="button"
					className="auth__goggle__btn"
               onClick={handleGoogleAuth}
				>
					<img
						src="/icons/google.svg"
						alt="google"
					/>
				</button>
			)}

		</div>


	);
}

export default AuthButtons;
