import React from "react";

function Home() {
  return (
    <div className="grow bg-[url('/src/assets/beach.jpg')] bg-cover">
      <div className="container mx-auto">
        <h1 className="font-header text-3xl">Home testing fonts here </h1>
        <h5 className="font-subheader text-xl">Subheader font test</h5>
        <p className="font-paragraphs">testing p font </p>
      </div>
    </div>
  );
}

export default Home;
