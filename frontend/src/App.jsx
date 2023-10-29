import "./App.css";
import { GetBooks } from "./Components/GetBooks";
import { AddBook } from "./Components/AddBook";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Routes, Route, Link } from "react-router-dom";
import { UpdateBook } from "./Components/UpdateBook";
import { DeleteBook } from "./Components/DeleteBook";
import { Logout } from "./Components/Logout";

function App() {
  return (
    <div className="App">
      <h1>Book Store</h1>
      <div>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/books">Get Books</Link>
        <Link to="/books/addbook">Add Book</Link>
        <Link to="/logout">Logout</Link>
        {/* <Link to="/updatebook">Update Book</Link>
        <Link to="/deletebook">Delete Book</Link> */}
      </div>

      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<GetBooks />} />
        <Route path="/books/addbook" element={<AddBook />} />
        <Route path="/books/updatebook/:id" element={<UpdateBook />} />
        <Route path="/books/deletebook/:id" element={<DeleteBook />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
