const loadEntities = position => [
    {
        id: '1',
        type: 'a-entity',
        name: 'マーカーA',
        url: '/model/A1.glb',
        location: {lat: position.latitude + 0.1, lng: position.longitude + 0.1},
        position: {x: 0, y: 0, z: 0},
        scale: {x: 3, y: 3, z: 30},
    },
]

const contributeModel = (model) => {
    if (!(model.type === 'a-link' || model.type === 'a-entity')) throw new Error('The type must be "a-link" or "a-entity"')

    const entity = document.createElement(model.type)
    entity.setAttribute('gltf-model', model.url)
    entity.setAttribute('id', model.id)
    entity.setAttribute('title', model.name)
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

AFRAME.registerComponent('show-introduction-on-click', {
    init: function () {
        let data = this.data
        let el = this.el
        this.el.addEventListener('click', function (evt) {
            console.log(evt.detail.intersection.point);
            el.setAttribute('gltf-model', '/model/A2.glb')
        })
    }
})

window.onload = () => {
    const scene = document.querySelector('a-scene')

    return navigator.geolocation.getCurrentPosition(position => {
        loadEntities(position.coords).forEach((entity) => {
            console.log(entity)
            let model = contributeModel(entity)
            model.setAttribute('show-introduction-on-click', '')
            scene.appendChild(model)
        })
    }, (err) => console.error('Error in retrieving position', err), {
        enableHighAccuracy: true, maximumAge: 0, timeout: 27000,
    })
}
