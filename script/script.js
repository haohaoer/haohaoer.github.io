const loadEntities = position => [
    {
        id: '1',
        type: 'a-entity',
        name: 'マーカーA',
        url: '/model/A1.glb',
        location: {lat: position.longitude + 0.05, lng: position.longitude + 0.05},
        position: {x: 0, y: 1.5, z: 0},
        scale: {x: 30, y: 30, z: 30},
    },
]


window.onload = () => {
    const scene = document.querySelector('a-scene')

    return navigator.geolocation.getCurrentPosition(position => {
        loadEntities(position.coords).forEach((entity) => {
            let model = contributeModel(entity)
            model.setAttribute('show-introduction-on-mouseenter', '')
            scene.appendChild(model)
        })
    }, (err) => console.error('Error in retrieving position', err), {
        enableHighAccuracy: true, maximumAge: 0, timeout: 27000,
    })
}

AFRAME.registerComponent('show-introduction-on-mouseenter', {
    schema: {
        gltfModel: '/model/A2.glb',
    },

    init() {
        const data = this.data
        const el = this.el
        this.el.addEventListener('mouseenter', () => {
            console.log('mouseenter')
            el.setAttribute('gltf-model', data.gltfModel)
        })
    },
})

const contributeModel = (model) => {
    if (!(model.type === 'a-link' || model.type === 'a-entity')) throw new Error('The type must be "a-link" or "a-entity"')

    const entity = document.createElement(model.type)
    entity.setAttribute('gltf-model', model.url)
    entity.setAttribute('id', model.id)
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