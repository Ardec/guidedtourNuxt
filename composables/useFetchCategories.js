export default async () => {
    const baseUrl = useBaseUrl();
    const {data, error} = await useFetch(`${baseUrl}min-categories`)

    if(error.value) {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch categories"
        })
    }

    return data;
}