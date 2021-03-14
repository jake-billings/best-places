export enum PlaceCategory {
    COFFEE='coffee',
    FOOD='food',
    VIEW='view',
    HOTEL='hotel'
}

export class Place {
    name: string = ''
    city?: string
    category?: PlaceCategory

    address?: string
    googleMapsPlaceId?: string

    tips?: string
}
