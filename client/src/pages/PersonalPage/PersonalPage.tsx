import React, { useEffect, useState } from 'react';
import { userService } from '../../services';
import { useAppSelector } from '../../hooks';
import { Navigate, useNavigate } from 'react-router-dom';

export const PersonalPage = () => {

  const [users, setUsers] = useState([]);
  const { isAuth } = useAppSelector(state => state.authReducer);

  useEffect( () => {
    const getUsers = async () => {
      const { data } = await userService.getAll();
      setUsers(data);
    }
    getUsers();
  },[])

    return (
        isAuth ?
          <div>
            Personal Page
            {users.map(user => <p key={new Date().getTime()}>{JSON.stringify(user)}</p>)}
          </div>
          : <Navigate to={'/auth'} replace={true} />
    );
};
