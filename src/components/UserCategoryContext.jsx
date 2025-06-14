import { createContext, useContext, useEffect, useState } from "react";

export const UserCategoryContext = createContext();

export const useUserCategory = () => useContext(UserCategoryContext);

export const UserCategoryProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, categoriesRes] = await Promise.all([
        fetch(`http://localhost:3000/users`),
        fetch(` http://localhost:3000/categories`),
      ]);
      const usersData = await usersRes.json();
      const categoriesData = await categoriesRes.json();

      setUsers(usersData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  return (
    <UserCategoryContext.Provider value={{ users, categories }}>
      {children}
    </UserCategoryContext.Provider>
  );
};
