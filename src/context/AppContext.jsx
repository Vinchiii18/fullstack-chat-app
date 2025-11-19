import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { supabase } from "../config/supabaseClient";

// Create the AppContext
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  // Load user data by UID
  const loadUserData = useCallback(async (uid) => {
    console.log("loadUserData called with UID:", uid);
    try {
      const { data, error } = await supabase.from("users").select("*");
      console.log("dataAAA:", data, "errorAAA:", error);
    } catch (err) {
      console.error("Error in loadUserData catch block:", err);
      return null;
    }
  }, []);

  // This effect watches userData state
  useEffect(() => {
    if (userData) {
      console.log("userData state changed:", userData);
    }
  }, [userData]);

  // Optional: load chat data by UID
  const loadChatData = useCallback(async (uid) => {
    console.log("loadChatData called with UID:", uid);
    try {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", uid)
        .single();

      if (error) {
        console.error("Supabase error in loadChatData:", error);
        return null;
      }

      setChatData(data);
      console.log("Chat data loaded:", data);
      return data;
    } catch (err) {
      console.error("Error in loadChatData catch block:", err);
      return null;
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
      chatData,
      setChatData,
      loadUserData,
      loadChatData,
    }),
    [userData, chatData, loadUserData, loadChatData]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
