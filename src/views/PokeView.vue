<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGetData } from "@/composables/getData";
import { usePokeStore } from "@/store/pokeStore";
import { useFavoritosStore } from "@/store/favoritos";

const { getData, loading, error } = useGetData();

const route = useRoute();
const router = useRouter();
const pokeStore = usePokeStore();
const useFavoritos = useFavoritosStore();
const pokeInfo = ref(null);
const pokeDescription = ref({
  spanishDescription: "Desconocido",
  englishDescription: "Unknown",
});
const languageDescriptionIndex = ref(8);
const languageDescription = ref("englishDescription");
const isFavorite = ref(false);

if (window.localStorage.getItem("pokemons")) {
  const data = JSON.parse(window.localStorage.getItem("pokemons"));

  pokeStore.pokeList = data;
}

const pokeName = route.params.name;

if (window.localStorage.getItem("favoritos")) {
  const data = JSON.parse(window.localStorage.getItem("favoritos"));

  isFavorite.value = data.some((x) => x.name === pokeName);
}

pokeInfo.value = pokeStore.pokeList.filter((poke) => poke.name == pokeName);

const pokeTitle = route.params.name.toUpperCase();

const url = `https://pokeapi.co/api/v2/pokemon-species/${pokeName}`;

const back = () => {
  router.push("/pokemons");
};

const changeLanguage = (language) => {
  if (language === "spanish") {
    languageDescription.value = "spanishDescription";
    languageDescriptionIndex.value = 42;
  }

  if (language === "english") {
    languageDescription.value = "englishDescription";
    languageDescriptionIndex.value = 8;
  }
};

const getAbilitiesDescription = async () => {
  for (let i = 0; i < pokeInfo.value[0].abilities.length; i++) {
    const res = await getData(pokeInfo.value[0].abilities[i].ability.url);

    let spanishDescription = "Desconocido";
    let englishDescription = "Unknown";

    for (let j = 0; j < res.flavor_text_entries.length; j++) {
      const element = res.flavor_text_entries[j];

      if (element.language.name === "es") {
        spanishDescription = element.flavor_text;
        pokeInfo.value[0].abilities[i].spanishDescription = spanishDescription;
      }

      if (element.language.name === "en") {
        englishDescription = element.flavor_text;
        pokeInfo.value[0].abilities[i].englishDescription = englishDescription;
      }

      if (
        spanishDescription != "Desconocido" &&
        spanishDescription != "Unknown"
      )
        j = res.flavor_text_entries.length;
    }
  }
};

const getPokeDescription = async () => {
  const data = await getData(url);

  for (let i = 0; i < data.flavor_text_entries.length; i++) {
    const element = data.flavor_text_entries[i];

    if (element.language.name == "es") {
      pokeDescription.value.spanishDescription = element.flavor_text;
    }
    if (element.language.name == "en")
      pokeDescription.value.englishDescription = element.flavor_text;

    if (
      pokeDescription.value.englishDescription != "Unknown" &&
      pokeDescription.value.spanishDescription != "Desconocido"
    )
      i = data.flavor_text_entries.length;
  }
};

const getPokeInfo = async () => {
  if (pokeInfo.value.length === 0) {
    const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    const data = await getData(pokeUrl);
    pokeInfo.value = [data];
  }
};

const handleFavorite = async () => {
  isFavorite.value = !isFavorite.value;

  if (isFavorite.value === true) {
    const pokeFav = {
      id: pokeInfo.value[0].id,
      sprites: pokeInfo.value[0].sprites,
      name: pokeInfo.value[0].name,
    };
    // await useFavoritos.addFavorite(pokeInfo.value[0]);
    await useFavoritos.addFavorite(pokeFav);
  }

  if (isFavorite.value === false) {
    await useFavoritos.removeFavorite(pokeInfo.value[0].id);
  }
};

onMounted(async () => {
  await getPokeInfo();
  await getPokeDescription();
  await getAbilitiesDescription();
});
</script>

<template>
  <div class="container-fluid">
    <!-- Loader -->
    <div class="spinner-grow text-info" role="status" v-if="loading">
      <span class="visually-hidden">Loading...</span>
    </div>

    <!-- Errors -->
    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <!-- Titles -->
    <header class="d-flex justify-content-center align-items-center">
      <h1 class="display-5 m-2 title">{{ pokeTitle }}</h1>
      <font-awesome-icon
        v-if="!isFavorite"
        icon="fa-regular fa-star"
        class="fs-2 icon"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Favorite"
        style="color: black"
        v-bind="isFavorite"
        @click="handleFavorite()"
      />
      <font-awesome-icon
        v-else
        icon="fa-solid fa-star"
        class="fs-2 icon"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="No Favorite"
        style="color: gold"
        @click="handleFavorite()"
      />
    </header>

    <!-- Carousel -->
    <div
      v-if="pokeInfo.length != 0"
      id="carouselExampleControls"
      class="carousel .carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            :src="pokeInfo[0].sprites?.other.dream_world.front_default"
            class="w-25"
            alt="Imagen de un pokemon"
          />
        </div>
        <div class="carousel-item">
          <img
            :src="pokeInfo[0].sprites?.other.home.front_default"
            class="w-25"
            alt="Imagen de un pokemon"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev bg-dark"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next bg-dark"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- Description -->
    <p v-if="pokeDescription != null" class="fs-3">
      {{ pokeDescription[languageDescription] }}
    </p>

    <!-- Habilities -->
    <h2 class="display-6 m-2 subtitle">ABILITIES</h2>
    <div class="accordion" id="accordionAbilites" v-if="pokeInfo.length != 0">
      <div class="accordion-item" v-for="ability in pokeInfo[0].abilities">
        <h2 class="accordion-header" :id="`heading${ability.ability.name}`">
          <button
            class="accordion-button collapsed subtitle"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse${ability.ability.name}`"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            {{ ability.ability.name }}
          </button>
        </h2>
        <div
          :id="`collapse${ability.ability.name}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`heading${ability.ability.name}`"
          data-bs-parent="#accordionAbilites"
        >
          <div class="accordion-body">
            {{ ability[languageDescription] }}
          </div>
        </div>
      </div>
    </div>

    <!-- buttons -->
    <footer class="flex justify-center m-4">
      <button type="button" @click="back" class="btn btn-outline-primary m-2">
        GO BACK
      </button>

      <button
        type="button"
        @click="changeLanguage('spanish')"
        class="btn btn-outline-primary m-2"
      >
        SPANISH
      </button>
      <button
        type="button"
        @click="changeLanguage('english')"
        class="btn btn-outline-primary m-2"
      >
        ENGLISH
      </button>
    </footer>
  </div>
</template>

<style scoped>
.title,
.subtitle {
  font-family: "Mina", sans-serif;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.title {
  background-image: linear-gradient(135deg, #f2c511, #222f3d);
}

.subtitle {
  background-image: linear-gradient(135deg, #42d392, #647eff);
  font-weight: bold;
}

/* favorite */
.icon {
  cursor: pointer;
}

label {
  /* Presentation */
  font-size: 48px;
}

/* Required Styling */

label input[type="checkbox"] {
  display: none;
}

.custom-checkbox {
  margin-left: 2em;
  position: relative;
  cursor: pointer;
}

.custom-checkbox .fontIcon {
  color: gold;
  position: absolute;
  top: 0.4em;
  left: -1.25em;
  font-size: 0.75em;
}

.custom-checkbox .fa-regular fa-star {
  color: gray;
}

.custom-checkbox .fa-solid fa-star {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.custom-checkbox:hover .fa-solid fa-star {
  opacity: 0.5;
}

.custom-checkbox input[type="checkbox"]:checked ~ .fa-solid fa-star {
  opacity: 1;
}
</style>
