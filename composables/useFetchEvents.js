export default async () => {
  const baseUrl = useBaseUrl();
  const { data, error } = await useFetch(`${baseUrl}visiting/card/events`)

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: "Unable to fetch category"
    })
  }

  return data;
}