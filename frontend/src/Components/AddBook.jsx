import { useState } from "react";
import axios from "axios";

export const AddBook = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [publishingYear, setPublishingYear] = useState(0);

  const handleCreation = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        title,
        genre,
        author,
        publishing_year: publishingYear,
      };

      const response = await axios.post(
        "https://nem111-assignment.onrender.com/books/add",
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
      <h3>Add Book</h3>
      <input
        type="text"
        placeholder="Enter Book Title Here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Book Genre Here..."
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Author Name Here..."
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Publish Year Here..."
        value={publishingYear}
        onChange={(e) => setPublishingYear(e.target.value)}
      />

      <button onClick={handleCreation}>Add Book!</button>
    </div>
  );
};
