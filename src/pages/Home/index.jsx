import React from "react";
import Search from "../../components/Search";

function Home() {
  return (
    <div className="flex grow bg-[url('/src/assets/beach.jpg')] bg-cover">
      <div className="m-4 flex min-w-max grow flex-col items-center">
        <div className="flex min-w-full basis-1/6 items-end">
          <h2 className="basis-2/3 sm:text-center font-subheader text-xl">Find your perfect getaway!</h2>
        </div>
        <div className="flex min-w-full basis-2/6 items-center justify-end">
          <h2 className="basis-2/3 text-center font-subheader text-xl">
            Bungalows, Apartments and more <br /> all around the globe!
          </h2>
        </div>

        <div className="grow w-auto">
          <Search/>
        </div>
      </div>
    </div>
  );
}

export default Home;
