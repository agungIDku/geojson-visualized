'use client'

import useUpload from "./useUpload";

function FileUpload() {
    const { handleChoosenFile } = useUpload();
    return (
        <div className="flex justify-center items-center h-screen">
            <label className="drop-container" id="dropcontainer">
                <span className="drop-title">Drop GeoJSON file here</span>
                or
                <input type="file" id="images" accept=".geojson" required className="dropinput" onChange={handleChoosenFile} />
            </label>
        </div>
    );
}

export default FileUpload;

