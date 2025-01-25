import { useEffect, useRef, useState } from 'react';
import "./style.css"


const TrackVideo = ({ videoId, userId }) => {
  const playerRef = useRef(null);
  const startTimeRef = useRef(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  useEffect(() => {
    // Load YouTube API
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    script.onload = () => {
      window.YT.ready(() => {
        playerRef.current = new window.YT.Player('player', {
          videoId: videoId,
          events: {
            'onStateChange': onPlayerStateChange,
            'onReady': onPlayerReady,
          },
        });
      });
    };

    // Track tab close or navigation
    const handleBeforeUnload = (event) => {
      if (startTimeRef.current) {
        const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
        sendWatchTimeToBackend(elapsedTime);  // Send remaining time
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [videoId]);

  const onPlayerReady = (event) => {
    console.log('Player Ready');
  };

  const onPlayerStateChange = (event) => {
    const playerState = event.data;
    if (playerState === window.YT.PlayerState.PLAYING) {
      startTimeRef.current = Date.now();
    } else if (playerState === window.YT.PlayerState.PAUSED || playerState === window.YT.PlayerState.ENDED) {
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000; // In seconds
      setTotalTimeSpent((prev) => prev + elapsedTime);
      sendWatchTimeToBackend(elapsedTime);
    }
  };

  const sendWatchTimeToBackend = async (timeSpent, videoId) => {
    try {
      // Convert timeSpent to minutes (rounded to 2 decimal places for precision)
      const timeInMinutes = parseFloat((timeSpent / 60).toFixed(2));
      const userId = "67037ca9ca0f48418cf7dc4b";
  
      // First API call: Send watch time
      const response1 = await fetch('http://127.0.0.1:8080/api/v1/student/videoWatchTime/66e65945dee0c2b19777ee57', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          videoId,
          timeSpent: timeInMinutes,
        }),
      });
  
      if (!response1.ok) {
        const errorDetails = await response1.json();
        throw new Error(`Failed to send watch time: ${errorDetails.message || 'Unknown error'}`);
      } else {
        console.log('Video watch time response:', await response1.json());
      }
  
      // Second API call: Update resource time
      const response2 = await fetch('http://127.0.0.1:8080/api/v1/student/updateResourceTime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          timeInMinutes,
        }),
      });
  
      if (!response2.ok) {
        const errorDetails = await response2.json();
        throw new Error(`Failed to send resource time: ${errorDetails.message || 'Unknown error'}`);
      } else {
        console.log('Resource time update response:', await response2.json());
      }
    } catch (error) {
      console.error('Error:', error.message || error);
    }
  };
  
  return (
    <div>
      <div id="player"></div>
    </div>
  );
};

export default TrackVideo;
