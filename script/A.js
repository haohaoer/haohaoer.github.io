window.onload = () => {
    let places = staticLoadPlaces()
    renderPlaces(places)
}

function staticLoadPlaces() {
    let url = new URL(window.location.href)
    let params = url.searchParams
    return [
        {
            name: 'sightA', location: {
                lat: params.get('latitude') ? params.get('latitude') : 35.7014561,
                lng: params.get('longitude') ? params.get('longitude') : 139.7003657,
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
    if (document.querySelector('#sightA-introduction')) {
        document.querySelector('#sightA-introduction').remove()
    } else {
        const scene = document.querySelector('a-scene')
        const location = staticLoadPlaces().find(place => place.name === 'sightA').location
        scene.appendChild(contributeModelInfo(location.lat, location.lng))
    }
}

const onClickRotation = () => {
    const sightA = document.querySelector('#sightA')
    const sightAIntroduction = document.querySelector('#sightA-introduction')

    const rotation = sightA.getAttribute('rotation')
    rotation.y += 30

    sightA.setAttribute('rotation', rotation)
    sightAIntroduction?.setAttribute('rotation', rotation)
}

const onClickScale = () => {
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

const contributeModelTitle = (latitude, longitude) => {
    let modelTitle = document.createElement('a-entity')
    modelTitle.setAttribute('id', 'sightA')
    modelTitle.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelTitle.setAttribute('gltf-model', '/model/Btitle.glb')
    modelTitle.setAttribute('position', '0 3 0')
    modelTitle.setAttribute('scale', '5 5 5')
    modelTitle.setAttribute('rotation', '0 0 0')

    modelTitle.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })

    return modelTitle
}

const contributeModelInfo = (latitude, longitude) => {
    let modelInfo = document.createElement('a-entity')
    modelInfo.setAttribute('id', 'sightA-introduction')
    modelInfo.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelInfo.setAttribute('gltf-model', '/model/Bintro.glb')
    modelInfo.setAttribute('position', '0 -3 0')
    modelInfo.setAttribute('scale', '5 5 5')
    modelInfo.setAttribute('rotation', '0 0 0')
    modelInfo.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })

    return modelInfo
}