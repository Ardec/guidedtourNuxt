export default async (id) => {
  const baseUrl = useBaseUrl();
  const { data, error } = await useFetch(`${baseUrl}visiting/card/${id}`)

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: "Unable to fetch card"
    })
  }

  //fetch data for connected cards
  const requestForConnectedCard = data.value.data?.visitingCard?.connectedVisitingCards?.map(item =>
     $fetch(`${baseUrl}visiting/card/${item.visitingCardId}`)
  );

  const cardsResponse = await Promise.allSettled(requestForConnectedCard);

  cardsResponse?.forEach(connectedResponse => {
    if (connectedResponse?.status === 'rejected') {
      console.error(
        connectedResponse.reason?.message,
        "Unable to fetch connected card"
      )
    } else {
      let el = data.value.data?.visitingCard?.connectedVisitingCards.find(
        item => item.visitingCardId === connectedResponse.value?.data?.visitingCard.id)
      if (el) {
        el.card = connectedResponse.value?.data?.visitingCard;
      }
    }
  });
  //finish fetch

  return data;
}