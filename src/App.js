import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axios.Defaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";




function App() {

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Timeline</h1>}/>
          <Route exact path="/signin" render={() => <SignInForm/>}/>
          <Route exact path="/signup" render={() => <SignUpForm/>}/>
          <Route render={() => <p>Oh Oh! This page doesn't exists</p>}/>
          </Switch>
        
      </Container>
    </div>
      
  );
}

export default App;
