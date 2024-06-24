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
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 1.5, y: 1.5, z: 1.5 },
    rotation: { x: 0, y: 180, z: 0 },
}

const introAttribute = {
    position: { x: 0, y: -6, z: 0 },
    scale: { x: 2.5, y: 2.5, z: 2.5 },
    rotation: titleAttribute.rotation,
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
    titleAttribute.rotation.y += 30

    document.querySelectorAll('#model-title').forEach(title => title.setAttribute('rotation', titleAttribute.rotation))
    document.querySelectorAll('#model-intro').forEach(intro => intro.setAttribute('rotation', titleAttribute.rotation))
}

const onClickRotationRight = () => {
    titleAttribute.rotation.y -= 30

    document.querySelectorAll('#model-title').forEach(title => title.setAttribute('rotation', titleAttribute.rotation))
    document.querySelectorAll('#model-intro').forEach(intro => intro.setAttribute('rotation', titleAttribute.rotation))
}

const onClickScaleBig = () => {
    Object.keys(titleAttribute.scale).forEach((k) => titleAttribute.scale[k] += 0.2)
    document.querySelectorAll('#model-title').forEach(title => title.setAttribute('scale', titleAttribute.scale))

    Object.keys(introAttribute.scale).forEach((k) => introAttribute.scale[k] += 0.1)
    document.querySelectorAll('#model-intro').forEach(intro => intro.setAttribute('scale', introAttribute.scale))
}

const onClickScaleSmall = () => {
    Object.keys(titleAttribute.scale).forEach((k) => titleAttribute.scale[k] -= 0.2)
    document.querySelectorAll('#model-title').forEach(title => title.setAttribute('scale', titleAttribute.scale))

    Object.keys(introAttribute.scale).forEach((k) => introAttribute.scale[k] -= 0.1)
    document.querySelectorAll('#model-intro').forEach(intro => intro.setAttribute('scale', introAttribute.scale))
}

const contributeModelPin = (name, latitude, longitude, titlePath, introPath) => {
    let modelPin = document.createElement('a-entity')
    modelPin.setAttribute('id', 'PIN')
    modelPin.setAttribute('name', name)
    modelPin.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelPin.setAttribute('gltf-model', '/model/pin.glb')
    modelPin.setAttribute('position', '0 6 0')
    modelPin.setAttribute('scale', '1.5 1.5 1.5')
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
