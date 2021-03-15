import React, {ChangeEvent, useState} from 'react'
import {ALL_PLACE_CATEGORIES, nameForPlaceCategory, Place} from "../types/Place"
import Select from 'react-select'
import LocationSearchInput from "./LocationSearchInput";

type Props = {
    initialValue: Place | null
    onChange: (place: Place) => void
}

const defaultPlace: Place = {
    name: '',
    city: '',
    category: null,

    location: {
        address: '',
        googleMapsPlaceId: '',
    },

    tips: '',
}

const categoryOptions = ALL_PLACE_CATEGORIES.map(placeCategory => {
    return {
        value: placeCategory,
        label: nameForPlaceCategory(placeCategory)
    }
})

export default function PlaceInput({initialValue, onChange}: Props): JSX.Element {
    const [place, setPlace] = useState(initialValue || defaultPlace)

    const updateField = (fieldName: string) => (val: any): void => {
        setPlace((h) => {
            const newState = {...h} as any
            newState[fieldName] = val
            onChange(newState)
            return newState
        });
    };

    const onUpdateField = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>): void => {
        const val = e?.target?.value
        if (val === undefined || val === null) return;
        setPlace((h) => {
            const newState = {...h} as any
            newState[fieldName] = val
            onChange(newState)
            return newState
        });
    };

    return (
        <>
            <input
                type="text"
                placeholder="Name"
                value={place.name}
                onChange={onUpdateField('name')}
            />
            <br/>
            <input
                type="text"
                placeholder="City"
                value={place.city}
                onChange={onUpdateField('city')}
            />
            <br/>
            <Select
                options={categoryOptions}
                value={categoryOptions.filter(option => option.value === place.category)}
                isMulti={false}
                onChange={(option) => {
                    if (option) {
                        updateField('category')(option.value)
                    }
                }}
            />
            <br/>
            <LocationSearchInput
                initialValue={place.location}
                onChange={updateField('location')}
                googleMapsSearchOptions={{}}
            />
            <br/>
            <input
                type="text"
                placeholder="Tips"
                value={place.tips}
                onChange={onUpdateField('tips')}
            />
            <br/>
        </>
    )
}
