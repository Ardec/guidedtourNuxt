export default async (id) => {
    const baseUrl = useBaseUrl();
    const {data, error} = await useFetch(`${baseUrl}group/${id}/visiting-cards/`)

    if(error.value) {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch group"
        })
    }

    return data;
}