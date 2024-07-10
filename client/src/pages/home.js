import React, { useEffect , useState} from "react";
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setUser(response.data);
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
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;