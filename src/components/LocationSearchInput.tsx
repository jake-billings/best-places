import {useState} from "react"
import {Location} from "../types/Location"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

type Props = {
    initialValue: Location | null
    onChange: (location: Location | null) => void
    googleMapsSearchOptions: any
    inverse?: boolean
}

type State = {
    address: string
}

export default function LocationSearchInput({
                                                initialValue,
                                                onChange,
                                                googleMapsSearchOptions,
                                                inverse,
                                            }: Props): JSX.Element {
    const [address, setAddress] = useState(initialValue?.address)

    const handleChange = (a: string): void => {
        setAddress(a)
        onChange(null)
    }

    const handleSelect = (a: string): void => {
        setAddress(a)

        geocodeByAddress(a)
            .then((results) => {
                return results[0].place_id
            })
            .then((googleMapsPlaceId) => {
                const location: Location = {
                    address: a,
                    googleMapsPlaceId,
                }

                onChange(location)
            })
            .catch((error: string) => {
                console.error('Error geocoding address', error)
                onChange(null)
            })
    }

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
            searchOptions={googleMapsSearchOptions}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }): JSX.Element => (
                <>
                <input
                        {...getInputProps({
                            placeholder: 'Search Places like Novo Coffee...',
                        })}
                    />
                    {(loading || suggestions.length > 0) && (
                        <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, index) => (
                                <div {...getSuggestionItemProps(suggestion)} key={index} >
                                    {suggestion.description}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </PlacesAutocomplete>
    )
}