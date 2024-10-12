import React, { useEffect, useRef } from "react";
import salad from "../Assets/salad.jpg";

const Home1 = () => {
  const tempLeftArray = [
    {
      logo: salad,
      name: "Chicken salad",
      description:
        "ou can also add error logging inside your action methods to capture the exact issue if the request is reaching the server but failing during processin",
    },
    {
      logo: salad,
      name: "Chicken salad",
      description:
        "ou can also add error logging inside your action methods to capture the exact issue if the request is reaching the server but failing during processin",
    },
    {
      logo: salad,
      name: "Chicken salad",
      description:
        "ou can also add error logging inside your action methods to capture the exact issue if the request is reaching the server but failing during processin",
    },
    {
      logo: salad,
      name: "Chicken salad",
      description:
        "ou can also add error logging inside your action methods to capture the exact issue if the request is reaching the server but failing during processin",
    },
    {
      logo: salad,
      name: "Chicken salad",
      description:
        "ou can also add error logging inside your action methods to capture the exact issue if the request is reaching the server but failing during processin",
    },
    {
      logo: salad,
      name: "Chicken salad",
      description:
        "ou can also add error logging inside your action methods to capture the exact issue if the request is reaching the server but failing during processin",
    },
  ];

  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault(); // Prevent the default scroll behavior
      const delta = event.deltaY; // Get the scroll direction

      if (contentRef.current) {
        contentRef.current.scrollTop += delta; // Move the content based on the scroll direction
      }
    };

    const contentElement = contentRef.current;

    // Add non-passive event listener
    contentElement.addEventListener('wheel', handleScroll, { passive: false });

    // Cleanup function to remove the event listener
    return () => {
      contentElement.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="w-100 home1 d-flex">
      <div className="left-content" ref={contentRef}>
        {tempLeftArray.map((item, id) => {
          return (
            <div className="d-flex align-items-center flex-column m-3">
              <img className="left-logo" src={item.logo} alt="" />
              <div className="left-text">{item.name}</div>
            </div>
          );
        })}
      </div>
      <div className="right-content">
        {tempLeftArray.map((item, id) => {
          return (
            <div className="d-flex align-items-center flex-column my-5 mx-3">
              <div className="right-text w-100">{item.name}</div>
              <div className="right-desc">{item.description}</div>
            </div>
          );
        })}
      </div>

      <img className="circle" alt="" src={salad} />
    </div>
  );
};

export default Home1;
