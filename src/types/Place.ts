import {Location, validateLocation} from "./Location";

export enum PlaceCategory {
    COFFEE='coffee',
    FOOD='food',
    VIEW='view',
    HOTEL='hotel'
}

export const ALL_PLACE_CATEGORIES = Object.values(PlaceCategory)

export function nameForPlaceCategory(placeCategory: PlaceCategory) {
    switch (placeCategory) {
        case PlaceCategory.COFFEE:
            return 'Coffee'
        case PlaceCategory.FOOD:
            return 'Food'
        case PlaceCategory.HOTEL:
            return 'Hotel'
        case PlaceCategory.VIEW:
            return 'View'
        default:
            throw new Error(`Invalid PlaceCategory: ${placeCategory}`)
    }
}

export type Place = {
    name: string
    city: string
    category: PlaceCategory | null

    location: Location

    tips: string
}

export interface SavedPlace extends Place {
    id: string
}

export function validatePlace(place: Place) {
    if (place.name === '') return 'Name is required.'
    if (place.city === '') return 'City is required.'
    if (place.category === null) return 'Category is required.'

    const locationValidation = validateLocation(place.location)
    if (locationValidation) return locationValidation

    return false
}
