import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
