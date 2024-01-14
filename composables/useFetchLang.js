export default async () => {
  if (process.client) {
    if (localStorage.getItem("lang")) {
      return JSON.parse(localStorage.getItem("lang"));
    } else {
      const baseUrl = useBaseUrl();
      const { data, error } = await useFetch(`${baseUrl}language/domestic/`)

      if (error.value) {
        throw createError({
          ...error.value,
          statusMessage: "Unable to fetch lang"
        })
      }
      localStorage.setItem('lang', JSON.stringify(data.value.data.domesticLanguage));
      return data.value.data.domesticLanguage;
    }
  }
}