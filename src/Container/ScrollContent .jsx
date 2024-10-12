import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollContent = () => {
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  useEffect(() => {
    // Scroll down for left content
    gsap.to(leftContentRef.current, {
      yPercent: 100, // Scrolls down
      ease: 'none',
      scrollTrigger: {
        trigger: leftContentRef.current,
        start: "top top",  // Trigger when the top of the element hits the top of the viewport
        end: "bottom top", // End when the bottom of the element hits the top of the viewport
        scrub: true,       // Smooth scrolling animation
      },
    });

    // Scroll up for right content
    gsap.to(rightContentRef.current, {
      yPercent: -100, // Scrolls up
      ease: 'none',
      scrollTrigger: {
        trigger: rightContentRef.current,
        start: "top top",  // Same triggers but reversed motion
        end: "bottom top",
        scrub: true,
      },
    });

    // Clean up animations on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="scroll-container">
      <div className="left-content" ref={leftContentRef}>
        <ul>
          <li>Left Item 1</li>
          <li>Left Item 2</li>
          <li>Left Item 3</li>
          <li>Left Item 4</li>
          <li>Left Item 5</li>
        </ul>
      </div>
      <div className="right-content" ref={rightContentRef}>
        <ul>
          <li>Right Item A</li>
          <li>Right Item B</li>
          <li>Right Item C</li>
          <li>Right Item D</li>
          <li>Right Item E</li>
        </ul>
      </div>
    </div>
  );
};

export default ScrollContent;
