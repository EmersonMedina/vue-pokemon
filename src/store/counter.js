import { defineStore } from "pinia";
import { ref, computed } from "vue"

//Composition API
export const useCounterStore = defineStore("counter", () => {
    const count = ref(0)

    const increment = () => count.value ++

    //No modifica la variable reactiva sino que solo la esta mostrando trasformada
    const double = computed(() => count.value * 2);
    return { 
        count, 
        increment, 
        double
    }
})

// Options API
// export const useCounterStore = defineStore("counter", {
    
//     state: () => ({
//         count: 0,
//     }),
    
//     actions: {
//         increment() {
//             this.count += 1;
//         }
//     }, 
//     getters: {
//         double:(state) => state.count * 2 
//     }
// })