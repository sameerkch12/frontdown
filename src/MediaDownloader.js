import React, { useState } from 'react';
import axios from 'axios';

function MediaDownloader() {
    const [url, setUrl] = useState('');
    const [mediaData, setMediaData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/download', { url });
            setMediaData(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setMediaData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h3 className="text-2xl font-semibold mb-4">Sam Downloader</h3>
            <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-lg w-80">
                <input 
                    type="text" 
                    className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter Facebook/Instagram URL" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                />
                <button 
                    onClick={handleDownload} 
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Download
                </button>
                {loading && <p className="text-blue-500">Please wait...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {mediaData && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Media Data</h2>
                        {mediaData.data.map((item, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                <p className="mb-2">Resolution: {item.resolution}</p>
                                <img src={item.thumbnail} alt="Thumbnail" className="w-full h-auto mb-2" />
                                <div className="flex justify-center">
                                    <a 
                                        href={item.url} 
                                        download 
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MediaDownloader;
