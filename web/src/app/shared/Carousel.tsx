import { useState, useEffect } from "react";
import React from "react";
import "./styles/Carousel.css";

interface CarouselProps {
  children: React.ReactNode;
  onSlideChange?: (index: number) => void;
}

export default function Carousel({ children, onSlideChange }: CarouselProps) {
  const [counter, setCounter] = useState<number>(1);
  const [pause, setPause] = useState<boolean>(false);
  const childrenArray = React.Children.toArray(children);

  const handleNext = () => {
    if (counter !== childrenArray.length) {
      setCounter(counter + 1);
      onSlideChange?.(counter);
    } else {
      setCounter(1);
      onSlideChange?.(0);
    }
  };

  const handlePrev = () => {
    if (counter !== 1) {
      setCounter(counter - 1);
      onSlideChange?.(counter - 2);
    } else {
      setCounter(childrenArray.length);
      onSlideChange?.(childrenArray.length - 1);
    }
  };

  const handlePage = (page: number) => {
    setCounter(page);
    onSlideChange?.(page - 1);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (!pause) {
        if (counter !== childrenArray.length) {
          setCounter(counter + 1);
          onSlideChange?.(counter);
        } else {
          setCounter(1);
          onSlideChange?.(0);
        }
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [counter, pause, childrenArray.length, onSlideChange]);

  return (
    <div className="App">
      <div
        className="slide"
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        {childrenArray.map((item, index) => (
          <div
            className={counter - 1 === index ? "show" : "not-show"}
            key={index}
          >
            {item}
          </div>
        ))}

        <button className="prev text-white text-4xl" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="next text-white text-4xl" onClick={handleNext}>
          &#10095;
        </button>
      </div>

      <div className="page">
        {childrenArray.map((item, index) => (
          <span
            key={index}
            className={counter - 1 === index ? "dot active" : "dot"}
            onClick={() => handlePage(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}
