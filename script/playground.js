const STATIC_PLACES = [
    {
        name: 'sightP',
        location: [35.70888196929828, 139.7207199067327],
        modelPath: { title: '/model/PTitle.glb', intro: '/model/PInfo.glb' },
    },
    {
        name: 'sightQ',
        location: [35.709214591401796, 139.7201042479993],
        modelPath: { title: '/model/QTitle.glb', intro: '/model/QInfo.glb' },
    },
    {
        name: 'sightR',
        location: [35.70861336284333, 139.71989438725967],
        modelPath: { title: '/model/RTitle.glb', intro: '/model/RInfo.glb' },
    },
    {
        name: 'sightX',
        location: [35.70875838411237, 139.71968247070262],
        modelPath: { title: '/model/XTitle.glb', intro: '/model/XInfo.glb' },
    },
    {
        name: 'sightY',
        location: [35.70890145409443, 139.7208976443291],
        modelPath: { title: '/model/YTitle.glb', intro: '/model/YInfo.glb' },
    },
    {
        name: 'sightZ',
        location: [35.70906475752422, 139.7191510717475],
        modelPath: { title: '/model/ZTitle.glb', intro: '/model/ZInfo.glb' },
    },
]

const SHOW_SIGHT_TITLE_AND_INTRO_DISTANCE = 15

// 所有的 modelTitle 共用同样的设定
// modelTitle 仅经纬度及模型不同
const titleAttribute = {
    position: { x: 0, y: 2.5, z: 0 },
    scale: { x: 0.8, y: 0.8, z: 0.8 },
    rotation: { x: 0, y: 180, z: 0 },
}

const introAttribute = {
    position: { x: 0, y: -0.5, z: 0 },
    scale: { x: 1.2, y: 1.2, z: 1.2 },
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

let scale_count = 0
const onClickScaleBig = () => {
    if (scale_count > 10) { return }
    Object.keys(titleAttribute.scale).forEach((k) => titleAttribute.scale[k] *= 1.1)
    document.querySelectorAll('#model-title').forEach(title => title.setAttribute('scale', titleAttribute.scale))

    Object.keys(introAttribute.scale).forEach((k) => introAttribute.scale[k] *= 1.1)
    document.querySelectorAll('#model-intro').forEach(intro => intro.setAttribute('scale', introAttribute.scale))
    scale_count += 1
}

const onClickScaleSmall = () => {
    if (scale_count < -10) { return }
    Object.keys(titleAttribute.scale).forEach((k) => titleAttribute.scale[k] *= 0.9)
    document.querySelectorAll('#model-title').forEach(title => title.setAttribute('scale', titleAttribute.scale))

    Object.keys(introAttribute.scale).forEach((k) => introAttribute.scale[k] *= 0.9)
    document.querySelectorAll('#model-intro').forEach(intro => intro.setAttribute('scale', introAttribute.scale))
    scale_count -= 1
}

const contributeModelPin = (name, latitude, longitude, titlePath, introPath) => {
    let modelPin = document.createElement('a-entity')
    modelPin.setAttribute('id', 'PIN')
    modelPin.setAttribute('name', name)
    modelPin.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelPin.setAttribute('gltf-model', '/model/pin.glb')
    modelPin.setAttribute('position', '0 8 0')
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
