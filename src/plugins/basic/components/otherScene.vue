
<template></template>

<script setup lang="ts">
import * as THREE from 'three'
import { useRenderLoop, useTresContext } from '@tresjs/core'

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshLambertMaterial({ color: 0xff00ff })
var cube = new THREE.Mesh(geometry, material)
cube.position.set(-3, 2, 3)

var oScene = new THREE.Scene()

var lightAmb = new THREE.AmbientLight(0xffffff)
oScene.add(lightAmb)
oScene.add(cube)

const { camera, renderer, scene } = useTresContext()
if (camera.value) {
	// 同步相机
	oScene.add(camera.value)
}

const { onLoop } = useRenderLoop()
onLoop(() => {
	cube.rotation.x += 0.05
	cube.rotation.y += 0.02
	if (renderer.value && camera.value) {
		renderer.value.clear()
		renderer.value.render(oScene, camera.value)
		renderer.value.render(scene.value, camera.value)
	}
})

</script>
