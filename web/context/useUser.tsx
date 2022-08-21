import React, { createContext, useContext, useState } from 'react';
import { GQLUser } from '../graphql/graphqlHooks';

type IUser = GQLUser | null;

interface UserContextType {
  user: IUser;
  setUser(user: IUser): void;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
