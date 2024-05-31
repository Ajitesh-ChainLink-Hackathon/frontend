import { create } from 'zustand';


export type UserProps = {
   name: string;
   email: string;
   password: string;
}

interface CurrentUserState {
  currentUser: Partial<UserProps> | null
  setCurrentUser: (user: UserProps) => void,
  setSideBar: (value: boolean)=>void,
  setLoginModal: (value:boolean)=> void,
  sideBar: boolean;
  loginModal: boolean
}

const initialState = {
   currentUser : null,
   sideBar: false,
   loginModal: false
}

const useCurrentUser = create<CurrentUserState>()((set) => ({
  ...initialState,
  setCurrentUser: (newUser) => set(() => ({ currentUser: newUser })),
  setSideBar: (value:boolean)=>set(()=>({sideBar: value})),
  setLoginModal: (value:boolean)=>set(()=>({loginModal: value}))
}))

export default useCurrentUser