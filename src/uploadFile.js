import React, { useState, useRef } from "react";
import axios from "axios";
import WaveSurfer from "wavesurfer.js";

export default function FileUpload() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [result, setResult] = useState(null);

  const waveformRef1 = useRef(null);
  const waveformRef2 = useRef(null);

  let wavesurfer1 = useRef(null);
  let wavesurfer2 = useRef(null);

  const handleFile1Change = (e) => {
    const file = e.target.files[0];
    setFile1(file);
    drawWaveform(file, waveformRef1, wavesurfer1);

  };

  const handleFile2Change = (e) => {
    const file = e.target.files[0];
    setFile2(file);
    drawWaveform(file, waveformRef2, wavesurfer2);
  };

  const handleUpload = async () => {
    if (!file1 || !file2) return;
    await callAPI();
  };

  const drawWaveform = (file, containerRef, wavesurferInstance) => {
    if (!file) return;

    // Create a temporary URL for the file
    const fileUrl = URL.createObjectURL(file);

    // Destroy existing waveform before creating a new one
    if (wavesurferInstance.current) {
      wavesurferInstance.current.destroy();
    }

    // Create new WaveSurfer instance
    wavesurferInstance.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
    });

    wavesurferInstance.current.load(fileUrl);
  };

  const callAPI = async () => {
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await axios.post(
        "http://localhost:8000/slidingaudiomatch",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data);
      console.log("Upload success:", response.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="p-4">
        <table>
            <tr>
                <td><input type="file" onChange={handleFile1Change} /></td>
                <td id="waveform1" className="tdclass"><div ref={waveformRef1} ></div></td> 
                {/* className="my-4 w-full h-24" */}
            </tr>
            <tr>
                <td><input type="file" onChange={handleFile2Change} /></td>
                <td id="waveform2" className="tdclass"><div ref={waveformRef2} ></div></td>
                {/* className="my-4 w-full h-24" */}
            </tr>
            <tr>
                <td></td>
                <td><button onClick={handleUpload} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Upload
      </button></td>
                
            </tr>

            <tr>
                <td></td>
                <td><div className="mt-4">
        {result && (
          <p>
            <b>Probability Score: {result["match score"]}</b>
          </p>
        )}
      </div></td>
            </tr>
        </table>
      
      

      
      

      

      
    </div>
  );
}
