import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState('Guest');
  const [role, setRole] = useState('');

  const [auth, setAuth] = useState(false);
  // const [message, setMessage] = useState('');
  // const [name, setName] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/')
      .then((res) => {
        // console.log(res.data);
        if (res.data.Status === 'Success') {
          // console.log('from context', res.data.role);
          setAuth(true);
          setAuth(true);
          setUsername(res.data.name);
          setRole(res.data.role);
          // setName(res.data.name);
          // navigate('/login');
        } else {
          setAuth(false);
          // setMessage(res.data.Error);
          // console.log(res.data.message);
        }
      })
      .then((err) => console.log(err));
  }, [auth]);

  // console.log('role', role);
  return (
    <UsernameContext.Provider value={{ auth, setAuth, username, setUsername, profile, setProfile, role, setRole }}>
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameContext;
