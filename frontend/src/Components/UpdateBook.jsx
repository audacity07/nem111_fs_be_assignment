import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const UpdateBook = () => {
  const { id } = useParams();
  const [publishingYear, setPublishingYear] = useState(0);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        publishing_year: publishingYear,
      };

      const response = await axios.patch(
        `https://nem111-assignment.onrender.com/books/update/${id}`,
        payload,
        {
          headers: {
            "Content-type": "application/json",
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
      <h3>Update Book</h3>
      <input
        type="number"
        placeholder="Enter New Publish Year Here..."
        value={publishingYear}
        onChange={(e) => setPublishingYear(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Book!</button>
    </div>
  );
};
