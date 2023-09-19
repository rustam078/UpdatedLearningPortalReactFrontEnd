import classes from './Header.module.css';
import { loadPopup } from '../utils/LoginUtils';
import  logo from '../images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser } from '../store/LoginService';
import { signout,signoutFromServer } from '../store/LoginService';

const pages = [
  {
    pageName: 'Home',
    pageUrl: "home",
    roles: ["ADMIN", "ADMINW", "SUPER_ADMIN", "USER", "USERW", "REVIEWER_R", "REVIEWER_RW"]

  }, {
    pageName: 'add Task',
    pageUrl: "addTask",
    roles: ["ADMIN", "ADMINW", "SUPER_ADMIN", "USER"]
  },
  {
    pageName: 'view Task',
    pageUrl: "viewTask",
    roles: ["ADMIN", "ADMINW", "SUPER_ADMIN", "USER"]
  }, {
    pageName: 'edit Task',
    pageUrl: "editTask",
    roles: ["ADMIN", "ADMINW", "SUPER_ADMIN", "REVIEWER_R", 'REVIEWER_RW']
  }, {
    pageName: 'delete Task',
    pageUrl: "deleteTask",
    roles: ["ADMIN", "ADMINW", "SUPER_ADMIN", "REVIEWER_R", 'REVIEWER_RW']
  }
];
const Header = () => {
  const navigate=useNavigate();
  const user=getUser();

  

  const handleSignout = () => {
    signoutFromServer().then(response => {
      signout();
      navigate("/");
    }).catch(err => {
      console.log('error catched while signoutFromServer', err);
      signout();
      navigate("/");
      if (err.status === undefined)
        loadPopup('Ugh! Server down');
      else
        loadPopup(err.message);
    })
  }

  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" className={classes.imglogo}/>
     <>
     {user && user.email&&<h1>{user.email}</h1>}
        <nav>
          <ul>
          { pages.map((page, index) => (
                    <span key={page.pageName + index}>
                      {
                        user && user.roles && page.roles.some(role => user.roles.some(userRole => userRole === role)) &&
                        <li>   
            <NavLink to={page.pageUrl}
            className={({ isActive}) =>isActive ?classes.active_link : ""}
            >
              {page.pageName}
      </NavLink>
            </li>
}
</span>
          ))
}
<li>
{user && user.roles&&
              <button onClick={handleSignout}>Logout</button>
}
            </li>
          </ul>
        </nav>
        </>
    </header>
  );
};

export default Header;
