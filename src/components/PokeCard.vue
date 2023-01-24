<script setup>
import { useGetData } from "@/composables/getData";
import { ref, watch, onMounted } from "vue";

const { data, getData, getPokeInfo, pokeInfo, loading, error } = useGetData();

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card" style="width: 18rem">
    <img
      :src="props.pokemon.sprites?.other.dream_world.front_default"
      alt="Imagen de un pokemon"
    />
    <div class="card-body">
      <h5 class="card-title">{{ props.pokemon.name }}</h5>
      <ul class="list-group mb-2">
        <li
          class="list-group-item d-flex justify-content-between align-items-start"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">Experience</div>
          </div>
          <span class="badge bg-primary rounded-pill">{{
            props.pokemon.base_experience
          }}</span>
        </li>
        <li
          class="list-group-item d-flex justify-content-between align-items-start"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">Attack</div>
          </div>
          <span class="badge bg-success rounded-pill">{{
            props.pokemon.stats[1].base_stat
          }}</span>
        </li>
        <li
          class="list-group-item d-flex justify-content-between align-items-start"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">Defense</div>
          </div>
          <span class="badge bg-danger rounded-pill">{{
            props.pokemon.stats[2].base_stat
          }}</span>
        </li>
      </ul>
      <RouterLink
        class="btn btn-primary"
        :to="`/pokemons/${props.pokemon.name}`"
      >
        More info
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
