import { API } from '@sanctuaryteam/shared';
import React, { useEffect, useState } from 'react';
import { AuthContext } from './auth.context';
import { useLazyFetchUserInfoQuery } from '../../store/api.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { authLogout, setAuthToken } from '../../store/slices/auth';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const [
    getUserInfo,
    { data: userInfo },
  ] = useLazyFetchUserInfoQuery();

  useEffect(() => {
    // Check if a JWT token is stored in localStorage
    const token = localStorage.getItem('jwtToken');
    if (token && !userInfo) {
      // Dispatch the login success action to update the Redux store with the token
      dispatch(setAuthToken(token));
      getUserInfo();
    }
  }, [dispatch]);

  useEffect(() => {
    if (token && !userInfo) {
      getUserInfo();
    }
  }, [token])

  const value = React.useMemo<AuthContext>(() => {
    return {
      user,
      login: () => {
        // navigate('/auth/discord');
        // @todo: Needs to be in the context of a router, so use another redirect method, or do this differently.
      },
      logout: () => {
        dispatch(authLogout())
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
