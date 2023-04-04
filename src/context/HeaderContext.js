import { View, Text } from "react-native";
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavContext = createContext();

export const FavouriteProvider = ({ children }) => {
 const [headerTitle, setHeaderTitle] = useState('exercisedetails');

  

  return (
    <FavContext.Provider
      value={{
        headerTitle,
        setHeaderTitle
      }}
    >
      {children}
    </FavContext.Provider>
  );
};

export default function useFavourite() {
  return useContext(FavContext);
}