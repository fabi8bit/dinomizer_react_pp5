import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../context/CurrentUserContext";
import NavBar from "../NavBar";

test("renders link to the user profile for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText('Piggy');
  // const profileAvatar = await screen.getByRole("link", {name: "projects"} );
  expect(profileAvatar).toBeInTheDocument();
  screen.debug();
  

});


