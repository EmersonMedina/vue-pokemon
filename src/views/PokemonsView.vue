<script setup>
import { useGetData } from "@/composables/getData";
import { usePokeStore } from "@/store/pokeStore";
import PokeCard from "../components/PokeCard.vue";
import { onMounted, ref } from "vue";

const { error } = useGetData();
const pokeStore = usePokeStore();

const startIn = ref(1);
const pokeLimit = ref(20);

if (window.localStorage.getItem("startIn")) {
  const data = JSON.parse(window.localStorage.getItem("startIn"));
  startIn.value = data.startIn;
}

const nextPage = () => {
  startIn.value += 19;
  window.localStorage.setItem(
    "startIn",
    JSON.stringify({ startIn: startIn.value })
  );
  pokeStore.getPokeList(startIn.value, startIn.value + pokeLimit.value);
};

const previousPage = () => {
  startIn.value -= 19;
  window.localStorage.setItem(
    "startIn",
    JSON.stringify({ startIn: startIn.value })
  );
  pokeStore.getPokeList(startIn.value, startIn.value + pokeLimit.value);
};

onMounted(async () => {
  await pokeStore.getPokeList(startIn.value, startIn.value + pokeLimit.value);
});
</script>

<template>
  <h1 style="margin: 0.5rem" class="title">Pokemon's view</h1>
  <div class="alert alert-danger" v-if="error">{{ error }}</div>

  <div class="container">
    <div
      class="spinner-grow text-info"
      role="status"
      v-if="pokeStore.isLoadingPokemons"
    >
      <span class="visually-hidden">Loading...</span>
    </div>

    <div
      class="row justify-content-center gap-2"
      v-if="!pokeStore.isLoadingPokemons"
    >
      <PokeCard
        v-for="pokemon in pokeStore.pokeList"
        :pokemon="pokemon"
        class="col-12 col-md-4"
      >
      </PokeCard>
      <div class="m-3">
        <button
          type="button"
          :disabled="startIn === 1"
          class="btn btn-success me-3"
          @click="previousPage"
        >
          Previous Page
        </button>
        <button
          :disabled="startIn + pokeLimit >= 1008"
          type="button"
          class="btn btn-primary"
          @click="nextPage"
        >
          Next Page
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: "Mina", sans-serif;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(135deg, #f2c511, #222f3d);
}
</style>
