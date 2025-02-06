<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { Recipe } from "@/types/spoonacular";
import RecipeTable from "./RecipeTable.vue";

interface RecipeList extends Recipe {
  date: Date;
}

// Function to return a future date
const addDays = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Mock data
const recipes: RecipeList[] = [
  {
      id: 1, title: "test", date: addDays(1),
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      lowFodmap: false,
      weightWatcherSmartPoints: 0,
      gaps: "",
      preparationMinutes: 0,
      cookingMinutes: 0,
      aggregateLikes: 0,
      healthScore: 0,
      creditsText: "",
      license: "",
      sourceName: "",
      pricePerServing: 0,
      extendedIngredients: [],
      readyInMinutes: 0,
      servings: 0,
      sourceUrl: "",
      image: "",
      imageType: "",
      summary: "",
      cuisines: [],
      dishTypes: [],
      diets: [],
      occasions: [],
      winePairing: undefined,
      instructions: ""
  },
  {
      id: 2, title: "test2", date: addDays(1),
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      lowFodmap: false,
      weightWatcherSmartPoints: 0,
      gaps: "",
      preparationMinutes: 0,
      cookingMinutes: 0,
      aggregateLikes: 0,
      healthScore: 0,
      creditsText: "",
      license: "",
      sourceName: "",
      pricePerServing: 0,
      extendedIngredients: [],
      readyInMinutes: 0,
      servings: 0,
      sourceUrl: "",
      image: "",
      imageType: "",
      summary: "",
      cuisines: [],
      dishTypes: [],
      diets: [],
      occasions: [],
      winePairing: undefined,
      instructions: ""
  },
  {
      id: 3, title: "test3", date: addDays(-1),
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      lowFodmap: false,
      weightWatcherSmartPoints: 0,
      gaps: "",
      preparationMinutes: 0,
      cookingMinutes: 0,
      aggregateLikes: 0,
      healthScore: 0,
      creditsText: "",
      license: "",
      sourceName: "",
      pricePerServing: 0,
      extendedIngredients: [],
      readyInMinutes: 0,
      servings: 0,
      sourceUrl: "",
      image: "",
      imageType: "",
      summary: "",
      cuisines: [],
      dishTypes: [],
      diets: [],
      occasions: [],
      winePairing: undefined,
      instructions: ""
  }, // Fixed duplicate ID
];

// Function to normalize dates for consistent comparisons
const normalizeDate = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

const pastRecipes = computed(() =>
  recipes.filter((recipe) => normalizeDate(recipe.date) < normalizeDate(new Date()))
);

const futureRecipes = computed(() =>
  recipes.filter((recipe) => normalizeDate(recipe.date) >= normalizeDate(new Date()))
);

// Tab state with a dynamic default value
const tab: Ref<string> = ref(futureRecipes.value.length ? "upcoming" : "past");

// Open preview function
const openPreview = (recipe: { title: string }): void => {
  console.log(`Opening recipe ${recipe.title}`);
};
</script>

<template>
  <div v-if="pastRecipes.length === 0 && futureRecipes.length === 0">
    No recipes yet. Add some to your planner!
  </div>
  
  <div v-if="true">
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab value="past" :disabled="pastRecipes.length === 0">Past</v-tab>
      <v-tab value="upcoming" :disabled="futureRecipes.length === 0">Upcoming</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item key="past" value="past">
        <RecipeTable
          :recipes="pastRecipes"
          title="Past recipes"
          removable
          @openPreview="openPreview"
        />
      </v-window-item>

      <v-window-item key="upcoming" value="upcoming">
        <RecipeTable
          :recipes="futureRecipes"
          title="Upcoming recipes"
          @openPreview="openPreview"
        />
      </v-window-item>
    </v-window>
  </div>
</template>
