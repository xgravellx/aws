import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import SockJS from 'socket.io-client';


const Cube2 = () => {
    const [sensorData, setSensorData] = useState(null);

    useEffect(() => {
        if (!!window.EventSource) {
            var source = new EventSource('/sensors');
          
            source.addEventListener('open', function(e) {
              console.log("Events Connected");
            }, false);
          
            source.addEventListener('error', function(e) {
              if (e.target.readyState !== EventSource.OPEN) {
                console.log("Events Disconnected");
              }
            }, false);
          
          
            source.addEventListener('temperature_reading', function(e) {
              console.log("temperature_reading", e.data);
              document.getElementById("temp").innerHTML = e.data;
            }, false);
          
            source.addEventListener('accelerometer_readings', function(e) {
              console.log("accelerometer_readings", e.data);
              var obj = JSON.parse(e.data);
              document.getElementById("accX").innerHTML = obj.accX;
              document.getElementById("accY").innerHTML = obj.accY;
              document.getElementById("accZ").innerHTML = obj.accZ;
            }, false);
          }
      }, []);

    useEffect(() => {
    if (!sensorData) return;
    const { gyro } = sensorData;
    const { x, y, z } = gyro;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame( animate );
        cube.rotation.x += x / 100;
        cube.rotation.y += y / 100;
        renderer.render( scene, camera );
    };
    animate();
    }, [sensorData]);
    
  return (
    <>
      {sensorData && 
      <div>
        <p>Temperature: {sensorData.temp}</p>
        <p>Acceleration: {sensorData.acc}</p>
      </div>}
    </>
  )
}

export default Cube2