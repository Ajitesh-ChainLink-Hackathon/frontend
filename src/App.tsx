import  { useState, useEffect } from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Orders from "./pages/orders/Orders";
import CollectionOverview from "./pages/dashboard/CollectionOverview";
import CollectionCategory from "./pages/dashboard/CollectionCategory";
import Cart from "./pages/cart/Cart";
import { Fragment } from "react/jsx-runtime";
import { Toaster } from "react-hot-toast";
import Selling from "./pages/selling/Selling";
import MetaMaskModal from "./components/metamaskmodal/Metamaskmodal";
import useCurrentAccount from "./hooks/useCurrentAccount.zustand";
import useCurrentUser from "./hooks/useCurrentUser.zustand";

const router = createBrowserRouter([
	// {
	// 	path: "/",
	// 	element: <Dashboard />,
	// 	children: [
	// 		{
	// 			index: true,
	// 			element: <CollectionOverview />,
	// 		},
	// 		{
	// 			path: "/dashboard/:category",
	// 			element: <CollectionCategory />,
	// 		},
	// 	],
	// },
	{
		path: "/:username",
		element: <Dashboard />,
		children: [
			{
				index: true,
				element: <CollectionOverview />,
			},
			{
				path: "/:username/dashboard/:category",
				element: <CollectionCategory />,
			},
		],

	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register/*",
				element: <Register />,
			},
		],
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/orders",
		element: <Orders />,
	},
	{
		path: "/selling",
		element: <Selling />,
	},
]);

function App() {
	const { account } = useCurrentAccount((state) => state);
	const {currentUser}=useCurrentUser(((state)=>state));
	const [modalIsOpen, setModalIsOpen] = useState(account == null);

	useEffect(() => {
	if (account != null) setModalIsOpen(false);
		console.log("App ka account : ",account,"\nApp ka user: ",currentUser);
	}, [account]);


	return (
		<Fragment>
			<Toaster />
			<RouterProvider router={router} />
			modalIsOpen && (<MetaMaskModal />)
		</Fragment>
	);
}

export default App;
