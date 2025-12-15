import { API_URL } from "./api";
import type { Country, CountriesResponse } from "../types/country.types";

export async function getCountries(): Promise<Country[]> {
    const response = await fetch(`${API_URL}/countries`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener países");
    }

    const data: CountriesResponse = await response.json();
    return data.data.countries;
}
