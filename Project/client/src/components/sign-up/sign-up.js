"use client";

import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, showMessage] = useState(false);
  const [label, setLabel] = useState("");

  const emailOnChange = (event) => {
    setEmail(event.target.value);
  };

  const userCreation = async () => {
    const formBody = JSON.stringify({
      u_first_name: firstName,
      u_last_name: lastName,
      u_email: email,
      u_password: password,
    });

    const res = await fetch("http://localhost:8080/user", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      showMessage(true);
    }

    setLabel(data.message);
  };

  const onSubmit = () => {
    // alert(firstName + " " + lastName);
    userCreation();
  };

  return (
    <main 
    className="flex"
    >
     
      <div 
      className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
      >
         {message && (
         <label
          htmlFor="label"
          className="font-medium" Style="color:blue"
        >
          {label}
        </label>
         )}

        {/* <form className="space-y-6"> */}
        <div>
          <label
            htmlFor="firstname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              id="firstname"
              name="firstname"
              type="text"
              required
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="lastname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last Name
          </label>
          <div className="mt-2">
            <input
              id="lastname"
              name="lastname"
              type="text"
              required
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={emailOnChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onSubmit}
          >
            Sign Up
          </button>
        </div>
        {/* </form> */}
      </div>
    </main>
  );
}
