import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState(0);

  const handleRegistration = async () => {
    const payload = {
      username,
      email,
      pass,
      city,
      age,
    };

    try {
      const response = await axios.post(
        "https://nem111-assignment.onrender.com/users/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // CODE WRITTEN USING FETCH
    // fetch("https://nem111-assignment.onrender.com/users/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Registeration Page</h3>
      <input
        type="text"
        placeholder="Enter Username..."
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
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
      <input
        type="text"
        placeholder="Enter City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Age..."
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};
