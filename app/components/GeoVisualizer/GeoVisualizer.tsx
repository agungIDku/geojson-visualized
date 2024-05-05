import 'leaflet/dist/leaflet.css';

import useGeoVisualizer from './useGeoVisualizer';

function GeoVisualizer() {
    const { clearData } = useGeoVisualizer()
    return (
        <div>
            <div className="m-2 p-4 bg-slate-500 rounded-lg">
                <div className='mb-6 flex justify-between items-center'>
                    <h3 className="text-xl font-bold">Visualized</h3>
                    <div className="flex items-center">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={clearData}>
                            Upload another GeoData
                        </button>
                    </div>
                </div>
                <div id="visualizer" className="h-[500px]" />
            </div>
        </div>
    )
}

export default GeoVisualizer