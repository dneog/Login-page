import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx= useContext(AuthContext);
  const isLoggedin= authCtx.isLoggedin

  const logoutHandler=()=> {
    authCtx.logout()
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
        {!isLoggedin && (
          <li>
            <Link to='/auth'>Login</Link>
          </li>
        )}
        {isLoggedin && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          )}
          {isLoggedin && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
