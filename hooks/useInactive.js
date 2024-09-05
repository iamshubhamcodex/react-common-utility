import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearLogoutAuthState, logoutUser } from "../components/Auth/AuthSlice";
import { persistor } from "../redux/store";
import { useNavigate } from "react-router-dom";

const useInactive = (user, stallTime = 300000) => {
  const inactivityTimeout = useRef();
  const dispatch = useDispatch();

  function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout.current);
    inactivityTimeout.current = setTimeout(onInactivity, stallTime);
  }

  function onInactivity() {
    console.error("User has not moved");

    dispatch(logoutUser()).then((action) => {
      dispatch(clearLogoutAuthState());
      localStorage.clear();
      persistor.purge();
      window.location.href = "/login";
      globalThis.profileData = null;
    });

    document.removeEventListener("mousemove", resetInactivityTimeout);
    document.removeEventListener("mousedown", resetInactivityTimeout); // User clicks
    document.removeEventListener("keydown", resetInactivityTimeout); // User presses a key
    document.removeEventListener("scroll", resetInactivityTimeout);
  }

  useEffect(() => {
    if (!user || !user?.roles) return;

    document.addEventListener("mousemove", resetInactivityTimeout);
    document.addEventListener("mousedown", resetInactivityTimeout); // User clicks
    document.addEventListener("keydown", resetInactivityTimeout); // User presses a key
    document.addEventListener("scroll", resetInactivityTimeout); // User scrolls

    resetInactivityTimeout();

    return () => {
      clearTimeout(inactivityTimeout.current);
    };
  }, [user]);
};
export default useInactive;
