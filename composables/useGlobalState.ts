export const useGlobalState = () => {
    const menuVisible = useState('menuVisible', () => false);

    const toggleMenu = () => {
        menuVisible.value = !menuVisible.value;
    };

    // Możesz dodać tutaj więcej stanów i funkcji, jeśli potrzebujesz

    return { menuVisible, toggleMenu };
};