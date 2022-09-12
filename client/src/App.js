import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Entrevista from "./pages/Entrevista/Index";
import Layout from "./components/Layout";
function App() {
    return (
        // <Router>
        <Layout>
            {/* <Switch>
                     <Route path="/Entrevista"> */}
            <Entrevista />
            {/* </Route>
                 </Switch> */}
        </Layout>
        // </Router>
    );
}

export default App;
