<script setup>
    import { useRoute, useRouter } from "vue-router";
    import { useGetData} from '@/composables/getData'
    import { useFavoritosStore } from '@/store/favoritos'
    
    const { data, getData, loading, error } = useGetData();

    const route = useRoute();
    const router = useRouter();

    const useFavoritos = useFavoritosStore();

    const { add, findPoke } = useFavoritos; 
    
    const pokeName = route.params.name; 
    
    const back = () => {
        router.push('/pokemons');
    }   

    getData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
</script>

<template>
    <p v-if="loading">CARGANDO INFORMACIÓN...</p>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <div v-if="data">
        <img :src="data.sprites?.front_default" alt="">
        <h1> Poke name: {{ $route.params.name }} </h1>
        <button :disabled="findPoke(data.name)" class="btn btn-outline-primary mb-2" @click="add(data)"> Agregar Favoritos </button>
    </div>

    <h1 v-else> Pokemon Inexistente </h1>
    
    <button type="button" @click="back" class="btn btn-outline-primary">Volver</button>
</template>


<style>

</style>