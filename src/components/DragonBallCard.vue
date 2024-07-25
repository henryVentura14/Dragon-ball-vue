<template>
  <div class="card rounded-md">
    <div class="w-full flex justify-center items-center" :class="getColorsRace(character.race)">
      <h2 class="text-xl font-semibold">{{ character.name }} - {{ character.race }} - {{ character.gender }}</h2>
    </div>
    <div class="image-container" :class="getBackgroundEffect(character.race)">
      <img :src="character.image" :alt="character.name" class="h-96 rounded-t" />
    </div>
    <div class="text-card">
      <div class="flex items-center justify-center">
        <h3 class="text-xl font-semibold text-shadow">Ki: {{ character.ki }} - {{ character.maxKi }}</h3>
      </div>
      <div class="flex items-center justify-center">
        <span :class="getColorsAffiliation(character.affiliation)"
          class="text-xs font-medium px-2.5 py-0.5 rounded-full">{{ character.affiliation }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Character } from '../types/dragonBallType';

const affiliationColors: Record<string, string> = {
  'Z Fighter': 'bg-red-100 text-white dark:bg-red-800 dark:text-white',
  'Army of Frieza': 'bg-purple-100 text-white dark:bg-purple-800 dark:text-white',
  'Freelancer': 'bg-sky-100 text-white dark:bg-sky-800 dark:text-white',
  'Other': 'bg-cyan-100 text-white dark:bg-cyan-800 dark:text-white',
  default: 'bg-gray-100 text-white dark:bg-gray-800 dark:text-white',
};

const raceColors: Record<string, string> = {
  'Human': 'bg-red-100 text-white dark:bg-red-800 dark:text-white',
  'Frieza Race': 'bg-purple-100 text-white dark:bg-purple-800 dark:text-white',
  'Saiyan': 'bg-amber-100 text-white dark:bg-amber-800 dark:text-white',
  'Namekian': 'bg-green-100 text-white dark:bg-green-800 dark:text-white',
  'Android': 'bg-indigo-100 text-white dark:bg-indigo-800 dark:text-white',
  'Majin': 'bg-pink-100 text-white dark:bg-pink-800 dark:text-white',
  default: 'bg-gray-100 text-white dark:bg-gray-800 dark:text-white',
};

const backgroundEffects: Record<string, string> = {
  'Human': 'bg-gradient-to-r from-red-100 to-red-400',
  'Frieza Race': 'bg-gradient-to-r from-purple-100 to-purple-400',
  'Saiyan': 'bg-gradient-to-r from-amber-100 to-amber-400',
  'Namekian': 'bg-gradient-to-r from-green-100 to-green-400',
  'Android': 'bg-gradient-to-r from-indigo-100 to-indigo-400',
  'Majin': 'bg-gradient-to-r from-pink-100 to-pink-400',
  default: 'bg-gradient-to-r from-gray-100 to-gray-400',
};

export default defineComponent({
  name: 'DragonBallCard',
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true,
    },
  },
  methods: {
    getColorsAffiliation(affiliation: string): string {
      return affiliationColors[affiliation] || affiliationColors.default;
    },
    getColorsRace(race: string): string {
      return raceColors[race] || raceColors.default;
    },
    getBackgroundEffect(race: string): string {
      return backgroundEffects[race] || backgroundEffects.default;
    },
  },
});
</script>

<style scoped>
.card {
  background-color: #f9f9f9;
  color: darkgray;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 284px;
  height: 428px;
}

.card:hover {
  transform: translateY(-5px);
}

.image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 0.25rem 0.25rem 0 0;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.text-card {
  position: relative;
  top: -70px;
  color: white;
}

.text-shadow {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>
