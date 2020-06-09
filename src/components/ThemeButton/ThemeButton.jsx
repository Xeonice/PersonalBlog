import React, { useRef, useEffect, useState } from "react";
import useDarkMode from 'use-dark-mode';
import Lottie from "lottie-react-web";
import './index.css';

const options = Object.freeze({
  animationData: require("./animationData.json"),
  autoplay: false,
  loop: true
});

const NightModeToggle = ({ size = 36, checked = false, onChange, speed = 1.3, darkMode, ...extraProps }) => {
  const ref = useRef();
  const [progress, setProgress] = useState(() => 0);
  useEffect(() => {
    if (progress >= 0.5) {
      if (checked) {
        ref.current.anim.pause();
      } else if (ref.current.anim.isPaused) {
        ref.current.anim.play();
      }
    } else if (!checked) {
      ref.current.anim.pause();
    }
  }, [checked, progress]);
  useEffect(() => (!!checked && ref.current.anim.play()) || undefined, []);
  const [eventListeners] = useState(() => [
    {
      eventName: "enterFrame",
      callback: ({ currentTime, totalTime }) =>
        setProgress(currentTime / totalTime)
    }
  ]);
  return (
    <button
      onClick={() => ref.current.anim.isPaused && onChange(!checked)}
      className="mode-toggle-control"
      style={{
        width: size,
        height: size * 0.47,
        padding: 0,
      }}
      aria-hidden='true'
    >
      <div
        className="mode-click-container"
        style={{
          marginTop: size * -0.595,
          marginLeft: size * -0.32,
          width: size * 1.65,
          height: size * 1.65
        }}
      >
        <Lottie
          key="$preventGlitches"
          ref={ref}
          speed={speed}
          isClickToPauseDisabled
          eventListeners={eventListeners}
          forceSegments
          options={options}
        />
      </div>
    </button>
  );
};

const DarkModeToggle = ({ onChange }) => {
  const darkMode = useDarkMode(true, {
    onChange
  });

  return (
    <NightModeToggle checked={darkMode.value} onChange={darkMode.toggle} darkMode={darkMode} />
  );
};

export default DarkModeToggle;
