export default async (id) => {
    const baseUrl = useBaseUrl();
    const {data, error} = await useFetch(`${baseUrl}sub/category/${id}`)

    if(error.value) {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch subcategory"
        })
    }

    return data;
}