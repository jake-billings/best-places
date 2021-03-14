import React from 'react';
import {Place} from "../types/Place";

function PlaceComponent({place}: {place: Place}) {
    return (
        <>
            <h2>{place.name}</h2>
            <p>{place.city}</p>
            <p>{place.category}</p>
            <p>{place.address}</p>
            <p>{place.tips}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${place.address}&query_place_id=${place.googleMapsPlaceId}`}>Google
                Maps</a>
        </>
    );
}

export default PlaceComponent;
