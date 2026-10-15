import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js';
const canvas=document.querySelector('#three-canvas'), hero=document.querySelector('.hero');
if(!canvas||!hero||matchMedia('(prefers-reduced-motion: reduce)').matches){}else{
 let renderer,scene,camera,frame,paused=false;
 try{
 renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true}); renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7)); renderer.setSize(hero.clientWidth,hero.clientHeight,false); renderer.setClearColor(0x000000,0); renderer.outputColorSpace=THREE.SRGBColorSpace;
 scene=new THREE.Scene(); camera=new THREE.PerspectiveCamera(42,hero.clientWidth/hero.clientHeight,.1,100); camera.position.set(0,0,12);
 const rig=new THREE.Group(); rig.position.set(2.5,.1,-.8); scene.add(rig);
 const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.55,4),new THREE.MeshPhysicalMaterial({color:0x617aff,metalness:.75,roughness:.18,emissive:0x151b60,emissiveIntensity:.8,clearcoat:1,clearcoatRoughness:.1})); rig.add(core);
 const shell=new THREE.Mesh(new THREE.IcosahedronGeometry(1.72,2),new THREE.MeshBasicMaterial({color:0xc1caff,wireframe:true,transparent:true,opacity:.55})); rig.add(shell);
 const knot=new THREE.Mesh(new THREE.TorusKnotGeometry(2.15,.014,220,8,2,5),new THREE.MeshBasicMaterial({color:0xc8ff6b,transparent:true,opacity:.85})); knot.rotation.set(.6,.3,.7); rig.add(knot);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(2.5,.012,8,180),new THREE.MeshBasicMaterial({color:0xbc8aff,transparent:true,opacity:.8})); ring.rotation.set(1.1,.35,.2); rig.add(ring);
 const ringB=new THREE.Mesh(new THREE.TorusGeometry(2.8,.008,8,180),new THREE.MeshBasicMaterial({color:0x91a7ff,transparent:true,opacity:.55})); ringB.rotation.set(.3,1.1,.9); rig.add(ringB);
 const count=1300,pos=new Float32Array(count*3); for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*20;pos[i*3+1]=(Math.random()-.5)*12;pos[i*3+2]=(Math.random()-.5)*8-1;}
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));const stars=new THREE.Points(pg,new THREE.PointsMaterial({color:0xb9c6ff,size:.025,transparent:true,opacity:.8}));scene.add(stars);
 scene.add(new THREE.AmbientLight(0xbac5ff,2));const light=new THREE.PointLight(0x7188ff,55,22);light.position.set(2,4,5);scene.add(light);const lime=new THREE.PointLight(0xc8ff6b,25,14);lime.position.set(-4,-2,3);scene.add(lime);
 let mx=0,my=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5)*.7;ty=(e.clientY/innerHeight-.5)*.5},{passive:true});
 function resize(){const w=hero.clientWidth,h=hero.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
 addEventListener('resize',resize,{passive:true});const clock=new THREE.Clock();
 function animate(){if(paused)return;frame=requestAnimationFrame(animate);const t=clock.getElapsedTime();mx+=(tx-mx)*.035;my+=(ty-my)*.035;core.rotation.set(t*.16+my,t*.23+mx,t*.06);shell.rotation.set(-t*.1+my,-t*.16+mx,t*.08);knot.rotation.z=t*.16;knot.rotation.y=t*.12;ring.rotation.z=t*.13;ringB.rotation.x=.3+Math.sin(t*.3)*.15;rig.rotation.y=mx*.3;rig.position.y=.1+Math.sin(t*.55)*.12;stars.rotation.y=t*.008;renderer.render(scene,camera);}
 animate();document.addEventListener('visibilitychange',()=>{paused=document.hidden;if(paused)cancelAnimationFrame(frame);else animate()});
 }catch(e){canvas.style.display='none';console.warn('3D scene unavailable; showing CSS design instead.',e)}
}
