import FormInput from "../../components/authentication/form-input/FormInput";
import AuthButtons from "../../components/authentication/auth-buttons/AuthButtons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserProps } from "../../hooks/useCurrentUser.zustand";
import "./auth.scss";
import useCurrentUser from "../../hooks/useCurrentUser.zustand";
import useCurrentAccount from "../../hooks/useCurrentAccount.zustand";



type PageProps = {
   newUser: UserProps & {confirm_password: string};
   isLoading: boolean;
   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function SecondRegPage({handleChange, handleSubmit, newUser}:PageProps) {

   // const navigation = useNavigation();
   
   const navigate=useNavigate();
   let {currentUser}=useCurrentUser((state)=>state);
   let {account}=useCurrentAccount((state)=>state);
   
   const [policy, setPolicy] = useState(false);
   const changePolicy =()=> {
	setPolicy(!policy);
   }

   function registerDone(){
	console.log("regDone user : ",newUser);
	currentUser=newUser;
	currentUser.account=account?.account.toString();
	console.log("current : ",currentUser);
	navigate(`/${currentUser.name}`);
   }
  
	return (
		<form onSubmit={handleSubmit}>
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
			<FormInput
				name="confirm_password"
				type="password"
				label
				id="confirm_password"
				handleChange={handleChange}
				value={newUser.confirm_password}
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
			
			{/* <AuthButtons
				isLoading={isLoading}
				src="arrow_right"
            isDisabled={!policy}
			>Register
			</AuthButtons> */}
			<button className="register_but" onClick={registerDone}>Register</button>

		</form>
	);
}
export default SecondRegPage;