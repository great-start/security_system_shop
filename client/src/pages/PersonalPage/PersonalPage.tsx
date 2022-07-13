import React, { useEffect, useState } from 'react';
import { userService } from '../../services';

export const PersonalPage = () => {

  const [users, setUsers] = useState([]);

  useEffect( () => {
    const getUsers = async () => {
      const { data } = await userService.getAll();
      setUsers(data);
    }
    getUsers();
  },[])

    return (
        <div>
            Personal Page
          { users.map(user => <p key={new Date().getTime()}>{JSON.stringify(user)}</p>)}
        </div>
    );
};
