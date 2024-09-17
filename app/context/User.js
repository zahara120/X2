import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

export const UserContext = createContext();
const GET_USER_BY_ID = gql`
  query Query {
    getUserById {
      _id
      name
      username
      email
      following {
        name
        username
      }
      followers {
        name
        username
      }
    }
  }
`;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID);

  useEffect(() => {
    if (data) {
      setUser(data.getUserById);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ user, loading, error, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
