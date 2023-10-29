import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GetBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found in local storage.");
        return;
      }

      const response = await axios.get(
        "https://nem111-assignment.onrender.com/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const books = response.data.books;
      setBooks(books);
      console.log(books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    // CODE WRITTEN USING FETCH
    // fetch("https://nem111-assignment.onrender.com/notes", {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3>Books</h3>
      {books.length > 0 &&
        books.map((item) => (
          <div key={item._id}>
            <h2>{item.title}</h2>
            <h3>{item.genre}</h3>
            <h4>{item.author}</h4>
            <h4>{item.publishing_year}</h4>
            <button>
              <Link to={`updatebook/${item._id}`}>Update Book!</Link>
            </button>
            <button>
              <Link to={`deletebook/${item._id}`}>Delete Book!</Link>
            </button>
          </div>
        ))}
    </div>
  );
};
