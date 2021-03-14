import React from 'react';
import './App.css';
import {FirebaseDatabaseProvider} from "@react-firebase/database";
import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import PlacesView from "./views/PlacesView";

function App() {
    return (
        <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
            <Router>
                <Switch>
                    <Route exact path="/places" component={PlacesView} />
                    <Redirect to="/places" />
                </Switch>
            </Router>
        </FirebaseDatabaseProvider>
    );
}

export default App;
