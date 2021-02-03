import React from 'react';
import './App.css';
import Dropzone from 'react-dropzone';

const Drop = () => {
    return (
        <div className="main">
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div className="drop" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
    )
}

export default Drop;