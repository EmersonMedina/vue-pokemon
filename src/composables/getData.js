import { ref, watch } from "vue";
import axios from "axios";

export const useGetData = () => {
  const loading = ref(true);
  const error = ref(null);

  const getData = async (url) => {
    loading.value = true;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      console.error(e);
      error.value = "Error de servidor";
    } finally {
      loading.value = false;
    }
  };

  return {
    getData,
    loading,
    error,
  };
};
