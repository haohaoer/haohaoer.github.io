const loadEntities = position => [
    {
        type: 'a-link',
        name: '現在地のマーカー',
        location: {lat: position.latitude, lng: position.longitude},
        scale: {x: 10, y: 10, z: 10},
    }, {
        type: 'a-link',
        name: '近辺マーカー1',
        location: {lat: position.longitude + 0.05, lng: position.longitude + 0.05},
        position: {x: 5, y: 1, z: 15},
        scale: {x: 30, y: 30, z: 30},
    }, {
        type: 'a-link',
        name: '近辺マーカー2',
        location: {lat: position.longitude + 0.05, lng: position.longitude - 0.05},
        scale: {x: 15, y: 15, z: 15},
    }, {
        type: 'a-link',
        name: '近辺マーカー3',
        location: {lat: position.longitude - 0.05, lng: position.longitude + 0.05},
        scale: {x: 15, y: 15, z: 15},
        rotation: {x: 0, y: 0, z: 180},
    }, {
        type: 'a-link',
        name: '近辺マーカー4',
        location: {lat: position.longitude - 0.05, lng: position.longitude - 0.05},
        scale: {x: 15, y: 15, z: 15},
    },
]


window.onload = () => {
    const scene = document.querySelector('a-scene')

    return navigator.geolocation.getCurrentPosition(position => {

        const entities = loadEntities(position.coords)
        entities.forEach((entity) => {
            scene.appendChild(contributeModel(entity))
        })
    }, (err) => console.error('Error in retrieving position', err), {
        enableHighAccuracy: true, maximumAge: 0, timeout: 27000,
    })
}

const contributeModel = (model) => {
    if (!(model.type === 'a-link' || model.type === 'a-entity')) throw new Error('The type must be "a-link" or "a-entity"')

    const entity = document.createElement(model.type)
    entity.setAttribute('gltf-model', model.url)
    entity.setAttribute('title', model.title)
    entity.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')))

    setModel(model, entity)
    return entity
}

const setModel = (model, entity) => {
    if (model.location) entity.setAttribute('gps-new-entity-place', `latitude: ${model.location.lat}; longitude: ${model.location.lng};`)
    if (model.position) entity.setAttribute('position', `${model.position.x} ${model.position.y} ${model.position.z}`)
    if (model.scale) entity.setAttribute('scale', `${model.scale.x} ${model.scale.y} ${model.scale.z}`)
    if (model.rotation) entity.setAttribute('rotation', `${model.rotation.x} ${model.rotation.y} ${model.rotation.z}`)
}