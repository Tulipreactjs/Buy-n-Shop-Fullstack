import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const Context = createContext();
let initialUser = "";

export const StateContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialUser);

  //save user to local storage
  useEffect(() => {
    if (currentUser !== initialUser) {
      localStorage.setItem("userinfo", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  //retrieve user from local storage
  useEffect(() => {
    const retrieveUser = JSON.parse(localStorage.getItem("userinfo"));
    if (retrieveUser) {
      setCurrentUser(retrieveUser);
    }
  }, []);

  //Logout User

  const logOut = () => {
    localStorage.removeItem("userinfo");
    location.replace("/");
    toast.success("Logged out successfully!");
  };

  return (
    <Context.Provider value={{ currentUser, setCurrentUser, logOut }}>
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);
