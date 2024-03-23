window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    let url = new URL(window.location.href)
    let params = url.searchParams
    return [{
        name: 'sightA', location: {
            lat: params.get('latitude') ? params.get('latitude') : 35.7014561,
            lng: params.get('longitude') ? params.get('longitude') : 139.7003657,
        },
    }];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        scene.appendChild(contributeModelTitle(latitude, longitude));
    })
}

const onClickIntroductionAR = () => {
    let scene = document.querySelector('a-scene');
    const location = staticLoadPlaces().find(place => place.name === 'sightA').location
    scene.appendChild(contributeModelInfo(location.lat, location.lng))
}

const onClickIntroductionWindow = () => {
    alert("モチーフの天使は町の象徴で、\n「少しでも明るい光を照らすことができれば」\nとの願いが込められています。")
}

const contributeModelTitle = (latitude, longitude) => {
    let modelTitle = document.createElement('a-entity');
    modelTitle.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    modelTitle.setAttribute('gltf-model', '/model/A1.glb');
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
    modelInfo.setAttribute('gltf-model', '/model/A2.glb');
    modelInfo.setAttribute('position', '0 -3 0');
    modelInfo.setAttribute('scale', '1.5 1.5 1.5');
    modelInfo.setAttribute('rotation', '0 180 0')
    modelInfo.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })

    return modelInfo
}