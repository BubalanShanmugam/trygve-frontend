import { useState } from "react";
import './Onboard.css';

const slides = [
  {
    image: "/1.png",
    title: "Your Health, Our Priority",
    desc: "Trusted doctors and care at your doorstep.",
  },
  {
    image: "/2.png",
    title: "Seamless Care, Delivered",
    desc: "Consult, treat, and heal—hassle-free.",
  },
  {
    image: "/3.png",
    title: "Affordable Healthcare For Everyone",
    desc: "Quality care for every budget.",
  },
  {
    image: "/4.png",
    title: "Trygve",
    desc: "Trusted Guardian of Life",
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handleSkip = () => {
    setCurrent(slides.length - 1);
  };

  return (
    <div className="onboarding-container">
      <div
        className="slider"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={`slide-${index}`} />
            <div className="overlay">
              <h1>{slide.title}</h1>
              <p>{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <div className="dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${current === idx ? "active" : ""}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
        <div className="buttons">
          {current < slides.length - 1 ? (
            <>
              <button onClick={handleSkip}>Skip</button>
              <button onClick={handleNext}>Next →</button>
            </>
          ) : (
            <button className="get-started">Get Started</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
