export default async () => {
    const baseUrl = useBaseUrl();
    const { data, error } = await useFetch(`${baseUrl}main-page/`)

    if (error.value) {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch main page"
        })
    }

    return data;
}