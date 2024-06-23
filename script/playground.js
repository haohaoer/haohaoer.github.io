// const PIN_MAX_DISTANCE = 200 // 用户和模型的距离小于此数值后开始显示pin
// const PIN_MIN_DISTANCE = 15 // 用户和模型的距离小于此数值后不再显示pin, 建议和MODEL_MAX_DISTANCE的值相等
const MODEL_MAX_DISTANCE = 200 // 用户模型的距离小于此数值后开始显示模型

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
    scene.appendChild(contributeModelPin(latitude, longitude))
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

const contributeModelTitle = (latitude, longitude) => {
  let modelTitle = document.createElement('a-entity')
  modelTitle.setAttribute('id', 'sightA')
  modelTitle.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
  modelTitle.setAttribute('gltf-model', '/model/Atitle.glb')
  modelTitle.setAttribute('position', '0 3 0')
  modelTitle.setAttribute('scale', '5 5 5')
  modelTitle.setAttribute('rotation', '0 180 0')
  modelInfo.setAttribute('maxDistance', (MODEL_MAX_DISTANCE).toString)

  modelTitle.addEventListener('loaded', () => {
    window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
  })

  return modelTitle
}

const contributeModelInfo = (latitude, longitude) => {
  let modelInfo = document.createElement('a-entity')
  modelInfo.setAttribute('id', 'sightA-introduction')
  modelInfo.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
  modelInfo.setAttribute('gltf-model', '/model/Aintro.glb')
  modelInfo.setAttribute('position', '0 -3 0')
  modelInfo.setAttribute('scale', '5 5 5')
  modelInfo.setAttribute('rotation', '0 180 0')
  modelInfo.setAttribute('maxDistance', (MODEL_MAX_DISTANCE).toString)

  modelInfo.addEventListener('loaded', () => {
    window.dispatchEvent(new CustomEvent('gps-new-entity-place-loaded'))
  })

  return modelInfo
}

const contributeModelPin = () => {
  let modelPin = document.createElement('a-text')
  modelPin.setAttribute('value', '↓V')
  modelPin.setAttribute('position', '0 4 0')
  modelPin.setAttribute('scale', '5 5 5')
  modelPin.setAttribute('rotation', '0 180 0')
  // modelPin.setAttribute('maxDistance', (PIN_MAX_DISTANCE).toString)
  // modelPin.setAttribute('minDistance', (PIN_MIN_DISTANCE).toString)

  return modelPin
}
