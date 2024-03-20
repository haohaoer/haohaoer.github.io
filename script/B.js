window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [{
        name: 'sightB', location: {
            lat: 35.7011277,
            lng: 139.6993951,
        },
    }];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        scene.appendChild(contributeModelTitle(latitude, longitude));
        scene.addEventListener('click', ()=>{
            scene.appendChild(contributeModelInfo(latitude, longitude))
        });
    })
}

const contributeModelTitle = (latitude, longitude) => {
    let modelTitle = document.createElement('a-entity');
    modelTitle.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    modelTitle.setAttribute('gltf-model', '/model/B1.glb');
    modelTitle.setAttribute('position', '0 3 0');
    modelTitle.setAttribute('scale', '5 5 5');
    modelTitle.setAttribute('rotation', '0 180 0')

    modelTitle.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    });


    return modelTitle
}

const contributeModelInfo = (latitude, longitude) => {
    let modelInfo = document.createElement('a-entity');
    modelInfo.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    modelInfo.setAttribute('gltf-model', '/model/B2.glb');
    modelInfo.setAttribute('position', '0 -3 0');
    modelInfo.setAttribute('scale', '1.5 1.5 1.5');
    modelInfo.setAttribute('rotation', '0 180 0')

    return modelInfo
}