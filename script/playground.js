const STATIC_PLACES = [
    {
        name: 'sightA',
        location: [35.538381890918494, 139.53549068386437],
        modelPath: { title: '/model/Atitle.glb', intro: '/model/Aintro.glb' },
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
        const { name, location, modelPath } = place
        const [latitude, longitude] = location

        scene.appendChild(contributeModelPin(name, latitude, longitude, modelPath.title, modelPath.intro))
        scene.appendChild(contributeModelTitle(latitude, longitude, place.modelPath.title))
    })
}

const onClickIntroductionAR = () => {
    const modelIntroList = document.querySelectorAll('#model-intro')
    if (modelIntroList.length === 0) {
        const scene = document.querySelector('a-scene')
        STATIC_PLACES.forEach(place => {
            const { location, modelPath } = place
            const [latitude, longitude] = location
            scene.appendChild(contributeModelIntro(latitude, longitude, modelPath.intro))
        })
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
    Object.keys(titleAttribute.scale).forEach((k) => titleAttribute.scale[k] *= 0.9)
    titleAttribute.position.y *= 0.85
    document.querySelectorAll('#model-title').forEach((title) => {
        title.setAttribute('scale', titleAttribute.scale)
        title.setAttribute('position', titleAttribute.position)
    })

    Object.keys(introAttribute.scale).forEach((k) => introAttribute.scale[k] *= 0.9)
    document.querySelectorAll('#model-intro').forEach((intro) => {
        intro.setAttribute('scale', introAttribute.scale)
    })
}

const contributeModelPin = (name, latitude, longitude, titlePath, introPath) => {
    let modelPin = document.createElement('a-entity')
    modelPin.setAttribute('id', 'PIN')
    modelPin.setAttribute('name', name)
    modelPin.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelPin.setAttribute('gltf-model', '/model/pin.glb')
    modelPin.setAttribute('position', '0 6 0')
    modelPin.setAttribute('scale', '1 1 1')
    modelPin.setAttribute('titlePath', titlePath)
    modelPin.setAttribute('introPath', introPath)

    return modelPin
}

const contributeModelTitle = (latitude, longitude, modelPath) => {
    const { position, scale, rotation } = titleAttribute
    let modelTitle = document.createElement('a-entity')
    modelTitle.setAttribute('id', 'model-title')
    modelTitle.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelTitle.setAttribute('gltf-model', modelPath)
    modelTitle.setAttribute('position', position)
    modelTitle.setAttribute('scale', scale)
    modelTitle.setAttribute('rotation', rotation)

    return modelTitle
}

const contributeModelIntro = (latitude, longitude, modelPath) => {
    const { position, scale, rotation } = introAttribute

    let modelIntro = document.createElement('a-entity')
    modelIntro.setAttribute('id', 'model-intro')
    modelIntro.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelIntro.setAttribute('gltf-model', modelPath)
    modelIntro.setAttribute('position', position)
    modelIntro.setAttribute('scale', scale)
    modelIntro.setAttribute('rotation', rotation)

    return modelIntro
}
