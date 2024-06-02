import { create } from "zustand";

export type Account = {
	account: string;
};

interface AccountState {
	account: Account | null;
	setAccount: (account: string) => void;
}

const initialState = {
	account: null,
};

const useCurrentAccount = create<AccountState>()((set) => ({
	...initialState,
	setAccount: (account) => set(() => ({ account: { account: account } })),
}));

export default useCurrentAccount;
