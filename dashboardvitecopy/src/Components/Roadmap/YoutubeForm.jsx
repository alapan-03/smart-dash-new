import React, { useState } from 'react';
import url from "../../url"

const YouTubeForm = (props) => {
    const [youtubeLink, setYoutubeLink] = useState(null);
    const [iframeSrc, setIframeSrc] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        console.log(youtubeLink)
        e.preventDefault();
        setError(''); // Reset error message
        const videoId = extractVideoId(youtubeLink);
        if (videoId) {
            const src = `https://www.youtube.com/embed/${videoId}`;
            setIframeSrc(src); // Set the src for the iframe

            if(youtubeLink && youtubeLink.length>0){
            
                try {
                    const response = await fetch(`${url}/api/v1/resource/uploadLink`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',  // Add content-type header
                      },
                      body: JSON.stringify({
                        videoUrl: youtubeLink,
                        topicId: props.topicId,
                      }),
                    });
                  
                    // Check response status
                    if (response.ok) {
                      const data = await response.json();  // Parse JSON response only if request was successful
                      alert('Files uploaded successfully!');
                    } else {
                      // Handle non-200 responses
                      const errorText = await response.text();  // Read error message as text
                      console.error('Upload failed:', errorText);
                    }
                  } catch (err) {
                    console.error('Error occurred while uploading:', err.message);
                  }
                  
    }
}
    }

    // Function to extract video ID from YouTube URL
    const extractVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:v\/|u\/\w\/|embed\/|watch\?v=)|youtu\.be\/)([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null; // Return video ID or null if invalid
    };

    return (
        <div className='yt-form'>
            <div className='yt-form-inner'>
            <h2>Enter YouTube Link</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter YouTube link"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    required
                />
                <button type="submit">Verify & Extract</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {iframeSrc && (
                <div>
                    <h3>Embedded Video</h3>
                    <iframe
                        width="560"
                        height="315"
                        src={iframeSrc}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube Video"
                    ></iframe>
                </div>
            )}
            </div>
        </div>
    );
};

export default YouTubeForm;
