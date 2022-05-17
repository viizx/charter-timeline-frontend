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
        history.go(0);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="formLabel">Email adresa</label>
        </div>
        <input
          className="formItem"
          placeholder="email"
          id="inputEmailAddress"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div>
          <div>
            <label className="formLabel">Šifra</label>
          </div>
          <input
            className="formItem"
            placeholder="password"
            id="inputPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {error && <p className="err">{error}</p>}
        <div className="container">
          <button className="loginBtn" type="submit">
            Prijavi se
          </button>
        </div>
      </form>
      <div className="container">
        <div className="links">
          <Link to="/register">Nemaš račun? Klikni me!</Link>
        </div>
        <div className="links">
          <Link to="/forgot-password">Zaboravljena lozinka?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
