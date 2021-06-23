import logo from "../images/logo.svg";

import { useContext } from "react";
import AuthUserContext from "./../context/AuthUserContext";

const Header = ({ logout }) => {
  const user = useContext(AuthUserContext);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {user && user.email ? (
        <>
          <div style={{ color: "white" }}>{user.email}</div>
          <div>
            <button type="button" onClick={logout}>
              Выйти
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
