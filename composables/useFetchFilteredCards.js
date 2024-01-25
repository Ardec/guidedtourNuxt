export default async (filters, localisationTags, restOfTags) => {
  const baseUrl = useBaseUrl();
  const { data, error } = await useFetch(`${baseUrl}filtered/visiting/card/`, {
    method: 'POST',
    body: {
      categoryId: null,
      subCategoryId: null,
      buttonId: null,
      name: null,
      isOpenNow: null,
      isOpenToday: null,
      isOpenTomorow: null,
      isOpenSaturaday: null,
      isOpenSunday: null,
      promoOpenNow: null,
      promoOpenToday: null,
      promoOpenTomorow: null,
      promoOpenThisWeek: null,
      promoOpenThisMonth: null,
      promoOpenNextMonth: null,
      startAt: null,
      endAt: null,
      localisationTags: null,
      restofTags: null,
      lattitude: null,
      longtitude: null,
      distance: null,
      localisationTags: localisationTags && localisationTags.length > 0 ? localisationTags?.filter((t => t.value)).map(t => t.name) : [],
      restofTags: restOfTags && restOfTags.length > 0 ? restOfTags?.filter((t => t.value)).map(t => t.name) : [],
      ...filters
    }
  })

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: "Unable to fetch filtered cards"
    })
  }

  return data;
}