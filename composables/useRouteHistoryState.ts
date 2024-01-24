export const useRouteHistoryState = () => {
  const history = useState('quideTourRouteHistory', () => {
    const h: { label: any, to: string }[] = [];
    return h;
  });

  const addToHistory = (label: any, to: string) => {
    if (!history.value.length || history.value[history.value.length - 1].to !== to) {
      history.value.push({ label, to })
    }
  };

  return { history, addToHistory };
};
