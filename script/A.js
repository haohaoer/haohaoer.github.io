const sightALocation = { lat: 35.7014561, lng: 139.7003657 }

window.onload = () => {
    const scene = document.querySelector('a-scene')
    const sightA = contributeSightA(sightALocation.lat, sightALocation.lng)
    addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })
    scene.appendChild(sightA)
}

const onClickIntroductionAR = () => {
    const scene = document.querySelector('a-scene')
    scene.appendChild(contributeSightAIntro(sightALocation.lat, sightALocation.lng))
}

const onClickIntroductionWindow = () => {
    alert("モチーフの天使は町の象徴で、\n「少しでも明るい光を照らすことができれば」\nとの願いが込められています。")
}

const contributeSightA = (latitude, longitude) => {
    const path = '/model/A1.glb'
    const position = { x: 0, y: 3, z: 0 }
    const scale = { x: 5, y: 5, z: 5 }
    return contributeModel({ path, latitude, longitude, position, scale })
}

const contributeSightAIntro = (latitude, longitude) => {
    const path = '/model/A2.glb'
    const position = { x: 0, y: -3, z: 0 }
    return contributeModel({ path, latitude, longitude, position })
}

const contributeModel = ({
                             path,
                             latitude,
                             longitude,
                             position = { x: 0, y: 0, z: 0 },
                             scale = { x: 1, y: 1, z: 1 },
                             rotation = { x: 0, y: 180, z: 0 },
                         }) => {
    const model = document.createElement('a-entity')
    model.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
    model.setAttribute('gltf-model', path)
    model.setAttribute('position', `${position.x} ${position.y} ${position.z}`)
    model.setAttribute('scale', `${scale.x} ${scale.y} ${scale.z}`)
    model.setAttribute('rotation', `${rotation.x} ${rotation.y} ${rotation.z}`)

    return model
}