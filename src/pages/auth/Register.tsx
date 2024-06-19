// import { Fragment, useState } from 'react';
// import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

// import { useSearchParams } from 'react-router-dom';
// import FirstRegPage from './FirstRegPage';
// import SecondRegPage from './SecondRegPage';
// import useCurrentUser from '../../hooks/useCurrentUser.zustand';
// import useCurrentAccount from "../../hooks/useCurrentAccount.zustand";
// import { useEffect } from 'react';

// function Register() {

// 	// useEffect(() => {
// 	// 	const walletAddress = getUserWalletAddress();
// 	// 	if(walletAddress!=null){
// 	// 	setAccount(walletAddress.toString());
// 	// 	console.log(walletAddress);
// 	// }
// 	// }, []);

// 	const getUserWalletAddress=()=>{
// 		const {account}=useCurrentAccount((state=>(state)));
// 		return account;
// 	}
// 	const [account,setAccount]=useState<string>("");

// 	const [searchParam, setSearchParam] = useSearchParams();
// 	const [newUser, setNewUser] = useState({
// 		name: searchParam.get('name') ?? '',
// 		email: searchParam.get('email') ?? '',
// 		password: '',
// 		confirm_password: '',
// 		account:''
// 	});
// 	const [isLoading, setIsLoading] = useState(false);
// 	const navigate = useNavigate();
// 	const { setCurrentUser, setLoginModal } = useCurrentUser((state) => state);

// 	const moveToNextPage = (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		navigate('/register/second');
// 		console.log("newUsr : ",newUser);
// 		setSearchParam({
// 			...searchParam,
// 			name: newUser.name,
// 			email: newUser.email,

// 		});
// 	};

// 	const handleChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		const { name, value } = e.target;
// 		setNewUser((newUserData) => ({
// 			...newUserData,
// 			[name]: value,

// 		}));


// 		if (name !== 'password') {
// 			setSearchParam({
// 				...searchParam,
// 				name: newUser.name,
// 				email: newUser.email,
// 				[name]: value,

// 			});
// 		}
// 	};

// 	const createNewUser = async () => {

// 		if(newUser.password!==newUser.confirm_password){
// 			alert("passwords do not match");

			
// 		}
// 		else{
// 		try {
// 			setIsLoading(true);
// 			const {account}=useCurrentAccount((state=>(state)));
// 			if(account!=null){
// 			setCurrentUser({ name: newUser.name, email: newUser.email,account:account.toString() });
// 		}

// 			console.log(newUser);
// 			setLoginModal(false)
// 			navigate('/');

// 		} catch {
// 			setIsLoading(false);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	}
// 	};

// 	return (
// 		<Fragment>
// 			<div className="auth__form__content">
// 				<h1>Sign up 🎯</h1>
// 				<Routes>
// 					<Route
// 						index
// 						element={
// 							<FirstRegPage
// 								newUser={newUser}
// 								handleChange={handleChange}
// 								handleNext={moveToNextPage}
// 							/>
// 						}
// 					/>
// 					<Route
// 						path="/second"
// 						element={
// 							newUser.name && newUser.email ? (
// 								<SecondRegPage
// 									handleChange={handleChange}
// 									handleSubmit={createNewUser}
// 									newUser={newUser}
// 									isLoading={isLoading}
// 								/>
// 							) : (
// 								<Navigate replace to={'/register'} />
// 							)
// 						}
// 					/>
// 				</Routes>
// 			</div>
// 		</Fragment>
// 	);
// }

// export default Register;


import { Fragment, useState} from 'react';
import { Route, Routes, useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import FirstRegPage from './FirstRegPage';
import SecondRegPage from './SecondRegPage';
import useCurrentUser from '../../hooks/useCurrentUser.zustand';
import useCurrentAccount from '../../hooks/useCurrentAccount.zustand';

function Register() {
  const { account: currentAccount } = useCurrentAccount(state => state);
  const { setCurrentUser, setLoginModal } = useCurrentUser(state => state);

  const [searchParam, setSearchParam] = useSearchParams();
  const [newUser, setNewUser] = useState({
    name: searchParam.get('name') ?? '',
    email: searchParam.get('email') ?? '',
    password: '',
    confirm_password: '',
    account:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  const moveToNextPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/register/second');
    console.log("newUsr : ", newUser);
    setSearchParam({
      ...Object.fromEntries(searchParam),
      name: newUser.name,
      email: newUser.email
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewUser(newUserData => ({
      ...newUserData,
      [name]: value
    }));

    if (name !== 'password') {
      setSearchParam({
        ...Object.fromEntries(searchParam),
        name: newUser.name,
        email: newUser.email,
        [name]: value
      });
    }
  };

  const createNewUser = async () => {
    if (newUser.password !== newUser.confirm_password) {
      alert("Passwords do not match");
    } else {
      try {
        setIsLoading(true);
        if (currentAccount) {
          setCurrentUser({ name: newUser.name, email: newUser.email, account:'' });
        }
        console.log(newUser);
        setLoginModal(false);
        navigate('/');
      } catch {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
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
