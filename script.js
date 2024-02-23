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
    });
}

const contributeModelTitle = (latitude, longitude) => {
    let modelTitle = document.createElement('a-entity');
    modelTitle.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    modelTitle.setAttribute('gltf-model', './chigusadai31.glb');
    modelTitle.setAttribute('position', '0 10 0');
    modelTitle.setAttribute('scale', '30 30 30');

    modelTitle.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    });

    scene.addEventListener('click', ()=>{
        scene.appendChild(contributeModelInfo(latitude, longitude))
    })

    return modelTitle
}

const contributeModelInfo = (latitude, longitude) => {
    let modelInfo = document.createElement('a-entity');
    modelInfo.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    modelInfo.setAttribute('gltf-model', './chigusadai32.glb');
    modelInfo.setAttribute('position', '0 -20 0');
    modelInfo.setAttribute('scale', '30 30 30');

    return modelInfo
}