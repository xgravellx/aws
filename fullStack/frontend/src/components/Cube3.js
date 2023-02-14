import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
const { Socket } = require('engine.io-client');

const Cube3 = () => {
    const socket = new Socket('ws://localhost:3000/sensors');
    const containerRef = useRef(null);
    const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    console.log('buradasın')

    socket.on('open', () => {
        socket.on('message', (data) => {console.log(data)});
        socket.on('close', () => {});
      });
  }, []);


  useEffect(() => {
    console.log(sensorData);
    if (!sensorData) return;
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
    animate();

      }, [sensorData]);

  return (
    <div>
        <div ref={containerRef} />
        {sensorData && 
        <div>
            <p>Temperature: {sensorData.temp}</p>
            <p>Acceleration: {sensorData.acc}</p>
        </div>}
    </div>
  )
}

export default Cube3