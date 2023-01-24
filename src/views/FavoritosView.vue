<script setup>
import { useFavoritosStore } from "@/store/favoritos";
import { RouterLink } from "vue-router";

const useFavoritos = useFavoritosStore();
</script>

<template>
  <h1 class="title m-3">Favoritos</h1>
  <p v-if="useFavoritos.favoritos.length === 0">Sin Favoritos</p>
  <ul v-else class="list-group m-2">
    <li
      class="list-group-item"
      v-for="poke in useFavoritos.favoritos"
      :key="poke.id"
    >
      <div>
        <img :src="poke.sprites?.front_default" alt="" />
        {{ poke.name }}
      </div>
      <div>
        <button
          class="btn btn-sm btn-danger me-2"
          @click="useFavoritos.removeFavorite(poke.id)"
        >
          Eliminar
        </button>
        <router-link class="btn btn-sm btn-info" :to="`/pokemons/${poke.name}`">
          Más Información
        </router-link>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.title {
  font-family: "Mina", sans-serif;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}
.title {
  background-image: linear-gradient(135deg, #f2c511, #222f3d);
}
</style>
