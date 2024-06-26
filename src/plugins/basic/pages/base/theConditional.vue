<!--
 * @Description: 
 * @Version: 1.668
 * @Autor: Hawk
 * @Date: 2023-09-22 11:25:41
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2023-11-05 08:04:05
-->
<script setup lang="ts">
import { BasicShadowMap, MeshPhongMaterial, NoToneMapping, SRGBColorSpace } from 'three'
import { reactive, ref, onMounted, onUnmounted, watch, getCurrentInstance } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Pane } from 'tweakpane';

const state = reactive({
	clearColor: '#000000',
	shadows: true,
	alpha: false,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
	useLegacyLights: false,
})

const paneElements = ref({
	groupVisible: true,
	boxPropMaterialVisible: true,
})


const boxRef = ref(null)
const boxVisible = ref(true)
let pane = null as any
let proxy = null as any
onMounted(() => {
	if (!pane) {
		pane = new Pane({
			title: '显隐参数',
			expanded: true,
		});
		pane.addBinding(boxVisible, 'value', { label: 'boxVisible' })
		pane.addBinding(paneElements.value, 'boxPropMaterialVisible')
		pane.addBinding(paneElements.value, 'groupVisible')
	}
	proxy = (getCurrentInstance() as any).proxy
})
onUnmounted(() => {
	if (pane) {
		pane.dispose();
		pane = null
	}
})

//第一个参数是一个函数，返回需要被监听的响应式数据，这里是 boxVisible。
// 第二个参数是一个回调函数，会在 boxVisible 改变时被调用，参数 newVal 是新的值，oldVal 是旧的值。在这段代码中，如果 oldVal 不是 undefined，则将 boxRef 的 visible 属性设置为 newVal.value。
// 第三个参数是一个配置对象，这里使用 { deep: true } 来深度监听 boxVisible，即如果 boxVisible 是一个对象或数组，会递归监听其属性或元素的变化。
watch(
	() => boxVisible,
	(newVal, oldVal) => {
		if (oldVal !== undefined) {
			proxy.$refs['boxRef'].visible = newVal.value
		}
	},
	{ deep: true }
)

const material = new MeshPhongMaterial({ color: '#ff0000' })
</script>

<template>
	<TresCanvas v-bind="state" window-size>
		<TresPerspectiveCamera :position="[11, 11, 11]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
		<TresDirectionalLight :position="[0, 8, 4]" :intensity="0.2" cast-shadow />
		<TresMesh ref="boxRef" :position="[0, 0, 0]" :material="material">
			<TresBoxGeometry :args="[1, 1, 1]" />
		</TresMesh>
		<TresMesh v-if="paneElements.boxPropMaterialVisible" :position="[4, 0, 0]">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshToonMaterial color="#efefef" />
		</TresMesh>
		<TresMesh v-if="paneElements.boxPropMaterialVisible" :position="[4, 1, 0]">
			<TresBoxGeometry :args="[1, 1, 1]" />
			<TresMeshToonMaterial color="#efefef" />
		</TresMesh>
		<TresGroup v-if="paneElements.groupVisible" :position="[0, -4, -5]">
			<TresGroup>
				<TresMesh :position="[0, 0, 0]">
					<TresBoxGeometry :args="[1, 1, 1]" />
					<TresMeshBasicMaterial color="#efef11" />
				</TresMesh>
				<TresMesh :position="[0, 2, 0]">
					<TresBoxGeometry :args="[1, 1, 1]" />
					<TresMeshBasicMaterial color="#ef11ef" />
				</TresMesh>
			</TresGroup>
		</TresGroup>
		<OrbitControls />
		<TresAmbientLight :intensity="0.5" />
	</TresCanvas>
</template>
