import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserData,
  loginUser,
  getIsAuthenticated,
  getUserRequest
} from '@slices';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const user = useSelector(getUserData);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const request = useSelector(getUserRequest);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  if (request) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
