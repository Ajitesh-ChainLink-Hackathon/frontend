import FormInput from "../../components/authentication/form-input/FormInput";
import AuthButtons from "../../components/authentication/auth-buttons/AuthButtons";
import { Link, useNavigate } from "react-router-dom";

import { useState} from "react";

import { useSearchParams } from "react-router-dom";

function Login() {
   const [searchParam, setSearchParam] = useSearchParams();

   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

      
   const [formalUser, setFormalUser] = useState({
      email: searchParam.get('email') ??'',
      password: ""
   })

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
      const {name, value} = e.target;
      setFormalUser(userData => ({
         ...userData,
         [name]: value
      }))
      if (name === "email") {
         setSearchParam({...searchParam, [name]: value})
      }
	};

   const handleGoogleAuth =async() => {
      setIsLoading(true);
		navigate("/dashboard")


   }

   const logUserIn = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true)

   }

	return (
		<div className="auth__form__content">
			<h1>Login 🎒</h1>
			<form onSubmit={logUserIn}>
				<FormInput
					name="email"
					type="email"
					label
					id="email"
					handleChange={handleChange}
					value={formalUser.email}
					required
				/>
				<FormInput
					name="password"
					type="password"
					eyeicon
					label
					id="password"
					handleChange={handleChange}
					value={formalUser.password}
					required
				/>
				<AuthButtons handleGoogleAuth={handleGoogleAuth} isLoading={isLoading}  goggleAuth>Login</AuthButtons>
				<label className="auth__label">
					Don&apos;t have an account?
					<Link to="/auth/register"> Sign Up</Link>
				</label>
			</form>
		</div>
	);
}

export default Login;