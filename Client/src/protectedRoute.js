import React from "react";
import { Redirect, Route } from "react-router-dom";
import Calendar from "./Client/components/Calendar";
import Favourite from "./Client/components/favourites";
import Organizers from "./Client/components/organizers";
import DashboardClient from "./pages/Dashboard/Client/DashboardClient";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("roles");
  console.log("this", isAuthenticated);

  return (
    <div>
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? (
            isAuthenticated === "admin" ? (
              <Component {...props} />
            ) : (
              <Calendar />
            )
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? (
            isAuthenticated === "admin" ? (
              <Component {...props} />
            ) : (
              <Organizers />
            )
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? (
            isAuthenticated === "admin" ? (
              <Component {...props} />
            ) : (
              <Favourite />
            )
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </div>
  );
}

export default ProtectedRoute;
