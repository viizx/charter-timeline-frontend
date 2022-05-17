import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const history = useHistory();
  if (localStorage.getItem("auth-token")) history.push("/");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const creds = { email, password };
    console.log(creds);
    const rawResponse = await fetch(
      "https://port-3000-js-practice-vice889681.codeanyapp.com/api/user/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      }
    );
    try {
      const response = await rawResponse.json();
      console.log(response);
      if (response.message) {
        setError(response.message);
      } else {
        localStorage.setItem("auth-token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        history.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="kontejner2">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="formLabel">Email</label>
        </div>
        <input
          className="formItem"
          placeholder="email"
          type="email"
          id="email"
          name="email"
          autoComplete="current-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div>
          <div>
            <label className="formLabel">Password</label>
          </div>
          <input
            className="formItem"
            placeholder="password"
            id="password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {error && <p className="err">{error}</p>}
        <div className="button">
          <button className="btn btn-primary" type="submit">
            Prijavi se
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
