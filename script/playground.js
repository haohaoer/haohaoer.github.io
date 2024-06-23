const SHOW_SIGHT_TITLE_AND_INFO_DISTANCE = 15

window.onload = () => {
    let places = [
        { name: 'sightA', location: { lat: 35.5378780, lng: 139.5352004 }, modelPath: '/model/ATitle.glb' },
        { name: 'sightP', location: { lat: 35.7089019, lng: 139.7206617 }, modelPath: '/model/PTitle.glb' },
        { name: 'sightQ', location: { lat: 35.7091851, lng: 139.7201655 }, modelPath: '/model/QTitle.glb' },
    ]
    renderPlaces(places)
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene')

    places.forEach((place) => {
        let latitude = place.location.lat
        let longitude = place.location.lng

        scene.appendChild(contributeModelPin(latitude, longitude))
        scene.appendChild(contributeModelTitle(latitude, longitude, place.modelPath))
    })
}

const onClickIntroductionAR = () => {
    if (document.querySelector('#sightA-introduction')) {
        document.querySelector('#sightA-introduction').remove()
    } else {
        const scene = document.querySelector('a-scene')
        const location = staticLoadPlaces().find(place => place.name === 'sightA').location
        scene.appendChild(contributeModelInfo(location.lat, location.lng))
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
    modelPin.setAttribute('scale', '5 5 5')
    return modelPin
}

const contributeModelTitle = (latitude, longitude, modelPath) => {
    let modelTitle = document.createElement('a-entity')
    modelTitle.setAttribute('id', 'sightA')
    modelTitle.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelTitle.setAttribute('gltf-model', '')
    modelTitle.setAttribute('position', '0 3 0')
    modelTitle.setAttribute('scale', '5 5 5')
    modelTitle.setAttribute('rotation', '0 180 0')

    modelTitle.addEventListener('gps-entity-place-update-position', (event) => {
        if (event.detail.distance <= SHOW_SIGHT_TITLE_AND_INFO_DISTANCE) {
            modelTitle.setAttribute('gltf-model', modelPath)
        } else {
            modelTitle.setAttribute('gltf-model', '')
        }
    })

    return modelTitle
}

const contributeModelInfo = (latitude, longitude) => {
    let modelInfo = document.createElement('a-entity')
    modelInfo.setAttribute('id', 'sightA-introduction')
    modelInfo.setAttribute('gps-projected-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelInfo.setAttribute('gltf-model', '/model/Aintro.glb')
    modelInfo.setAttribute('position', '0 -3 0')
    modelInfo.setAttribute('scale', '5 5 5')
    modelInfo.setAttribute('rotation', '0 180 0')

    modelInfo.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })

    return modelInfo
}
