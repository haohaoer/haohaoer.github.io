window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [{
        name: 'chigusadai', location: {
            lat: 35.5374048, lng: 139.5355570,
        },
    }];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        scene.appendChild(contributeModelTitle(latitude, longitude));
        scene.appendChild(contributeModelInfo(latitude, longitude));
    });
}

const contributeModelTitle = (latitude, longitude) => {
    let model1 = document.createElement('a-entity');
    model1.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    model1.setAttribute('gltf-model', './chigusadai31.glb');
    model1.setAttribute('position', '0 10 0');
    model1.setAttribute('scale', '30 30 30');

    model1.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    });

    return model1
}

const contributeModelInfo = (latitude, longitude) => {
    let model2 = document.createElement('a-entity');
    model2.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    model2.setAttribute('gltf-model', './chigusadai32.glb');
    model2.setAttribute('position', '0 -20 0');
    model2.setAttribute('scale', '30 30 30');

    return model2
}