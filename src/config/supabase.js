// ./config/supabase.js
import { supabase } from "./supabaseClient";
import { toast } from "react-toastify";

const signup = async (username, email, password) => {
  try {
    // 1️⃣ Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error(authError);
      toast.error(authError.message);
      return;
    }

    const user = authData.user;
    console.log("Signed up user ID:", user.id);

    // 2️⃣ Immediately sign in to get an active session
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      console.error(loginError);
      toast.error(loginError.message);
      return;
    }

    const sessionUser = loginData.user;
    console.log("Session active for user ID:", sessionUser.id);

    // 3️⃣ Insert into users table
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: sessionUser.id,
        username: username.toLowerCase(),
        email: sessionUser.email,
        name: "",
        avatar: "",
        bio: "Hey there, I am using chat app",
        lastSeen: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      console.error(dbError);
      toast.error(dbError.message);
      return;
    }

    // 4️⃣ Insert empty chat row
    const { error: chatError } = await supabase.from("chats").insert([
      {
        user_id: sessionUser.id,
        chatData: [],
      },
    ]);

    if (chatError) {
      console.error(chatError);
      toast.error(chatError.message);
      return;
    }

    toast.success("Account created! You can now use your chat app.");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong during signup.");
  }
};

const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      toast.error(error.message);
      return;
    }

    // Successful login
    console.log("Logged in user:", data.user);
    toast.success("Login successful!");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  }
};

export { signup, login };
