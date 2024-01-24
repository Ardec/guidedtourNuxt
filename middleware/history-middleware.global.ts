export default defineNuxtRouteMiddleware((to, from) => {
  const { addToHistory, history } = useRouteHistoryState();
  if (to.path === '/') {
    addToHistory('Home', to.path)
  } else {
    addToHistory(to.params?.itemname ? to.params?.itemname : to.name ? to.name.toString()[0].toUpperCase() + to.name.toString().slice(1) : '', to.path)
  }
})