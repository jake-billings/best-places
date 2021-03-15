export type Location = {
    address: string
    googleMapsPlaceId: string
}

export function validateLocation(location: Location) {
    if (location.address === '') return 'Address is required.'
    return false
}
