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





function App() {



  return (
    <div className={styles.App}>
      <NavBar />
      
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Timeline</h1>}/>
          <Route exact path="/signin" render={() => <SignInForm/>}/>
          <Route exact path="/signup" render={() => <SignUpForm/>}/>
          <Route exact path="/loggedout" render={() => <LoggedOutPage/>}/>
          <Route exact path="/profiles/:id" render={() => <ProfilePage />}/>
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />}/>
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
          <Route exact path="/projects/create" render={() => <ProjectCreateForm/>}/>
          <Route render={() => <h1>Oh Oh! This page doesn't exists</h1>}/>
        </Switch>
      </Container>
    </div>
      
  );
}

export default App;
