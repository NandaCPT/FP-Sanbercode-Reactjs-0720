import React, { useContext } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import MovieHome from "./page/movie/MovieHome";
import GameHome from "./page/game/GameHome";
import MovieForm from "./page/movie/MovieForm";
import MovieInfo from "./page/movie/MovieInfo";
import MovieTable from "./page/movie/MovieTable";
import MovieCreate from "./page/movie/MovieCreate";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import { UserContext } from "./context/UserContext";
import GameInfo from "./page/game/GameInfo";
import GameForm from "./page/game/GameForm";
import GameCreate from "./page/game/GameCreate";
import GameTable from "./page/game/GameTable";
import ChangePassword from "./page/ChangePassword";
import Footer from "./layout/Footer";

const Routes = () => {
  const [user] = useContext(UserContext);

  const PrivateRoute = ({ user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({ user, ...props }) =>
    user ? <Redirect to="/" /> : <Route {...props} />;

  return (
    <>
      <section>
        <Switch>
          <Route path="/gamehome" user={user} component={GameHome}></Route>
          <Route path="/gametable" user={user} component={GameTable}></Route>
          <Route path="/gameinfo/:id" user={user} component={GameInfo}></Route>
          <Route
            user={user}
            exact
            path="/gamesearch/:id"
            render={(props) => (
              <GameInfo currentPage="Search Results" {...props} />
            )}
          />
          <PrivateRoute
            path="/gameform"
            user={user}
            component={GameForm}
          ></PrivateRoute>
          <PrivateRoute
            path="/gamecreate"
            user={user}
            component={GameCreate}
          ></PrivateRoute>
          <PrivateRoute
            path="/movieform"
            user={user}
            component={MovieForm}
          ></PrivateRoute>
          <PrivateRoute
            path="/moviecreate"
            user={user}
            component={MovieCreate}
          ></PrivateRoute>
          <Route
            path="/movieinfo/:id"
            user={user}
            component={MovieInfo}
          ></Route>
          <Route path="/movietable" user={user} component={MovieTable}></Route>
          <LoginRoute path="/login" user={user} component={Login} />
          <Route path="/signup" user={user} component={SignUp} />
          <Route
            user={user}
            exact
            path="/moviesearch/:id"
            render={(props) => (
              <MovieInfo currentPage="Search Results" {...props} />
            )}
          />
          <PrivateRoute
            path="/changepass/:id"
            user={user}
            component={ChangePassword}
          ></PrivateRoute>
          <Route path="/" user={user} component={MovieHome} />
        </Switch>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Routes;
