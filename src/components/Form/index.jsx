import React from "react";

function Form() {
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
    alert("Contact Form Submitted");
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="mb-3" controlId="Full Name">
          <label>Full Name</label>
          <input required minLength={3} type="name" placeholder="John Doe (required)" />
        </div>
        <div className="mb-3" controlId="Email">
          <label>Email address</label>
          <input required type="email" placeholder="name@example.com (required)" />
        </div>
        <button variant="custom" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Form;
