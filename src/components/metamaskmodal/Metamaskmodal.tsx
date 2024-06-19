import React, { useState, useEffect } from "react";
import "./style.scss";
import { Fragment } from "react/jsx-runtime";
import { getAccounts } from "../../utils/web3";
import useCurrentAccount from "../../hooks/useCurrentAccount.zustand";
import useCurrentUser from "../../hooks/useCurrentUser.zustand";

const MetaMaskModal: React.FC = () => {
	const { account, setAccount } = useCurrentAccount((state) => state);

	const [modalIsOpen, setModalIsOpen] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { currentUser } = useCurrentUser((state) => state);

	// useEffect(() => {
	// 	if (currentUser?.account!=null) setModalIsOpen(false);
	// });

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const connectMetaMask = async () => {
		try {
			const accounts = await getAccounts();
			setAccount(accounts[0]);
			setErrorMessage(null);
			closeModal();
		} catch (error) {
			setErrorMessage(`User denied account access: ${error}`);
		}
	};
	// const closeModalByClose=()=>{
	// 	alert("Please connect to MetaMask ");
	// 	setModalIsOpen(true);
	// }

	return (
		modalIsOpen && (
			<Fragment>
				<div className="modal__overlay"></div>
				<div className="modal">
					<img
						className="modal__img"
						src="/icons/modal-login.svg"
						alt=""
					/>
					<h2>Connect to Metamask</h2>
					<button onClick={connectMetaMask}>Connect</button>
					{account && (
						<p>Connected Account: {account.account}</p>
					)}
					{errorMessage && (
						<p style={{ color: "red" }}>{errorMessage}</p>
					)}
					{/* <button onClick={closeModalByClose}>Close</button> */}
				</div>
			</Fragment>
		)
	);
};

export default MetaMaskModal;
