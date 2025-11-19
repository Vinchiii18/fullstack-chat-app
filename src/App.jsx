import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import { ToastContainer, toast } from "react-toastify";
import { supabase } from "./config/supabaseClient";
import { AppContext } from "./context/AppContext";

const App = () => {
  const navigate = useNavigate();
  const { loadUserData, loadChatData } = useContext(AppContext);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // console.log("haha", session.user);
          // const { data, error } = await supabase.from("users").select("*");
          // console.log({ data, error });

          const uid = session.user.id;
          // Load user data
          const user = await loadUserData(uid);
          console.log("loadUserData finished, returned:", user);

          // Optional: load chat data
          // const chats = await loadChatData(uid);
          // console.log("loadChatData finished, returned:", chats);

          navigate("/chat");
        } else {
          // console.log("User logged out");
          navigate("/");
        }
      }
    );

    // Cleanup listener on unmount
    return () => {
      listener.subscription.unsubscribe();
      console.log("Auth listener unsubscribed");
    };
  }, [loadUserData, loadChatData, navigate]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
