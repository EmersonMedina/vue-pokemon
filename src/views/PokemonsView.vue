
<script setup>
    import { RouterLink } from 'vue-router';
    import { useGetData} from '@/composables/getData'

    const { data, getData, loading, error} = useGetData();

    getData('https://pokeapi.co/api/v2/pokemon');

</script>

<template>
    <h1> I'm in the pokemon's view</h1>
    <p v-if="loading">CARGANDO INFORMACIÓN...</p>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div v-if="data">
        <ul class="list-group mb-2">
            <li
            v-for="pokemon in data.results" 
            :key="pokemon.name"
            class="list-group-item"
            >
            <RouterLink :to="`/pokemons/${pokemon.name}`"> {{ pokemon.name.toUpperCase() }} </RouterLink>
            </li>
        </ul>
        <div class="mt-3 mb-3">
            <button :disabled="!data.previous" class="bnt btn-warning me-2" @click="getData(data.previous)">Previous</button>
            <button :disabled="!data.next" class="bnt btn-success" @click="getData(data.next)">Next</button>
        </div>
    </div>
</template>

<style>

</style>