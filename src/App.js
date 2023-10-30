import React from "react";
import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axios.Defaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import LoggedOutPage from "./pages/auth/LoggedOutPage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProjectCreateForm from "./pages/projects/ProjectCreateForm";
import ProjectPage from "./pages/projects/ProjectPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectEditForm from "./pages/projects/ProjectEditForm";
import AssetCreateForm from "./pages/assets/AssetCreateForm";
import AssetPage from "./pages/assets/AssetPage";
import AssetsPage from "./pages/assets/AssetsPage";
import AssetEditForm from "./pages/assets/AssetEditForm";
import NotFound from "./components/NotFound";

function App() {

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <ProjectsPage timelinePage />}
          />
          <Route
            exact
            path="/projects"
            render={() => (
              <ProjectsPage
                myProjects
                smImg
              />
            )}
          />
          
          <Route
            exact
            path="/signin"
            render={() => <SignInForm />}
          />
          <Route
            exact
            path="/signup"
            render={() => <SignUpForm />}
          />
          <Route
            exact
            path="/profiles/:id"
            render={() => <ProfilePage />}
          />
          <Route
            
            path="/loggedout"
            render={() => <LoggedOutPage />}
          />
          
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
          exact
            path="/projects/create/"
            render={() => <ProjectCreateForm />}
          />
          <Route
            exact
            path="/projects/:id"
            render={() => <ProjectPage />}
          />
          <Route
            exact
            path="/projects/:id/edit"
            render={() => <ProjectEditForm />}
          />
          <Route
            exact
            path="/assets/create"
            render={() => <AssetCreateForm />}
          />
          <Route
            exact
            path="/assets/:id"
            render={() => <AssetPage />}
          />
          <Route
            exact
            path="/assets/:id/edit"
            render={() => <AssetEditForm />}
          />
          <Route
            exact
            path="/assets/"
            render={() => <AssetsPage myContribute />}
          />

          <Route render={() => <NotFound/>}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
