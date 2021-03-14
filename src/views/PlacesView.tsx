import React from 'react';
import {FirebaseDatabaseNode} from "@react-firebase/database";
import {FirebaseDatabaseNodesState} from "@react-firebase/database/dist/components/FirebaseDatabaseNodes";
import {Place} from "../types/Place";
import PlacesComponent from "../components/PlacesComponent";

function PlacesView() {
    return (
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
                        {!d.isLoading && d.value && (
                            <PlacesComponent places={d.value as unknown as [Place]}/>
                        )}
                    </>
                )}
            </FirebaseDatabaseNode>
    );
}

export default PlacesView;
