import React from 'react';
import {FirebaseDatabaseNode} from "@react-firebase/database";
import {FirebaseDatabaseNodesState} from "@react-firebase/database/dist/components/FirebaseDatabaseNodes";
import {SavedPlace} from "../types/Place";
import PlacesComponent from "../components/PlacesComponent";
import {Link} from 'react-router-dom';

const mapToArray = (values: any): SavedPlace[] =>
    Object.keys(values)
        .map(key => {
            return {
                id: key,
                ...values[key],
            } as SavedPlace
        })

function PlacesView() {
    return (
        <>
            <Link to="/places/new">New</Link>
            <h1>Places</h1>
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
                            <>
                                <PlacesComponent places={mapToArray(d.value)}/>
                            </>
                        )}
                    </>
                )}
            </FirebaseDatabaseNode>
        </>
    );
}

export default PlacesView;
