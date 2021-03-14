import React from 'react'
import {Place} from "../types/Place"
import PlaceComponent from "../components/PlaceComponent"

function PlacesComponent({places}: { places: [Place] }) {
    return (
        <>
            {places.map((place, index) => (
                <div key={index}>
                    <PlaceComponent place={place}/>
                </div>
            ))}
        </>
    )
}

export default PlacesComponent