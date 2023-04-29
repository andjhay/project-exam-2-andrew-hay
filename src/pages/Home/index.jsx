import React from "react";
import Search from "../../components/Search";

function Home() {
  return (
    <div className="flex grow bg-[url('/src/assets/beach.jpg')] bg-cover">
      <div className="mx-auto my-3 flex grow flex-col items-center">
        <div className="flex min-w-full basis-1/6 items-end p-3">
          <h1 className="basis-2/3 font-subheader text-xl sm:text-center">Find your perfect getaway!</h1>
        </div>
        <div className="flex min-w-full basis-2/6 items-center justify-end p-3">
          <h2 className="basis-2/3 text-center font-subheader text-xl">
            Bungalows, Apartments and more <br /> all around the globe!
          </h2>
        </div>
        <Search />
      </div>
    </div>
  );
}

export default Home;
