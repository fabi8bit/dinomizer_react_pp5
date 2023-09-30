import { Container } from "react-bootstrap";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axios.Defaults";
import SignUpForm from "./pages/auth/SignUpForm";



function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/signin" render={() => <h1>Sign in</h1>}/>
          <Route exact path="/signup" render={() => <SignUpForm/>}/>
          <Route render={() => <p>Oh Oh! This page doesn't exists</p>}/>
          </Switch>
        
      </Container>
    </div>
  );
}

export default App;
