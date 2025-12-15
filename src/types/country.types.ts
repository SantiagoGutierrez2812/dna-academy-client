export interface Country {
    id: number;
    name: string;
    code: string;
}

export interface CountriesResponse {
    message: string;
    data: {
        countries: Country[];
    };
}
