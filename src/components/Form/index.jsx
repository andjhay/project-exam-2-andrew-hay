import React from "react";

function Form({ currentForm }) {
  const submitForm = (event) => {
    event.preventDefault();
    const form = [...event.target];
    let formData = [];
    form.forEach((target) => {
      if (target.id) {
        let key = target.id;
        let value = target.value;
        let formEntry = {};
        formEntry[key] = value;
        target.value = "";
        formData.push(formEntry);
      }
    });
    console.log(formData);
    alert("Form Submitted");
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        {currentForm === "Sign Up" ? (
          <div className="mb-3">
            <label>Username</label>
            <input required minLength={3} type="name" placeholder="" />
          </div>
        ) : null}
        <div className="mb-3">
          <label>Email address</label>
          <input required type="email" placeholder="name@example.com (required)" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input required minLength={3} type="name" placeholder="John Doe (required)" />
        </div>
        {currentForm === "Sign Up" ? (
          <div className="mb-3">
            <label>Avatar</label>
            <input required minLength={3} type="name" placeholder="John Doe (required)" />
          </div>
        ) : null}
        {currentForm === "Sign Up" ? (
          <div className="mb-3">
            <label>Checkbox</label>
            <input required minLength={3} type="checkbox" placeholder="John Doe (required)" />
            <input required minLength={3} type="checkbox" placeholder="John Doe (required)" />
          </div>
        ) : null}
        <button className="m-2 h-9 w-24 rounded-2xl border-2 border-darkbrown bg-darkbrown font-header text-white hover:border-yellowsand ">
          {currentForm}
        </button>
      </form>
    </div>
  );
}

export default Form;
