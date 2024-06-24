const STATIC_PLACES = [
    {
        name: 'sightA',
        location: [35.538381890918494, 139.53549068386437],
        modelPath: { title: '/model/ATitle.glb', intro: '/model/Aintro.glb' },
    },
    {
        name: 'sightP',
        location: [35.53808780830659, 139.53594306780633],
        modelPath: { title: '/model/PTitle.glb', intro: '/model/PInfo.glb' },
    },
    {
        name: 'sightQ',
        location: [35.537843081395046, 139.53493215396958],
        modelPath: { title: '/model/QTitle.glb', intro: '/model/QInfo.glb' },
    },
    {
        name: 'parking',
        location: [35.53862867269785, 139.53458086141129],
        modelPath: { title: '/model/RTitle.glb', intro: '/model/RInfo.glb' },
    },
]

const SHOW_SIGHT_TITLE_AND_INTRO_DISTANCE = 15

// 所有的 modelTitle 共用同样的设定
// modelTitle 仅经纬度及模型不同
const titleAttribute = {
    position: { x: 0, y: 3, z: 0 },
    scale: { x: 2, y: 2, z: 2 },
    rotation: { x: 0, y: 180, z: 0 },
}

const introAttribute = {
    position: { x: 0, y: -3, z: 0 },
    scale: { x: 5, y: 5, z: 5 },
    rotation: { x: 0, y: 180, z: 0 },
}

window.onload = () => {
    let scene = document.querySelector('a-scene')

    STATIC_PLACES.forEach((place) => {
        const [latitude, longitude] = place.location

        scene.appendChild(contributeModelPin(latitude, longitude))
        scene.appendChild(contributeModelTitle(latitude, longitude, place.modelPath.title))
    })
}

const onClickIntroductionAR = () => {
    const modelIntroList = document.querySelectorAll('#model-intro')
    if (modelIntroList.length === 0) {
        const scene = document.querySelector('a-scene')
        STATIC_PLACES.forEach(place => scene.appendChild(contributeModelIntro(place.location[0], place.location[1], place.modelPath.intro)))
    } else {
        modelIntroList.forEach(modelIntro => modelIntro.remove())
    }
}

const onClickRotationLeft = () => {
    const sightA = document.querySelector('#sightA')
    const sightAIntroduction = document.querySelector('#sightA-introduction')

    const rotation = sightA.getAttribute('rotation')
    rotation.y += 30

    sightA.setAttribute('rotation', rotation)
    sightAIntroduction?.setAttribute('rotation', rotation)
}

const onClickRotationRight = () => {
    const sightA = document.querySelector('#sightA')
    const sightAIntroduction = document.querySelector('#sightA-introduction')

    const rotation = sightA.getAttribute('rotation')
    rotation.y -= 30

    sightA.setAttribute('rotation', rotation)
    sightAIntroduction?.setAttribute('rotation', rotation)
}

const onClickScaleBig = () => {
    const sightA = document.querySelector('#sightA')
    const sightAIntroduction = document.querySelector('#sightA-introduction')

    const scale = sightA.getAttribute('scale')
    const position = sightA.getAttribute('position')
    scale.x = scale.x * 1.1
    scale.y = scale.y * 1.1
    scale.z = scale.z * 1.1
    position.y = position.y * 1.15

    sightA.setAttribute('scale', scale)
    sightA.setAttribute('position', position)
    sightAIntroduction?.setAttribute('scale', scale)
}

const onClickScaleSmall = () => {
    const sightA = document.querySelector('#sightA')
    const sightAIntroduction = document.querySelector('#sightA-introduction')

    const scale = sightA.getAttribute('scale')
    const position = sightA.getAttribute('position')
    scale.x = scale.x * 0.9
    scale.y = scale.y * 0.9
    scale.z = scale.z * 0.9
    position.y = position.y * 0.85

    sightA.setAttribute('scale', scale)
    sightA.setAttribute('position', position)
    sightAIntroduction?.setAttribute('scale', scale)
}

const contributeModelPin = (latitude, longitude, modelPath = '/model/pin.glb') => {
    let modelPin = document.createElement('a-entity')
    modelPin.setAttribute('id', 'PIN')
    modelPin.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelPin.setAttribute('gltf-model', modelPath)
    modelPin.setAttribute('position', '0 6 0')
    modelPin.setAttribute('scale', '1 1 1')
    return modelPin
}

const contributeModelTitle = (latitude, longitude, modelPath) => {
    let modelTitle = document.createElement('a-entity')
    modelTitle.setAttribute('id', 'model-title')
    modelTitle.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)

    modelTitle.addEventListener('gps-entity-place-update-position', (event) => {
        const { position, scale, rotation } = titleAttribute

        if (event.detail.distance <= SHOW_SIGHT_TITLE_AND_INTRO_DISTANCE) {
            modelTitle.setAttribute('gltf-model', modelPath)
            modelTitle.setAttribute('position', position)
            modelTitle.setAttribute('scale', scale)
            modelTitle.setAttribute('rotation', rotation)
        } else {
            modelTitle.removeAttribute('gltf-model')
            modelTitle.removeAttribute('position')
            modelTitle.removeAttribute('scale')
            modelTitle.removeAttribute('rotation')
        }
    })
    return modelTitle
}

const contributeModelIntro = (latitude, longitude, modelPath) => {
    let modelIntro = document.createElement('a-entity')
    modelIntro.setAttribute('id', 'model-intro')
    modelIntro.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)

    modelIntro.addEventListener('gps-entity-place-update-position', (event) => {
        const { position, scale, rotation } = introAttribute

        if (event.detail.distance <= SHOW_SIGHT_TITLE_AND_INTRO_DISTANCE) {
            modelIntro.setAttribute('gltf-model', modelPath)
            modelIntro.setAttribute('position', position)
            modelIntro.setAttribute('scale', scale)
            modelIntro.setAttribute('rotation', rotation)
        } else {
            modelIntro.removeAttribute('gltf-model')
            modelIntro.removeAttribute('position')
            modelIntro.removeAttribute('scale')
            modelIntro.removeAttribute('rotation')
        }
    })
    return modelIntro
}
