<template>
  <div>
    <div v-if="characters.length === 0" class="text-center">
      No characters found.
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DragonBallCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DragonBallCard from './DragonBallCard.vue';
import { Character } from '../types/dragonBallType';

export default defineComponent({
  name: 'DragonBallList',
  props: {
    characters: {
      type: Array as PropType<Character[]>,
      required: true,
    },
  },
  components: {
    DragonBallCard,
  },
});
</script>
