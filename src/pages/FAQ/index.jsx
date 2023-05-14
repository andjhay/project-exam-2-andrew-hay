import React from "react";

/**
 * Frequently asked questions page to answer questions should someone land on this page.
 */
function FAQ() {
  return (
    <div className="m-5 flex flex-col items-center font-paragraph">
      <h1 className="font-header text-2xl">Frequently Asked Questions</h1>
      <div>
        <div className="my-3">
          <p>Q: What is this site for?</p>
          <p>A: A school project on the Noroff Front-End Development course</p>
        </div>
        <div className="my-3">
          <p>Q: Can you actually book these venues?</p>
          <p>A: No</p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
