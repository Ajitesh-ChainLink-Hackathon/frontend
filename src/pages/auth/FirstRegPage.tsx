import FormInput from "../../components/authentication/form-input/FormInput";
import AuthButtons from "../../components/authentication/auth-buttons/AuthButtons";
import { Link, useNavigation } from "react-router-dom";
import { UserProps } from "../../hooks/useCurrentUser.zustand";


type PageProps = {
   newUser: UserProps & {confirm_password: string}
	handleNext:(e: React.FormEvent<HTMLFormElement>) => void;
   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function FirstRegPage({handleNext, handleChange, newUser}:PageProps) {
   const navigation = useNavigation();
	return (
		<form onSubmit={handleNext}>
			<FormInput
				name="name"
				type="text"
				label
				id="name"
				handleChange={handleChange}
				value={newUser.name}
				required
			/>
         <FormInput
				name="email"
				type="email"
				label
				id="email"
				handleChange={handleChange}
				value={newUser.email}
				required
			/>
			<AuthButtons
				isLoading={navigation.state == "loading"? true : false}
				src="arrow_right"
			>
				Continue
			</AuthButtons>
			<label className="auth__label">
				Already have an account ?<Link to="/login">Log in</Link>
			</label>
		</form>
	);
}
export default FirstRegPage;