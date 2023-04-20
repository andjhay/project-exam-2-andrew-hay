import React from "react";

function Search() {
  return (
    <form className="flex items-center" action="">
      <input
        className="rounded-l-lg border-2 border-r-0 border-black bg-lightblue p-1 px-3 placeholder-black focus:outline-none"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="rounded-r-lg border-2 border-l-0 border-black bg-lightblue">
        <svg className="h-8 hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
          <path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
        </svg>
      </button>
    </form>
  );
}

export default Search;
