<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-light bg-dark navbar-dark sticky-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img
          src="@/assets/pokeball.svg"
          alt=""
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        PokeAPI
      </router-link>
      <div>
        <router-link class="btn btn-success me-2" to="/pokemons">
          Pokemons
        </router-link>
        <router-link class="btn btn-warning" to="/favoritos">
          Favoritos
        </router-link>
      </div>
    </div>
  </nav>
  <div class="container text-center">
    <RouterView />
  </div>
</template>
