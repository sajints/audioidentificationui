import {useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

// const myComponent = () => {
//   const fileInputRef = useRef();
  
//   const handleChange = (event) =>{
//     // do something with event data

//   }}


  export default function Upload() {
  const [val, setInputValue] = useState();
  const fileInputRef = useRef("");

//   useEffect(() => {
//     val.current = val.current;
//   });

    const handleChange = (event) =>{
        //alert("here");
    // do something with event data
    //setInputValue(event.val);
    setInputValue(event.target.value);
    const wavesurfer = WaveSurfer.create({
        container: document.body,
        waveColor: 'rgb(200, 0, 200)',
        progressColor: 'rgb(100, 0, 100)',
        url: 'C:\sajin\python\audioidentification\audio_files\part1.mp3',
        })
        wavesurfer.play()
//val = "test"
  }
  
  return(
    <>
      <button onClick={()=>fileInputRef.current.click()}>
        Select File 1
      </button>
      <input value={val} onChange={(e) => handleChange(e)} multiple={false} ref={fileInputRef} type='file'hidden/>
      <label>{val}</label>
    </>
  )
}