import React from 'react';
import './App.css';
import {FirebaseDatabaseNode, FirebaseDatabaseProvider} from "@react-firebase/database";
import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import {FirebaseDatabaseNodesState} from "@react-firebase/database/dist/components/FirebaseDatabaseNodes";
import {Place} from "./types/Place";

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
                            <div key={index}>
                                <h2>{place.name}</h2>

                                <p>{place.city}</p>
                                <p>{place.category}</p>

                                <p>{place.address}</p>

                                <p>{place.tips}</p>

                                <a href={`https://www.google.com/maps/search/?api=1&query=${place.address}&query_place_id=${place.googleMapsPlaceId}`}>Google Maps</a>
                            </div>
                        ))}
                    </>
                )}
            </FirebaseDatabaseNode>
        </FirebaseDatabaseProvider>
    );
}

export default App;
