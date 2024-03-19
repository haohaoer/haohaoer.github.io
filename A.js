window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'chigusadai',
           location: {
               lat: 35.5374048,
               lng: 139.5355570,
//               lat: 35.7014561,
//               lng: 139.7003657,
           }
       },
   ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model1 = document.createElement('a-entity');
        model1.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model1.setAttribute('gltf-model', './A1.glb');
        model1.setAttribute('position', '0 10 0');
        model1.setAttribute('scale', '20 20 20');

        model1.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
        });

        let model2 = document.createElement('a-entity');
        model2.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model2.setAttribute('gltf-model', './A2.glb');
        model2.setAttribute('position', '0 -10 0');
        model2.setAttribute('scale', '10 10 10');

        scene.appendChild(model1);
        scene.appendChild(model2);
    });
}

