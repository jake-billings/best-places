import React from 'react'
import {SavedPlace} from "../types/Place"
import PlaceComponent from "../components/PlaceComponent"
import {Link} from "react-router-dom";

function PlacesComponent({places}: { places: SavedPlace[] }) {
    return (
        <>
            {places.map((place, index) => (
                <div key={index}>
                    <PlaceComponent place={place}/>
                    <br/>
                    <Link to={`/places/${place.id}`}>Edit</Link>
                </div>
            ))}
        </>
    )
}

export default PlacesComponent