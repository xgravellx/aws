import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import io from "socket.io-client";

const Cube = () => {
  const containerRef = useRef(null);
  const [sensorData, setSensorData] = useState(null);
  const cubeRef = useRef(null);


  useEffect(() => {
    const socket = io('http://localhost:3000/', {
    withCredentials: true,
          extraHeaders: {
            "my-custom-header": "test"
          }
    })

    socket.on('connect', () => {
      console.log('Connected to server!');
    });

    socket.on('message', (newData) => {
      let jsonString = JSON.stringify(newData);
      setSensorData(JSON.parse(jsonString));
    });
  
    return () => {
      socket.disconnect();
    };

  }, []);


  useEffect(() => {
    if (!sensorData) return;
    const { gyro } = sensorData;
    if (!gyro) return;

    if (!cubeRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(0, 0, 0);
      scene.add(cube);
      camera.position.z = 5;
      cubeRef.current = cube;

      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x = gyro.x / 100;
        cube.rotation.y = gyro.y / 100;
        cube.rotation.z = gyro.z / 100;
        renderer.render(scene, camera);
      }
      animate();
    } else {
      cubeRef.current.rotation.x = gyro.x / 100;
      cubeRef.current.rotation.y = gyro.y / 100;
      cubeRef.current.rotation.z = gyro.z / 100;
    }


/*     if (!sensorData) return;
    const { gyro } = sensorData;
    if (!gyro) return;
    const { x, y, z } = gyro;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    containerRef.current.appendChild( renderer.domElement );
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(0, 0, 0);
    scene.add( cube );
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame( animate );
      cube.rotation.x = x / 100;
      cube.rotation.y = y / 100;
      cube.rotation.z = z / 100;

      renderer.render( scene, camera );
    }
    animate(); */

      }, [sensorData]);
      
return (
  <>
      <div ref={containerRef} />
      {sensorData &&
        <div>
          <p>Temperature: {sensorData.temp}</p>
          <p>Acceleration: {sensorData.acc}</p>
        </div>}
    </>

);
}

export default Cube;
      
          {/* <>
      <div ref={containerRef} />
      {sensorData && 
      <div>
        <p>Temperature: {sensorData.temp}</p>
        <p>Acceleration: {sensorData.acc}</p>
      </div>}

    </> */}