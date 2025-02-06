<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import type { Recipe } from "@/types/spoonacular";
import { useRecipeInformation } from "@/composables/recipeApi";
import AppLoader from "./AppLoader.vue";

// Define props
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  activePanel: {
    type: Number,
    default: 0,
  },
});

// Reactive state for the recipe
const recipe: Ref<Recipe | null> = ref(null);
const panel = ref<number | null>(1);

// Function to fetch recipe details
const getRecipeDetails = async (id: number): Promise<void> => {
  console.log("Fetching recipe for ID:", id); 

  try {
    const data = await useRecipeInformation(id.toString()) as Recipe;
    console.log("Received Data:", data); 

    recipe.value = data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
};

// Fetch the recipe when the component is mounted
onMounted(() => {
  getRecipeDetails(props.id);
});
</script>

<template>
  <AppLoader v-if="!recipe" />
  <v-container v-else fluid>
    <v-col>
      <!-- Recipe Image -->
      <v-img height="200" :src="recipe.image" cover v-if="recipe.image" />
      
      <!-- Recipe Title -->
      <h1 class="text-h3 ma-4">{{ recipe.title }}</h1>
      
      <!-- Recipe Cuisines -->
      <v-chip
        class="ma-2 my-4"
        color="primary"
        v-for="cuisine in recipe.cuisines"
        :key="cuisine"
      >
        {{ cuisine }}
      </v-chip>

      <!-- Recipe Details (Summary & Instructions) -->
      <v-expansion-panels variant="accordion" v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-title class="text-h5">Summary</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-html="recipe.summary" class="text-body-1"></div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title class="text-h5">Instructions</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-html="recipe.instructions" class="text-body-1"></div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-container>
</template>
