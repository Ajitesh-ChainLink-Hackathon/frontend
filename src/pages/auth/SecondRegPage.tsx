import FormInput from "../../components/authentication/form-input/FormInput";
import AuthButtons from "../../components/authentication/auth-buttons/AuthButtons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserProps } from "../../hooks/useCurrentUser.zustand";

type PageProps = {
   newUser: UserProps & {confirm_password: string};
   isLoading: boolean;
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function SecondRegPage({handleChange, handleSubmit, newUser, isLoading}:PageProps) {
   // const navigation = useNavigation();
   // console.log(newUser)

   const [policy, setPolicy] = useState(false);
   const changePolicy =()=> {
      setPolicy(!policy)
   }
	return (
		<form onSubmit={handleSubmit}>
			<FormInput
				name="confirm_password"
				type="password"
				label
				id="confirm_password"
				handleChange={handleChange}
				value={newUser.confirm_password}
				required
			/>
			<FormInput
				name="password"
				type="password"
				label
				id="password"
				handleChange={handleChange}
				value={newUser.password}
				eyeicon
				required
			/>
            <input
               type="radio"
               className="policy"
               id="policy"
               checked={policy}
               onClick={changePolicy}
            />
            <label
               className="policy__label"
               htmlFor="policy"
            >
               By opening an account you agree to the terms and conditions of
               our <Link to="/">privacy policy</Link>
            </label>
			
			<AuthButtons
				isLoading={isLoading}
				src="arrow_right"
            isDisabled={!policy}
			>
				Register
			</AuthButtons>
		</form>
	);
}
export default SecondRegPage;