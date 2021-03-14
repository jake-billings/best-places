import React from 'react';
import './App.css';
import {FirebaseDatabaseNode, FirebaseDatabaseProvider} from "@react-firebase/database";
import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import {FirebaseDatabaseNodesState} from "@react-firebase/database/dist/components/FirebaseDatabaseNodes";
import {Place} from "./types/Place";
import PlaceComponent from "./components/PlaceComponent";

function App() {
    return (
        <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
            <FirebaseDatabaseNode
                path="/places"
                limitToFirst={5}
                orderByValue={"name"}
            >
                {(d: FirebaseDatabaseNodesState) => (
                    <>
                        {!(!d.isLoading && d.value) && (
                            <>
                                <h1>Loading...</h1>
                            </>
                        )}
                        {!d.isLoading && d.value && (d.value as unknown as [Place]).map((place, index) => (
                            <div  key={index}>
                                <PlaceComponent place={place}/>
                            </div>
                        ))}
                    </>
                )}
            </FirebaseDatabaseNode>
        </FirebaseDatabaseProvider>
    );
}

export default App;
