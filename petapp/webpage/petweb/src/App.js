import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import Router from "./componentes/Router";

class App extends Component {
  render() {
    return (
      <Container>
        <Router />
      </Container>
    );
  }
}

export default App;
