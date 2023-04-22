import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex grow bg-[url('/src/assets/beach.jpg')] bg-cover">
      <div className="m-4 flex min-w-max grow flex-col items-center">
        <div className="flex min-w-full basis-1/6 items-end">
          <h2 className="basis-2/3 text-center font-subheader text-xl">Find your perfect getaway!</h2>
        </div>
        <div className="flex min-w-full basis-2/6 items-center justify-end">
          <h2 className="basis-2/3 text-center font-subheader text-xl">
            Bungalows, Apartments and more <br /> all around the globe!
          </h2>
        </div>

        <div className="basis-3/6">
          <Link to="/venues">
            <button className="rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-subheader text-white hover:border-yellowsand ">
              View Venues Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
