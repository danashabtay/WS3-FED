import React, { useEffect, useState } from 'react';
import './main-page.css';
import { AuthApi } from '../../api/authApi';
import { Loader } from '../loader/loader';
import { APIStatus, PageProps } from '../../types';
import { ErrorMessage } from '../error/error';

export const MainPage: React.FC<PageProps> = ({ navigateToLoginPage }) => {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGetUsername = async () => {
    setIsLoading(true);
    const res = await AuthApi.getUserName();
    setIsLoading(false);
    if (typeof res === 'string') {
      setUsername(res);
    }
    else {
      navigateToLoginPage();
    }
  };

  const onLogout = async () => {
    setIsLoading(true);
    const res = await AuthApi.logout();
    setIsLoading(false);
    if (res === APIStatus.Success) {
      navigateToLoginPage();
      return;
    }
    setErrorMessage('Failed to logout, please try again');
  }
  useEffect(() => {
    handleGetUsername();
  }, []);

  return (
    <div className="main-page-container">
      {isLoading
        ? <Loader />
        : <>
          <h2>Hello, {username}</h2>
          <button onClick={onLogout}>Logout</button>
        </>
      }
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
