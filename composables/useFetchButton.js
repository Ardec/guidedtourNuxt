export default async (id) => {
    const baseUrl = useBaseUrl();
    const {data, error} = await useFetch(`${baseUrl}button/${id}`)

    if(error.value) {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch button"
        })
    }

    return data;
}