import React, { useEffect , useState} from "react";
import BookList from '../components/BookList';
import axios from 'axios';
import BookSearch from "../components/BookSearch";
axios.defaults.withCredentials = false;


const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user');
        console.log(response);
        if (response.status === 200) {
            setUser(response.data);
        } else {
            throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  console.log(user)
  return (
    <div>
      <h2>User Details</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <BookList bookList={user.bookList} />
          <BookSearch />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;