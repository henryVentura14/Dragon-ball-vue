<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      <span class="font-left">Drag<span class="o">o</span>n</span> 
      <span class="font-right">Ball</span>
      <span class="white-outline"><span class="z">Z</span></span>
    </h1>
    <div class="mb-4 flex space-x-2">
      <input v-model="searchQuery" @input="fetchCharactersData" type="text"
        placeholder="Search by name, race or affiliation..." 
        class="p-2 border border-gray-300 rounded w-full" />
    </div>
    <DragonBallList :characters="isSearching ? characters : allCharacters" />
    <div ref="scrollObserver" class="observer"></div>
    <button v-if="!isLoading" @click="loadMoreCharacters" class="load-more-btn">Load More</button>
    <div v-if="isLoading" class="loading">Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import DragonBallList from './components/DragonBallList.vue';
import { fetchCharactersWithPagination, fetchAllCharactersWithPagination } from './api/dragonBallApi';
import { Character } from './types/dragonBallType';

export default defineComponent({
  name: 'App',
  components: {
    DragonBallList,
  },
  setup() {
    const searchQuery = ref('');
    const characters = ref<Character[]>([]);
    const allCharacters = ref<Character[]>([]);
    const page = ref(1);
    const limit = 10;
    const isLoading = ref(false);
    const isSearching = ref(false);
    const scrollObserver = ref<HTMLElement | null>(null);

    const fetchCharactersData = async () => {
      const query = searchQuery.value.trim().toLowerCase();
      if (query) {
        isSearching.value = true;
        try {
          isLoading.value = true;
          const data = await fetchCharactersWithPagination('name', query, page.value, limit);
          characters.value = page.value === 1 ? data : [...characters.value, ...data];
          if (characters.value.length === 0) {
            isSearching.value = false;
          }
          isLoading.value = false;
        } catch (error) {
          console.error('Error fetching characters:', error);
          isLoading.value = false;
        }
      } else {
        isSearching.value = false;
        fetchAllCharactersData();
      }
    };

    const fetchAllCharactersData = async () => {
      try {
        isLoading.value = true;
        const data = await fetchAllCharactersWithPagination(page.value, limit);
        allCharacters.value = page.value === 1 ? data : [...allCharacters.value, ...data];
        isLoading.value = false;
      } catch (error) {
        console.error('Error fetching all characters:', error);
        isLoading.value = false;
      }
    };

    const loadMoreCharacters = () => {
      page.value += 1;
      fetchCharactersData();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading.value) {
          loadMoreCharacters();
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    onMounted(() => {
      if (scrollObserver.value) {
        observer.observe(scrollObserver.value);
      }
      fetchAllCharactersData();
    });

    watch(searchQuery, () => {
      page.value = 1;
      characters.value = [];
      fetchCharactersData();
    });

    return { searchQuery, characters, allCharacters, isSearching, isLoading, scrollObserver, loadMoreCharacters, fetchCharactersData };
  },
});
</script>

<style scoped>
.font-right {
  font-family: "saiyanSansRight";
  color: red;
  font-size: 48px;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.font-left {
  font-family: "saiyanSansLeft";
  color: yellow;
  font-size: 48px;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.o {
  color: orange;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.z {
  font-family: "saiyanSans";
  margin-left: 4px;
  font-size: 96px;
  color: red;
  position: relative;
  top: 10px;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}

.observer {
  height: 1px;
}

.load-more-btn {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #ffcc00;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.loading {
  margin-top: 16px;
  font-weight: bold;
  text-align: center;
}
</style>
