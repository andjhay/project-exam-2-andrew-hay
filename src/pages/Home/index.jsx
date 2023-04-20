import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="grow bg-[url('/src/assets/beach.jpg')] bg-cover">
      <div className="container mx-auto">
        <h1 className="font-header text-3xl">Home testing fonts here </h1>
        <h5 className="font-subheader text-xl">Subheader font test</h5>
        <p className="font-paragraphs">testing p font </p>
        <Link to="/venues">
          <button className=" rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-header text-white hover:border-yellowsand ">
            View Venues Now!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
