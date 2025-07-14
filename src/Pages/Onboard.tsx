import React, { useState } from 'react';
import './Onboard.css';
import { useNavigate } from 'react-router-dom'; // ✅


import Img1 from '/1.png';
import Img2 from '/2.png';
import Img3 from '/3.png';
import Img4 from '/4.png';

const slides = [
  {
    image: Img1,
    title: 'Trygve',
    desc: 'Trusted Guardian of Life',
  },
  {
    image: Img2,
    title: 'Your Health, Our Priority',
    desc: 'Trusted doctors and care at your doorstep',
  },
  {
    image: Img3,
    title: 'Seamless Care, Delivered',
    desc: 'Consult, treat, and heal — hassle-free',
  },
  {
    image: Img4,
    title: 'Affordable Healthcare for Everyone',
    desc: 'Quality care for every budget',
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
  };

  const skipSlide = () => setCurrent(slides.length - 1);

  return (
    <div className="onboarding-container">
      <div className="slider" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            {/* ✅ Image */}
            <img src={slide.image} alt={`slide-${index}`} className="background-image" />

            {/* ✅ Bluish overlay */}
            <div className="overlay"></div>

            {/* ✅ Centered content */}
            <div className="content">
              <h1>{slide.title}</h1>
              <p>{slide.desc}</p>
              {current === slides.length - 1 && (
                <button className="get-started" onClick={() => navigate('/welcome')}>
      Get Started
    </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <div className="dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <div className={`buttons${current === slides.length - 1 ? ' center' : ''}`}>
          { current !== slides.length - 1 && (
            <>
              <button className="link-btn" onClick={skipSlide}>
                Skip
              </button>
              <button className="link-btn" onClick={nextSlide}>
                Next &rarr;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
