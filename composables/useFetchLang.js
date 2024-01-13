export default async () => {

  if (process.client && localStorage.getItem("lang")) {
    return localStorage.getItem("lang");
  } else {
    const baseUrl = useBaseUrl();
    const { data, error } = await useFetch(`${baseUrl}language/domestic/`)

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: "Unable to fetch lang"
      })
    }
    return data.value.data.domesticLanguage;
  }


}