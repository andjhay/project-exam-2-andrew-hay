import { Link } from "react-router-dom";

function Venues({ data }) {
  console.log(data);
  return (
    <div className="flex justify-center">
      <div className="m-2">
        <Link to="/venuesmap">
          <button className="flex items-center rounded-lg border-2 border-darkbrown bg-darkbrown px-2 py-1 font-header text-white hover:border-yellowsand ">
            View on Map
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1 fill-white"
              height="19"
              viewBox="0 96 960 960"
              width="19"
            >
              <path d="m269.333 786.667 295-125.667L690 366 395 491.667l-125.667 295ZM480 616q-17 0-28.5-11.5T440 576q0-17 11.5-28.5T480 536q17 0 28.5 11.5T520 576q0 17-11.5 28.5T480 616Zm-.214 389.33q-88.426 0-167.253-33.267-78.827-33.271-137.076-91.52-58.249-58.249-91.52-137.071-33.27-78.823-33.27-167.38 0-89.238 33.33-167.666 33.329-78.427 91.859-136.922 58.53-58.494 136.966-91.999Q391.257 146 479.557 146q89.329 0 168.082 33.437 78.753 33.436 137.028 91.826 58.275 58.391 91.804 137.006Q910 486.885 910 576.389q0 88.795-33.505 167.002-33.505 78.208-91.999 136.746-58.495 58.537-136.928 91.867-78.433 33.326-167.782 33.326Zm-.015-105.996q134.742 0 229.152-94.096 94.411-94.096 94.411-229.009 0-134.742-94.182-229.152-94.181-94.411-229.256-94.411-134.409 0-228.819 94.182-94.411 94.181-94.411 229.256 0 134.409 94.096 228.819 94.096 94.411 229.009 94.411ZM480 576Z" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Venues;
