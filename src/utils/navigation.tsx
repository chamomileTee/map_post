import { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction;

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

export const redirectToLogin = () => {
  if (navigate) {
    navigate('/login');
  } else {
    window.location.href = '/login';
  }
};