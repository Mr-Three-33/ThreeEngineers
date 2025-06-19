import * as THREE from 'three';

const canvas = document.querySelector('#c');

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 75;//fov=75度表示视野范围(field of view)
const aspect = 2;//aspect=2表示画布的宽高比（默认情况下画布是300*150PX）
const near = 0.1;//，near=0.1表示近平面
const far = 5;//far=5表示远平面
const perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);//摄像机用四个参数来定义一个视锥体（frustum），视锥体内部的数据才会被渲染

perspectiveCamera.position.z = 2;

//创建一个新的场景
const scene = new THREE.Scene();

//创建一个包含顶点信息的立方几何体
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

//创建一个基本材质并设置颜色
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

//创建一个网格对象，网格对象包含几何体和材质；
const cube = new THREE.Mesh(geometry, material);

//把网格对象添加到场景中
scene.add(cube);

//把场景和摄像机传入渲染器中，最后把整个场景渲染出来；
renderer.render(scene, perspectiveCamera);
