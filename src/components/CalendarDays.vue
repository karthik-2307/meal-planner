<script setup lang="ts">
import { ref } from "vue";
import CalendarCard from "@/components/CalendarCard.vue";
import type { Ref } from "vue";
import RecipeSearch from "@/components/RecipeSearch.vue";
import type { RecipeResults } from "@/types/spoonacular";
 interface Today {
  id: number;
  title: string;
  readyInMinutes: number;
 }
const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  days: {
    type: Number,
    required: false,
    default: 7,
  },
});

interface Card {
  date: Date;
  content: string;
  today:Today[],
}

const generateCards = (startDate: Date, numberOfDays: number): Card[] => {
  const cards: Card[] = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(currentDate.getTime());
    const content = `Card ${i + 1};`
    cards.push({
      date, content,
      today: []
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return cards;
};
const cards = ref<Card[]>(generateCards(props.date, props.days));
  const dialogVisible: Ref<boolean> = ref(false);
    const dateSelected: Ref<Date | null> = ref(null);
      const recipeDialogOpen = (card: Card): void => {
  dateSelected.value = card.date;
  dialogVisible.value = true;
 };
 const recipeDialogClose = (): void => {
  dateSelected.value = null;
  dialogVisible.value = false;
 };
 const removeRecipeFromDay = (recipe: { id: number }, date: Date): void => {
  cards.value = cards.value.map((card) => {
    if (card.date.getTime() === date.getTime()) {
      return {
        ...card,
        today: card.today.filter((today) => today.id !== recipe.id),
      };
    }
    return card;
  });
 };
 const insertRecipeOnDay = (recipe: RecipeResults): void => {
  if (dateSelected.value) {
    cards.value = cards.value.map((card) => {
      if (card.date.toISOString() === dateSelected.value?.toISOString()) {
        return { 
          ...card, 
          today: [...card.today, { 
            id: recipe.id, 
            title: recipe.title, 
            readyInMinutes: recipe.readyInMinutes ?? 0 // Ensuring a default number
          }] 
        };
      }
      return card;
    });
    recipeDialogClose();
  }
};

</script>
<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Upcoming days</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="card in cards" :key="card.date.toString()">
          <td class="py-4">
            <calendar-card :card="card" @daySelected="recipeDialogOpen"  
@recipeRemoved="removeRecipeFromDay" />
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog v-model="dialogVisible" scrollable>
    <v-card>
      <v-card-title> Search for a recipe to add to this day </v-card-title>
      <recipe-search @recipeSelected="insertRecipeOnDay" />
      <v-card-actions>
        <v-btn color="primary" block @click="recipeDialogClose"
          >Close Dialog</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
   </template>