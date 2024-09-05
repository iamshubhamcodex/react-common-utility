import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setIsDesktop,
  setIsMobile,
  setIsTablet,
} from "../redux/commonUtilitySlice";

const useResponsive = () => {
  const dispatch = useDispatch();

  const getWindowSize = () => {
    return document.body.dataset.size;
  };
  const checkWindowWidth = () => {
    if (window.innerWidth > 1024) {
      document.body.dataset.size = "desktop";
      dispatch(setIsDesktop(true));
    } else if (window.innerWidth <= 1024 && window.innerWidth > 524) {
      document.body.dataset.size = "tab";
      dispatch(setIsTablet(true));
    } else if (window.innerWidth <= 524) {
      document.body.dataset.size = "mobile";
      dispatch(setIsMobile(true));
    }
  };

  useEffect(() => {
      checkWindowWidth();
      window.addEventListener("resize", checkWindowWidth);
    return () => window.removeEventListener("resize", checkWindowWidth);
  }, []);
};

export default useResponsive;
