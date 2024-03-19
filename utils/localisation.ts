export const askForLocation = (setPosition: (position: GeolocationPosition) => {}) => {

  const errorPosition = (error: GeolocationPositionError) => {
    console.warn('Nie udalo sie pobrac pozycji');
    if (error?.code !== 3) {
      console.warn(error);
      console.warn('Nie udalo sie pobrac pozycji');
    }
  };

  if (
    navigator.permissions != undefined &&
    navigator.permissions &&
    typeof navigator.permissions.query === 'function'
  ) {
    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      if (permissionStatus.state === 'granted') {
        // Użytkownik udzielił zgody, możemy śledzić lokalizację
        navigator.geolocation.watchPosition(setPosition, errorPosition, { timeout: 3000 });
        //geoPerm = true;
        localStorage.setItem('geo_perm', 'true');
      } else if (permissionStatus.state === 'prompt') {
        // Użytkownik jeszcze nie udzielił zgody, wyświetlamy prośbę o zgodę tylko raz
        navigator.geolocation.getCurrentPosition(setPosition, errorPosition);
        navigator.geolocation.watchPosition(setPosition, errorPosition, { timeout: 3000 });
        // Zapisujemy informację w localStorage, że użytkownik nie udzielił zgody
        localStorage.setItem('geo_perm', 'false');
        //geoPerm = false;
      } else {
        // Użytkownik nie udzielił zgody, wyświetlamy komunikat
        alert(
          'Location access denied. Some features related to maps in this application may not work. Please check if your device and browser allow geolocation.'
        );
        // Zapisujemy informację w localStorage, że użytkownik nie udzielił zgody
        localStorage.setItem('geo_perm', 'false');
        //geoPerm = false;
      }
    });
  } else {
    // Jeśli navigator.permissions lub navigator.permissions.query nie istnieją, po prostu próbujemy uzyskać lokalizację
    navigator.geolocation.getCurrentPosition(setPosition, errorPosition);
  }
};