import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Orders from './pages/orders/Orders';
import CollectionOverview from './pages/dashboard/CollectionOverview';
import CollectionCategory from './pages/dashboard/CollectionCategory';
import Cart from './pages/cart/Cart';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		children: [
			{
				index: true,
				element: <CollectionOverview />,
			},
			{
				path: '/dashboard/:category',
				element: <CollectionCategory />,
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register/*',
				element: <Register />,
			},
		],
	},
	{
		path: '/cart',
		element: <Cart />,
	},
	{
		path: '/orders',
		element: <Orders />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
