import *as THREE from "./js/three.module.js";
import { OrbitControls } from './js/OrbitControls.js';
import { GLTFLoader } from './js/GLTFLoader.js';
import { RoomEnvironment } from './js/RoomEnvironment.js';
import Stats from './js/stats.module.js';

let scene, camera, renderer ;

let loader = new GLTFLoader().setPath('./model/');

    function init() {
        // 场景，相机
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.set(-20, 90, 170);

        // 渲染器
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.outputEncoding = THREE.sRGBEncoding;
        document.body.appendChild(renderer.domElement);

        // 创建性能监视器
        let stats = new Stats()
        // 将监视器添加到页面中
        document.body.appendChild(stats.domElement)

        // 材质
        const environment = new RoomEnvironment();
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        scene.environment = pmremGenerator.fromScene(environment).texture;

        //灯光

        // 创建平行光源
        const light = new THREE.DirectionalLight(0xffffff, 1); // 平行光，颜色为白色，强度为1
        light.position.set(-40, 40, 20); // 设置灯源位置
        light.castShadow = true; // 允许生成阴影
        //light.target = loader;
        scene.add(light); // 添加到场景中

        

        // 控制器
        const controls = new OrbitControls( camera, renderer.domElement );
		controls.update();

        function animate() {
            controls.update();
            stats.update()
            requestAnimationFrame(animate);
            renderer.render( scene, camera );
        };

        animate();
    }

    init();
 
 
    function modelloader() {

        //进度条
        const percentDiv = document.getElementById("per");// 获取进度条元素
        percentDiv.style.width = 0.8*400 + "px";//进度条元素长度
        percentDiv.style.textIndent = 0.8*400 + 5 +"px";//缩进元素中的首行文本
        percentDiv.innerHTML =  "80%";//进度百分比

        loader.load('library02.glb', function (gltf) {
            gltf.scene.position.set(0,0,2);
            scene.add(gltf.scene);

        // 加载完成，隐藏进度条
        document.getElementById("container").style.display = 'none';

        loader.load('tree.glb', function (gltf) {
            const treemodel = gltf.scene.children[0];
            treemodel.position.set(0,0,2);
            scene.add(treemodel);
            const pos = [
                [4, 0, -3],    [-3, 0, 10],   [-35, 0, 27],  [-39, 0, 30],
                [-43, 0, 33],  [-47, 0, 35],  [-52, 0, 38],  [-57, 0, 41],
                [-72, 0, 43],  [-90, 0, 38],  [-80, 0, 33],  [-60, 0, 18],
                [-66, 0, 22],  [-115, 0, 22], [-117, 0, 17], [-111, 0, 28],
                [-107, 0, 2],  [-104, 0, 0],  [-100, 0, -2], [-96, 0, -4],
                [-91, 0, -7],  [-86, 0, -10], [-81, 0, -13], [-76, 0, -16],
                [-71, 0, -19], [-66, 0, -22], [-60, 0, -26], [-48, 0, -33],
                [-42, 0, -37], [-36, 0, -40], [-28, 0, -42], [-24, 0, -36],
                [-20, 0, -30], [-16, 0, -24], [-12, 0, -18], [-8, 0, -12],
                [-1, 0, -15],  [-6, 0, -22],  [-11, 0, -29], [-16, 0, -36],
                [-20, 0, -43], [5, -2.7, 25], [14, -5.5, 42],[4, -3.6, 37],
                [0, -3.5, 46], [-3, -3.5, 60],[-8, -3.5, 72],[-19, -3.3, 83],
                [-31, -4.5, 92], [-43, -5.2, 98], [-68, -4.2, 90], [-59, -6.2, 105],
                [-31, -6.6, 101],[5, -7, 65], [-35, -2, 65], [-27, -0.2, 39],
                [-22, -1, 56], [-38, -0.7, 45], [-53, -0.8, 54], [-62, -0.8, 58],
                [-51, -2.5, 67], [-65, -3, 76], [-80.5, -1.5, 57]
            ]
            for (let i = 0;i< pos.length;i++){
                const tree = treemodel.clone();
                tree.position.x = pos[i][0];
                tree.position.y = pos[i][1];
                tree.position.z = pos[i][2];
                scene.add(tree)
            }
            
        });
        }, 

        function (xhr) {
        const percent = xhr.loaded / xhr.total;
        percentDiv.style.width = percent * 400 + "px"; //进度条元素长度
        percentDiv.style.textIndent = percent * 400 + 5 + "px"; //缩进元素中的首行文本
        percentDiv.innerHTML = Math.floor(percent * 100) + '%'; //进度百分比
        
        renderer.render(scene, camera);
        });
           
    }

    modelloader();
