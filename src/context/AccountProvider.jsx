import { createContext, useState } from "react";

export const AuthContext = createContext();

const AccountProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [account, setAccount] = useState();
  const [users, setUsers] = useState();
  const [userChatOpen, setUserChatOpen] = useState({});

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        account,
        setAccount,
        setUsers,
        users,
        userChatOpen,
        setUserChatOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AccountProvider;
