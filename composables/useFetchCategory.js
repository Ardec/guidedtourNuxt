export default async (id) => {
    const baseUrl = useBaseUrl();
    const {data, error} = await useFetch(`${baseUrl}category/${id}`)

    if(error.value) {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch category"
        })
    }

    return data;
}