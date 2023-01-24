import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritosStore = defineStore("favoritos", () => {
  const favoritos = ref([]);

  if (localStorage.getItem("favoritos")) {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos"));
  }

  const addFavorite = (poke) => {
    favoritos.value.push(poke);
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };

  const removeFavorite = (id) => {
    favoritos.value = favoritos.value.filter((element) => element.id != id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  };

  const findPoke = (name) => favoritos.value.find((item) => item.name === name);

  return {
    favoritos,
    addFavorite,
    removeFavorite,
    findPoke,
  };
});
