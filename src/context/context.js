import React, { createContext, useReducer } from "react";
import { reducer } from "./reducer";
export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, { searchText: "" });

  return (
    <GlobalContext.Provider value={{ data, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
