import { contributeModel } from "./ContributeModel"

const sightALocation = { lat: 35.7014561, lng: 139.7003657 }
const scene = document.querySelector('a-scene')

window.onload = () => {
    const sightA = contributeSightA(sightALocation.lat, sightALocation.lng)
    addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
    })
    scene.appendChild(sightA)
}

export const onClickIntroductionAR = () => {
    scene.appendChild(contributeSightAIntro(sightALocation.lat, sightALocation.lng))
}

export const onClickIntroductionWindow = () => {
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
