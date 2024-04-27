import React, { useState, useEffect, useRef } from 'react';
import dot from "../images/dot.gif";

import Image from 'react-bootstrap/Image';

function ObjectDetection({
    objectCounts,
    setObjectCounts,
    selectedFile,
    setSelectedFile,
    imageurl,
    setimageurl,
    history,
    sethistory,
    loading,
    setloading,
    imgref
}) {
    // const [objectCounts, setObjectCounts] = useState({});
    // const [selectedFile, setSelectedFile] = useState(null);
    // const [imageurl, setimageurl] = useState(null)
    // const [history, sethistory] = useState([])
    // const [loading, setloading] = useState(false)
    // const imgref = useRef();


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            // const url = URL.createObjectURL(file);
            setimageurl(generate_url(file));
            sethistory([file, ...history]);
        }
    };

    const generate_url = (image) => {
        const url = URL.createObjectURL(image)
        return url
    }


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
                <div className="row text-center pt-2" style={{ backgroundColor: 'yellow' }}>
                    <h1>Image Identification</h1>
                </div>

                {/* 2nd row  */}
                <div className="row  my-3">
                    <input type="file" onChange={handleFileChange} ref={imgref} style={{ height: 0, width: 0, visibility: 'hidden' }} />
                    <div>

                        <button className='btn btn-lg btn-warning' onClick={() => imgref.current.click()}>Upload Image</button>
                    </div>



                </div>

                {/* 3rd row  */}
                <div className="row my-5">
                    <div className="col-lg-6 col-md-6">
                        {
                            imageurl &&
                            <Image className='img-responsive img-fluid' src={imageurl} alt="image" rounded />
                        }
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






                {/* 4rth row  */}
                <div className="row">
                    <div>

                        <button className='btn btn-lg btn-warning' disabled={!selectedFile || loading} onClick={detect}>Detect Object</button>
                    </div>
                </div>


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
                                        onClick={() => { setimageurl(generate_url(image)); setSelectedFile(image) }}
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
