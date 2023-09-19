import React, { useState, useEffect, useRef } from "react";
import styles from "./ProfileLogo.module.css";
import beautiful from "../../images/tere.mp3";
import beautiful1 from "../../images/rom.mp3";
import beautiful2 from "../../images/jaldi.mp3";
import beautiful3 from "../../images/jhoot.mp3";
import beautiful4 from "../../images/kitne.mp3";
import beautiful5 from "../../images/maza.mp3";
import { getUser } from "../../service/LoginService";
const ProfileLogo = ({ imageUrl, altText, status }) => {
  const [isIdle, setIsIdle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [meme, setIsmeme] = useState("false");
  const audioRef = useRef(null);
  const user = getUser();

  const audioFiles = [
    beautiful,
    beautiful1,
    beautiful2,
    beautiful3,
    beautiful,
    beautiful4,
    beautiful,
    beautiful5,
    beautiful,
  ];

  // Select a random audio file from the array
  const randomAudioFile =
    audioFiles[Math.floor(Math.random() * audioFiles.length)];

  const togglePlay = (play) => {
    if (audioRef.current.paused && play) {
      if (user.firstname === 'MukeshBiscutChor'||user.firstname === 'Mukeshbiscutchor' || user.firstname === 'mukesh' || user.firstname === 'Mukesh') {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Audio playback error:", error);
            });
        }
      } else {
        audioRef.current.pause();
        setIsPlaying(false); // Assuming you want to set isPlaying to false when pausing
      }
      
      // const playPromise = audioRef.current.play();
      // if (playPromise !== undefined) {
      //   playPromise
      //     .then(() => {
      //       setIsPlaying(true);
      //     })
      //     .catch((error) => {
      //       console.log("Audio playback error:", error);
      //     });
      //   setIsPlaying(true);
      // }
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = randomAudioFile;
      audioRef.current.load();
      const parts = audioRef.current.src.split("/"); // Split the URL by "/"
      const fileName = parts[parts.length - 1]; // Get the last part of the URL
      const fileNameWithoutExtension = fileName.split(".")[0]; // Get the part before the first "."

      console.log(fileNameWithoutExtension);
      setIsmeme(fileNameWithoutExtension);
      console.log(audioRef.current.src);
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    let timeoutId;

    // Function to set the status to idle (yellow) after 5 seconds of inactivity
    const setToIdle = () => {
      setIsIdle(true);
    };

    // Reset the timer whenever a key is pressed or mouse movement is detected
    const handleActivity = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(setToIdle, 10000); // 5000 milliseconds = 5 seconds
      setIsIdle(false);
    };

    // Add event listeners for key presses and mouse movement
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("mousemove", handleActivity);

    // Initial setup: start the timer
    timeoutId = setTimeout(setToIdle, 10000); // 5000 milliseconds = 5 seconds

    // Clean up the event listeners and timer on unmount
    return () => {
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("mousemove", handleActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Control audio playback when status or isIdle changes
    if (isIdle) {
      togglePlay(true);
      setIsPlaying(true);
    } else if (status === "offline") {
      setIsPlaying(false);
    } else {
      togglePlay(false);
      setIsPlaying(false);
    }
  }, [isIdle, status]);
  console.log("profile");
  return (
    <div className={styles.adjust}>
      <div className={styles.profileLogo}>
        <div
          className={`${styles.statusDot} ${
            isIdle ? styles.idleDot : styles.onlineDot
          }`}
        ></div>
        <img src={imageUrl} alt={altText} className={styles.profileImage} />
      </div>
      <div>
        <audio ref={audioRef} controls autoPlay={isPlaying} loop>
          <source src={beautiful} type="audio/mpeg" />
        </audio>
      </div>
      <p>{isIdle ? "away..." : "online..."}</p>
      <p style={{fontSize: "7px"}}>
        {meme}
      </p>
    </div>
  );
};

export default ProfileLogo;
