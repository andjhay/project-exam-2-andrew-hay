import React from "react";
import "./styles.css";
import "./styles.scss";
import "react-calendar/dist/Calendar.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import RouteNotFound from "./pages/RouteNotFound";
import Account from "./pages/Account";
import Venue from "./pages/Venue";
import Venues from "./pages/Venues";
import VenuesMap from "./pages/VenuesMap";
import VenueBooking from "./pages/VenueBooking";
import VenueManage from "./pages/VenueManage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import FAQ from "./pages/FAQ";
import Sitemap from "./pages/Sitemap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venuesmap" element={<VenuesMap />} />
        <Route path="/venue/:id" element={<Venue />} />
        <Route path="/bookingcreate/:venueId" element={<VenueBooking />} />
        <Route path="/bookingedit/:venueId/:bookingId" element={<VenueBooking />} />
        <Route path="/venuecreate/:id" element={<VenueManage />} />
        <Route path="/venueedit/:id" element={<VenueManage />} />
        <Route path="/account/:userName" element={<Account />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
