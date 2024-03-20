export const contributeModel = ({
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