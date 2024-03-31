<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping , Clock,lilGui} from 'three'
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls, TransformControls, useTweakPane } from '@tresjs/cientos'
import GUI from 'lil-gui'; 


//导入模型
import { useFBX } from '@tresjs/cientos'
//这里要写完整路径，已成功加载
const model = await useFBX('./plugins/basic/controls/model/model01.FBX');
const scene = await useFBX('./plugins/basic/controls/model/scene.fbx');

console.log(model);
//定义关节
var joint1 = model.getObjectByName( 'Bone_001');
var joint2 = model.getObjectByName( 'Bone_002');
var joint3 = model.getObjectByName( 'Bone_003');
var joint4 = model.getObjectByName( 'Bone_004');
var joint5 = model.getObjectByName( 'Bone_005');
var joint6 = model.getObjectByName( 'Bone_006');
joint5.rotation.set(joint5.rotation.x,joint5.rotation.y,joint5.rotation.z,'XZY');


//个人面板
const panel= new GUI();
panel.add(joint1.rotation,'y').name("1位姿").min(-1).max(1).listen();
panel.add(joint2.rotation,'x').name("2位姿").min(-1).max(1).listen();
panel.add(joint3.rotation,'x').name("3位姿").min(-1).max(1).listen();
panel.add(joint4.rotation,'x').name("4位姿").min(-1).max(1).listen();
panel.add(joint5.rotation,'z').name("5位姿").min(-1).max(1).listen();
panel.add(joint6.rotation,'y').name("6位姿").min(-1).max(1).listen();

// // 立体控制球
// transformControls = new TransformControls( camera, renderer.domElement );
// transformControls.size = 0.75;
// transformControls.showY = false;
// // transformControls.showZ = false;
// transformControls.space = 'local';
// transformControls.attach( joint6 );
// scene.add( transformControls );
// // transformControls.setMode('rotate');
// panel.add(transformControls, "visible").name("打开移动开关");

// // disable orbitControls while using transformControls
// transformControls.addEventListener( 'mouseDown', () => orbitControls.enabled = false );
// transformControls.addEventListener( 'mouseUp', () => orbitControls.enabled = true );


// skeleton = new THREE.SkeletonHelper(model);
// skeleton.visible = true;
// scene.add(skeleton);
// panel.add(skeleton, "visible").name("骨架可见性");
// panel.add(panelOBJ,'isMoving');
// panel.add(panelOBJ,'reset');

// console.log(model.children[1].material.color);
// panel.addColor(model.children[1].material,'color');
// panel.add(panelOBJ,'web');

//时间动画
const clock = new Clock();
const { onLoop } = useRenderLoop()
onLoop(() => {
  const t = clock.getElapsedTime();
  // console.log("joint1.rotation.y",joint1.rotation.y);
  joint1.rotation.y += Math.sin( t ) * 0.003;
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
</script>

<template>
  <TresCanvas v-bind="gl" ref="context" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls make-default />


    <TresAmbientLight :intensity="1" />
    <TresGridHelper />

    <!-- <primitive :object="model" :position="[0, 0, 0]" :scale="[0.2,0.2,0.2]" :rotation="[0,0,0]"/>
     -->
     <primitive :object="model" :position="[0, 0, 0]" :scale="[0.2,0.2,0.2]" :rotation="[-1.57,0,0]"/>


    <primitive :object="scene" :position="[0, -2, -2]" :scale="[0.2,0.2,0.2]":rotation="[-1.57,0,0]"/>

  </TresCanvas>
</template>