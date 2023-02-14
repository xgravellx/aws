import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import io from "socket.io-client";

const Cube4 = () => {
    const containerRef = useRef(null);
    const [sensorData, setSensorData] = useState(null);
  
    const sceneRef = useRef(new THREE.Scene());
    const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    const rendererRef = useRef(new THREE.WebGLRenderer());
  
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
  
      const { x, y, z } = gyro;
  
      const cube = cubeRef.current;
      cube.rotation.x = x / 100;
      cube.rotation.y = y / 100;
      cube.rotation.z = z / 100;
  
      rendererRef.current.render(sceneRef.current, cameraRef.current);
  
    }, [sensorData]);
  
    useEffect(() => {
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(rendererRef.current.domElement);
  
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(0, 0, 0);
  
      sceneRef.current.add(cube);
      cameraRef.current.position.z = 5;
  
      cubeRef.current = cube;
  
      const animate = () => {
        requestAnimationFrame(animate);
  
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animate();
  
    }, []);

  return (
    <>
      <div ref={containerRef} />
      {sensorData && 
      <div>
        <p>Temperature: {sensorData.temp}</p>
        <p>Acceleration: {sensorData.acc}</p>
      </div>}
    </>
  )
}

export default Cube4