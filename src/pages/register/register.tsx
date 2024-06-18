import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUser,
  getUserRequest,
  getUserSuccess,
  getIsAuthenticated
} from '@slices';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const request = useSelector(getUserRequest);
  const isRegisterSuccess = useSelector(getUserSuccess);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email,
        name: userName,
        password
      })
    );
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  if (isRegisterSuccess) {
    return <Navigate to='/login' />;
  }

  if (request) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
