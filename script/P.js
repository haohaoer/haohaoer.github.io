window.onload = () => {
    let places = staticLoadPlaces()
    renderPlaces(places)
}

function staticLoadPlaces() {
    let url = new URL(window.location.href)
    let params = url.searchParams
    return [
        {
            name: 'sightP', location: {
                lat: params.get('latitude') ? params.get('latitude') : 35.7089019,
                lng: params.get('longitude') ? params.get('longitude') : 139.7206617,
            },
        },
    ]
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene')

    places.forEach((place) => {
        let latitude = place.location.lat
        let longitude = place.location.lng

        scene.appendChild(contributeModelTitle(latitude, longitude))
    })
}

const onClickIntroductionAR = () => {
    if (document.querySelector('#sightP-introduction')) {
        document.querySelector('#sightP-introduction').remove()
    } else {
        const scene = document.querySelector('a-scene')
        const location = staticLoadPlaces().find(place => place.name === 'sightP').location
        scene.appendChild(contributeModelInfo(location.lat, location.lng))
    }
}

const onClickRotationLeft = () => {
    const sightA = document.querySelector('#sightP')
    const sightAIntroduction = document.querySelector('#sightP-introduction')

    const rotation = sightA.getAttribute('rotation')
    rotation.y += 30

    sightA.setAttribute('rotation', rotation)
    sightAIntroduction?.setAttribute('rotation', rotation)
}

const onClickRotationRight = () => {
    const sightA = document.querySelector('#sightP')
    const sightAIntroduction = document.querySelector('#sightP-introduction')

    const rotation = sightA.getAttribute('rotation')
    rotation.y -= 30

    sightA.setAttribute('rotation', rotation)
    sightAIntroduction?.setAttribute('rotation', rotation)
}

const onClickScaleBig = () => {
    const sightA = document.querySelector('#sightP')
    const sightAIntroduction = document.querySelector('#sightP-introduction')

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
    const sightA = document.querySelector('#sightP')
    const sightAIntroduction = document.querySelector('#sightP-introduction')

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

const contributeModelTitle = (latitude, longitude) => {
    let modelTitle = document.createElement('a-entity')
    modelTitle.setAttribute('id', 'sightP')
    modelTitle.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelTitle.setAttribute('gltf-model', '/model/PTitlePIN.glb')
    modelTitle.setAttribute('position', '0 3 0')
    modelTitle.setAttribute('scale', '4 4 4')
    modelTitle.setAttribute('rotation', '0 180 0')

    modelTitle.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })

    return modelTitle
}

const contributeModelInfo = (latitude, longitude) => {
    let modelInfo = document.createElement('a-entity')
    modelInfo.setAttribute('id', 'sightP-introduction')
    modelInfo.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelInfo.setAttribute('gltf-model', '/model/PInfo.glb')
    modelInfo.setAttribute('position', '0 -2 0')
    modelInfo.setAttribute('scale', '3 3 3')
    modelInfo.setAttribute('rotation', '0 180 0')
    modelInfo.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })

    return modelInfo
}