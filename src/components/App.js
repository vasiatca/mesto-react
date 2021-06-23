import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import AuthApi from "./../utils/AuthApi";

import Footer from "./Footer";
import Header from "./Header";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

import ProtectedRoute from "./ProtectedRoute";
// import InfoTooltip from "./InfoTooltip";

import AuthUserContext from "./../context/AuthUserContext";

const App = () => {
  const history = useHistory();
  const [authUser, setAuthUser] = useState({});

  const logout = () => {
    localStorage.removeItem("token");
    setAuthUser({});
    history.push("/sign-in");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthApi.getUser();

        setAuthUser(response ? response.data : {});
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthUserContext.Provider value={authUser}>
      <div className="App">
        <div className="page">
          <Header logout={logout} />
          <Switch>
            <Route path="/sign-in">
              <Login setUser={setAuthUser} />
            </Route>
            <Route path="/sign-up">
              <Register />
            </Route>
            <ProtectedRoute path="/">
              <Home />
            </ProtectedRoute>
          </Switch>
          <Footer />
        </div>
      </div>
    </AuthUserContext.Provider>
  );
};

export default App;
