"use client";

import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import Image from "next/image";
import { Media } from "../../../types";

export default function DynamicMediaDisplay() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const { width, height } = useWindowSize();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newMediaList: Media[] = [];
      Array.from(event.target.files).forEach((file, index) => {
        const fileType = file.type.startsWith("image/") ? "image" : "video";
        const src = URL.createObjectURL(file);

        newMediaList.push({ id: index, type: fileType, src });
      });

      setMediaList(newMediaList);
      setCurrentIndex(0); 
    }
  };

  useEffect(() => {
    if (mediaList.length > 1) {
      const currentMedia = mediaList[currentIndex];

      if (currentMedia.type === "image") {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaList.length);
        }, 10000);

        return () => clearInterval(interval);
      } else if (currentMedia.type === "video") {
        const videoElement = videoRef.current;

        const handleVideoEnd = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaList.length);
        };

        if (videoElement) {
          videoElement.addEventListener("ended", handleVideoEnd);
        }

        return () => {
          if (videoElement) {
            videoElement.removeEventListener("ended", handleVideoEnd);
          }
        };
      }
    }
  }, [mediaList, currentIndex]);

  return (
    <div className="relative h-screen w-full flex justify-center items-center">
      {mediaList.length === 0 ? (
        <div className="flex flex-col items-center">
          <button className="border-0 border-baby-blue bg-transparent px-2 py-3 rounded-xl animate-pulse">
            <label className="cursor-pointer double__color--btn text-white px-4 py-2 rounded-lg font-bold text-2xl animate-pulse">
              Upload Media
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaUpload}
                className="hidden"
              />
            </label>
          </button>
          <p className="absolute bottom-5 mt-4 bg-lava-red text-white p-2">Please upload content to display</p>
        </div>
      ) : (
        mediaList.map((media, index) =>
          index === currentIndex ? (
            media.type === "image" ? (
              <Image
                key={media.id}
                src={media.src}
                alt="User Uploaded Content"
                className="py-8"
                style={{ width: width * 0.75, height: height, objectFit: "contain" }}
                width={width * 0.75}
                height={height}
              />
            ) : (
              <video
                key={media.id}
                ref={videoRef}
                src={media.src}
                style={{ width: width * 0.75, height: height, objectFit: "contain" }}
                autoPlay
                muted
              />
            )
          ) : null
        )
      )}
    </div>
  );
}