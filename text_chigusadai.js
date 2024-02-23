window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'Magnemite',
           location: {
               lat: 35.5374048,
               lng: 139.5355570,
           }
       },
   ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-text');
        model.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('value', 'This content will always face you');
        model.setAttribute('look-at', '[gps-new-camera]');
        model.setAttribute('scale', '50 50 50');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}
