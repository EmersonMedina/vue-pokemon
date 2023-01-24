import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePokeStore = defineStore("pokemons", () => {
  const pokeList = ref([]);
  const isLoadingPokemons = ref(false);

  const getPokeList = async (start, quantity) => {
    const newData = [];
    isLoadingPokemons.value = true;
    for (let i = start; i < quantity; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const { data } = await axios.get(url);
      newData.push(data);
    }
    pokeList.value = newData;

    window.localStorage.setItem("pokemons", JSON.stringify(pokeList.value));

    isLoadingPokemons.value = false;
  };

  return {
    pokeList,
    isLoadingPokemons,
    getPokeList,
  };
});
