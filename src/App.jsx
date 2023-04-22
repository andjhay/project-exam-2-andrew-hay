import React from "react";
import "./styles.css";
import "./styles.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import RouteNotFound from "./pages/RouteNotFound";
import Account from "./pages/Account";
import Venue from "./pages/Venue";
import Venues from "./pages/Venues";
import VenuesMap from "./pages/VenuesMap";
import VenueBook from "./pages/VenueBook";
import VenueManage from "./pages/VenueManage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venuesmap" element={<VenuesMap />} />
        <Route path="/venue/:id" element={<Venue />} />
        <Route path="/venuebook/:id" element={<VenueBook />} />
        <Route path="/venuemanage" element={<VenueManage />} />
        <Route path="/account/:name" element={<Account />} />
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
