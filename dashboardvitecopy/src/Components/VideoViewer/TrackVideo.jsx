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

  const sendWatchTimeToBackend = async (timeSpent) => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/student/videoWatchTime/66e65945dee0c2b19777ee57', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId:"66e4685083b9637556d6b1ba",
          videoId,
          timeSpent: (timeSpent / 60), // Convert to minutes
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send watch time');
      }
      else{
        console.log(await response.json())
      }

      const response2 = await fetch('http://127.0.0.1:8080/api/v1/student/updateResourceTime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId:"66e4685083b9637556d6b1ba",
          // videoId,
          timeInMinutes: (timeSpent / 60), // Convert to minutes
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send resource time');
      }
      else{
        console.log(await response.json())
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div id="player"></div>
    </div>
  );
};

export default TrackVideo;
