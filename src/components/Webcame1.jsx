import React, { useState, useRef } from 'react';
import dot from "../images/dot.gif";
import Image from 'react-bootstrap/Image';

function ObjectDetection() {
    const [objectCounts, setObjectCounts] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageurl, setimageurl] = useState(null);
    const [history, sethistory] = useState([]);
    const [loading, setloading] = useState(false);
    const [showWebcam, setShowWebcam] = useState(false);
    const webcamRef = useRef(null);


    const generate_url = (image) => {
        const url = URL.createObjectURL(image);
        return url;
    };

    const enableWebcam = () => {
        setShowWebcam(true);
        try{

            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                webcamRef.current.srcObject = stream;
            });
        }catch(e){
            console.log("image was not captured")
        }

    };

    const captureImage = () => {
        setObjectCounts({})
        try{

            const canvas = document.createElement('canvas');
            canvas.width = webcamRef.current.videoWidth;
            canvas.height = webcamRef.current.videoHeight;
            canvas.getContext('2d').drawImage(webcamRef.current, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                const file = new File([blob], 'webcam-image.png');
                setSelectedFile(file);
                sethistory([file,...history])
                setimageurl(generate_url(file));
                setShowWebcam(false);
                webcamRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }, 'image/png');
        }catch(e){
            console.log("Image was not captured")
        }
    };

    const detect = () => {
        const fetchData = async () => {
            setloading(true)
            try {

                if (!selectedFile) return; // Don't fetch if no file is selected

                console.log("Detecting OBJects: ")
                const url = 'https://api.ultralytics.com/v1/predict/vY89GpzxNSze7BxrYy72';
                const apiKey = 'd3236c56e0c9deef1ca041603bca401ea725581026';

                const formData = new FormData();
                formData.append('image', selectedFile);

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'x-api-key': apiKey,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                console.log("Response Data", responseData)

                // Count occurrences of each object class
                const classCounts = {};
                responseData.data.forEach((item) => {
                    const objClass = item.name;
                    classCounts[objClass] = (classCounts[objClass] || 0) + 1;
                });

                // Update state with the counts
                setObjectCounts(classCounts);
                console.log("objects detected: ", objectCounts)
            } catch (error) {
                console.error('Error fetching data:', error);
                setloading(false)
            }
            setloading(false)
        };

        fetchData();
        // setloading(false)
    };

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="row text-center pt-2" >
                    <h1>Live Image Identification</h1>
                </div>


                <div className="row  my-3">
               <div>
               <button className='btn btn-lg btn-warning' onClick={showWebcam ? captureImage : enableWebcam}>
                            {showWebcam ? 'Capture Image' : 'Enable Webcam'}
                 </button>
               </div>
                </div>

                <div className="row my-3">
                    <div className="col-lg-6 col-md-6">
                        {showWebcam ? (
                            <video ref={webcamRef} autoPlay muted style={{ width: '100%', height: 'auto' }} />
                        ) : (
                            imageurl && <Image className='img-responsive img-fluid' src={imageurl} alt="image" rounded />
                        )}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6" style={{ alignContent: 'center' }}>
                        {
                            loading ? <img src={dot} alt="loaing" style={{ width: '50%' }} /> :
                                <ul style={{ fontSize: '2rem', width: '50%' }}>
                                    {Object.entries(objectCounts).map(([className, count]) => (
                                        <li key={className} style={{ border: '3px solid black', borderRadius: '50px', textAlign: 'center', backgroundColor: 'yellow', marginTop: '2px', fontWeight: '500' }}>
                                            {className.toUpperCase()}: {count}
                                        </li>
                                    ))}
                                </ul>
                        }


                    </div>
                </div>

                <div className="row">
                    <div>

                        <button className='btn btn-lg btn-warning' disabled={!selectedFile || loading || showWebcam} onClick={detect}>Detect Object</button>
                    </div>
                </div>

                {/* Remaining code for object detection, history, etc. */}
                 {/* fifth row */}



                 {history.length > 0 && (
                    <div className='row mt-5' style={{ backgroundColor: 'yellow' }}>
                        <h1>Recent Images</h1>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                            {history.map((image, index) => (
                                <div key={`${image}${index}`} style={{ width: '15%', boxSizing: 'border-box', padding: '5px' }}>
                                    <img
                                        src={generate_url(image)}
                                        className='img-fluid'
                                        alt="image"
                                        style={{ width: '100%', height: 'auto' }}
                                        disabled={loading}
                                        onClick={!loading ? () => { setimageurl(generate_url(image)); setSelectedFile(image) } : undefined}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ObjectDetection;
