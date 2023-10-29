import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const DeleteBook = () => {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://nem111-assignment.onrender.com/books/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // CODE WRITTEN USING FETCH
    // fetch("https://nem111-assignment.onrender.com/books/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify(payload),
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Delete Book</h3>
      <input
        type="text"
        placeholder="Enter ID..."
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Book!</button>
    </div>
  );
};
