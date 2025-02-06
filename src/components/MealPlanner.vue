<script setup  lang="ts">
import CalendarDays from './CalendarDays.vue';
</script>
<template>
   <calendar-days :date="new Date()" :days="7" />
</template>