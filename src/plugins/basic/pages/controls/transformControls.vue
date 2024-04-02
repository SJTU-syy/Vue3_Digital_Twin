<script setup lang="ts">
import { ref, reactive } from 'vue'

import { BasicShadowMap, SRGBColorSpace, NoToneMapping , Clock} from 'three'

import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, TransformControls, useTweakPane } from '@tresjs/cientos'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


//导入模型
import { useFBX } from '@tresjs/cientos'
//这里要写完整路径，已成功加载
const model = await useFBX('./plugins/basic/controls/model/model01.FBX');
const scene = await useFBX('./plugins/basic/controls/model/scene.fbx');

console.log(model);
//定义关节
let joint1 = model.getObjectByName( 'Bone_001');
let joint2 = model.getObjectByName( 'Bone_002');
let joint3 = model.getObjectByName( 'Bone_003');
let joint4 = model.getObjectByName( 'Bone_004');
let joint5 = model.getObjectByName( 'Bone_005');
let joint6 = model.getObjectByName( 'Bone_006');
joint5.rotation.set(joint5.rotation.x,joint5.rotation.y,joint5.rotation.z,'XZY');


// let test  =2
// let slide2 = ref(test);
let slide1 = reactive(joint1);


//时间动画
const clock = new Clock();
const { onLoop } = useRenderLoop()
onLoop(() => {
  const t = clock.getElapsedTime();
  // console.log("joint1.rotation.y",joint1.rotation.y);
  // console.log("slide1",slide1);
  // joint1.rotation.y += Math.sin( t ) * 0.003;
  joint2.rotation.x += Math.sin( t ) * 0.003;
  joint3.rotation.x += Math.sin( t ) * 0.003;
  joint4.rotation.x += Math.sin( t ) * 0.003;
  joint5.rotation.z -= Math.sin( t ) * 0.003;
  joint6.rotation.y -= Math.sin( t ) * 0.003;
})

//全局渲染属性
const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

//控制属性
const controlsState = reactive({
  mode: 'translate',
  enabled: true,
  space: 'world',
  axis: 'XYZ',
  size: 1,
  showX: true,
  showY: true,
  showZ: true,
})

const { pane } = useTweakPane()
pane
  .addBlade({
    view: 'list',
    label: '模式',
    options: [
      { text: '移动', value: 'translate' },
      { text: '旋转', value: 'rotate' },
      { text: '缩放', value: 'scale' },
    ],
    value: controlsState.mode,
  })
  .on('change', (e: any) => {
    controlsState.mode = e.value
  })
pane.addBinding(controlsState, 'enabled', { label: '开启' })
pane.addBlade({
  view: 'list',
  label: '轴',
  options: [
    { text: 'X', value: 'X' },
    { text: 'Y', value: 'Y' },
    { text: 'Z', value: 'Z' },
    { text: 'XY', value: 'XY' },
    { text: 'YZ', value: 'YZ' },
    { text: 'XZ', value: 'XZ' },
    { text: 'XYZ', value: 'XYZ' },
  ],
  value: controlsState.axis,
})

pane.addBinding(controlsState, 'size', {
  label: '大小',
  step: 0.01,
  min: 0,
  max: 10,
})
pane.addBinding(controlsState, 'showX', { label: '显示X轴' })
pane.addBinding(controlsState, 'showY', { label: '显示Y轴' })
pane.addBinding(controlsState, 'showZ', { label: '显示Z轴' })



</script>

<template>
    <TresCanvas v-bind="gl" ref="context" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls make-default />


    <TresAmbientLight :intensity="1" />
    <TresGridHelper />
    <!-- <TransformControl :object="model" v-bind="controlsState" /> -->

     <primitive :object="model" :position="[0, 0, 0]" :scale="[0.2,0.2,0.2]" :rotation="[-1.57,0,0]"/>
    <primitive :object="scene" :position="[-0.35, -2.65, -3.1]" :scale="[0.2,0.2,0.2]":rotation="[-1.57,0,0]"/>

    
    
    </TresCanvas>

    //absolute可以让UI覆盖在canvas上
    <div class = "absolute">

      <el-row :gutter="20">
    <el-col :span="16"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="16"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
  </el-row>

    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
        <div class="slider-demo-block">
          <el-slider v-model="slide1.rotation.y" show-input :min="-5" :max="5" :step="0.01" :size="50"/>
        </div>
    </el-container>

    <div class="mb-4">
    <el-button>从设定位姿启动</el-button>
    <el-button type="primary">从当前位置重启</el-button>
    <el-button type="success">设置套接进给深度</el-button>
    <el-button type="info">设置力反馈阈值</el-button>
    <el-button type="warning">设置套筒转速</el-button>
    <el-button type="danger">终止程序</el-button>
  </div>

     
      
    </div>


</template>