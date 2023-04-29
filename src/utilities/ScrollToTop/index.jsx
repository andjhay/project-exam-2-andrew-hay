import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition 
// Code used from this source small and very effective guide to getting the desired outcome.
// Just scrolls the page to top when going to a new route.

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
