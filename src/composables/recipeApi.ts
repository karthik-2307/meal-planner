import type { SearchRecipe, Recipe } from '@/types/spoonacular';

const apiKey = "0ece3113d7be46a0ac3c08d8d19301a3"; // ⚠️ Replace with your actual Spoonacular API key
const RECIPE_API = "https://api.spoonacular.com";

/**
 * Generic function to fetch data from Spoonacular API
 */
export const useFetch = async (path: string, params: Record<string, string> = {}): Promise<any> => {
    try {
        // Construct query parameters
        const queryString = new URLSearchParams({ ...params, apiKey }).toString();
        const requestURI = `${RECIPE_API}/${path}?${queryString}&includeNutrition=true`;

        console.log(`Fetching: ${requestURI}`); // Debugging log

        const res = await fetch(requestURI);

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`API Error: ${res.status} ${res.statusText} - ${errorText}`);
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Fetch error:", error.message);
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
};

/**
 * Searches for recipes
 */
export const useRecipeSearch = async (query: string): Promise<SearchRecipe> => {
    try {
        return await useFetch('recipes/complexSearch', { query }) as SearchRecipe;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Recipe search failed:", error.message);
        }
        throw new Error("An error occurred while searching for recipes");
    }
};

/**
 * Fetches detailed information about a recipe
 */
export const useRecipeInformation = async (id: string): Promise<Recipe> => {
    try {
        return await useFetch(`recipes/${id}/information`, { includeNutrition: "true" }) as Recipe;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Failed to retrieve recipe information:", error.message);
        }
        throw new Error("An error occurred while retrieving recipe information");
    }
};
