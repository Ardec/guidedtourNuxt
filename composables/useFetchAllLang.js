export default async () => {
    const baseUrl = useBaseUrl();
    const {data, error} = await useFetch(`${baseUrl}language/`)

    if(error.value) {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch all lang"
        })
    }
    console.log(data)
    return data.value.data.addresses;
}