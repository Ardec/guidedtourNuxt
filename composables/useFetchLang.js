export default async () => {
    const baseUrl = useBaseUrl();
    const {data, error} = await useFetch(`${baseUrl}language/domestic/`)

    if(error.value) {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch lang"
        })
    }
    return data.value.data.domesticLanguage;
}