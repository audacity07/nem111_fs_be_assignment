import axios from "axios";

const logoutFunc = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:8080/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.clear();
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const Logout = () => {
  useEffect(() => {
    logoutFunc();
  }, []);

  return (
    <div>
      <h1>Logged Out !</h1>
    </div>
  );
};
