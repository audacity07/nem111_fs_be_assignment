import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleAuth = async () => {
    const payload = {
      email,
      pass,
    };

    try {
      let response = await axios.post(
        `https://nem111-assignment.onrender.com/users/login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log(data);
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.log(err.response.data);
    }

    // CODE WRITTEN USING FETCH
    //   fetch("https://nem111-assignment.onrender.com/users/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       console.log(res);
    //       localStorage.setItem("token", res.token);
    //     })
    //     .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Login Page</h3>
      <input
        type="text"
        placeholder="Enter Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Password..."
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleAuth}>Login</button>
    </div>
  );
};
