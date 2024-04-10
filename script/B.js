window.onload = () => {
    let places = staticLoadPlaces()
    renderPlaces(places)
}

function staticLoadPlaces() {
    let url = new URL(window.location.href)
    let params = url.searchParams
    return [
        {
            name: 'sightB', location: {
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
    if (document.querySelector('#sightB-introduction')) {
        document.querySelector('#sightB-introduction').remove()
    } else {
        const scene = document.querySelector('a-scene')
        const location = staticLoadPlaces().find(place => place.name === 'sightB').location
        scene.appendChild(contributeModelInfo(location.lat, location.lng))
    }
}

const onClickRotationLeft = () => {
    const sightB = document.querySelector('#sightB')
    const sightBIntroduction = document.querySelector('#sightB-introduction')

    const rotation = sightB.getAttribute('rotation')
    rotation.y += 30

    sightB.setAttribute('rotation', rotation)
    sightBIntroduction?.setAttribute('rotation', rotation)
}

const onClickRotationRight = () => {
    const sightB = document.querySelector('#sightB')
    const sightBIntroduction = document.querySelector('#sightB-introduction')

    const rotation = sightB.getAttribute('rotation')
    rotation.y -= 30

    sightB.setAttribute('rotation', rotation)
    sightBIntroduction?.setAttribute('rotation', rotation)
}

const onClickScaleBig = () => {
    const sightB = document.querySelector('#sightB')
    const sightBIntroduction = document.querySelector('#sightB-introduction')

    const scale = sightB.getAttribute('scale')
    const position = sightB.getAttribute('position')
    scale.x = scale.x * 1.1
    scale.y = scale.y * 1.1
    scale.z = scale.z * 1.1
    position.y = position.y * 1.15

    sightB.setAttribute('scale', scale)
    sightB.setAttribute('position', position)
    sightBIntroduction?.setAttribute('scale', scale)
}

const onClickScaleSmall = () => {
    const sightB = document.querySelector('#sightB')
    const sightBIntroduction = document.querySelector('#sightB-introduction')

    const scale = sightB.getAttribute('scale')
    const position = sightB.getAttribute('position')
    scale.x = scale.x * 0.9
    scale.y = scale.y * 0.9
    scale.z = scale.z * 0.9
    position.y = position.y * 0.85

    sightB.setAttribute('scale', scale)
    sightB.setAttribute('position', position)
    sightBIntroduction?.setAttribute('scale', scale)
}

const contributeModelTitle = (latitude, longitude) => {
    let modelTitle = document.createElement('a-entity')
    modelTitle.setAttribute('id', 'sightB')
    modelTitle.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelTitle.setAttribute('gltf-model', '/model/Btitle.glb')
    modelTitle.setAttribute('position', '0 3 0')
    modelTitle.setAttribute('scale', '5 5 5')
    modelTitle.setAttribute('rotation', '0 180 0')

    modelTitle.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })

    return modelTitle
}

const contributeModelInfo = (latitude, longitude) => {
    let modelInfo = document.createElement('a-entity')
    modelInfo.setAttribute('id', 'sightB-introduction')
    modelInfo.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    modelInfo.setAttribute('gltf-model', '/model/Bintro.glb')
    modelInfo.setAttribute('position', '0 -3 0')
    modelInfo.setAttribute('scale', '5 5 5')
    modelInfo.setAttribute('rotation', '0 180 0')
    modelInfo.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })

    return modelInfo
}