import React, { useEffect, useState } from "react";
import { cloudData } from "../constants/clouds";

interface Cloud {
  id: number;
  clicked: boolean;
  validClick: boolean;
  animationDelay: number;
}

export const Clouds: React.FC = () => {
  const [clouds, setClouds] = useState<Cloud[] | null>(null);
  const [currentClick, setCurrentClick] = useState(0);

  useEffect(() => {
    const randomizedOrder = shuffleArray(cloudData);
    setClouds(randomizedOrder);
  }, []);

  const handleCloudClick = (cloud: Cloud) => {
    if (!clouds) return;
    if (cloud.id === currentClick + 1) {
      setClouds((prevClouds: any) => {
        return prevClouds.map((prevCloud: any) =>
          prevCloud.id === cloud.id
            ? { ...prevCloud, validClick: true, clicked: true }
            : prevCloud
        );
      });
      setCurrentClick((prev) => prev + 1);
    } else {
      setClouds((prevClouds: any) => {
        return prevClouds.map((prevCloud: any) =>
          prevCloud.id === cloud.id
            ? { ...prevCloud, validClick: false, clicked: true }
            : prevCloud
        );
      });
    }
  };

  const shuffleArray = (array: Cloud[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const getCloudStyle = (cloud: Cloud) => {
    return {
      animationName: `cloud${cloud.id}`,
      animationDelay: `${cloud.animationDelay}s`,
    };
  };

  const generateAnimationKeyframes = () => {
    let animationStyles = "";
    clouds?.forEach((cloud) => {
      animationStyles += `
        @keyframes cloud${cloud.id} {
          0% {
            left: -200px;
            visibility: hidden;
          }
          1% {
            visibility: visible;
          }
          100% {
            left: 100%;
            visibility: hidden;
          }
        }
      `;
    });
    return animationStyles;
  };

  return (
    <div className="sky">
      <style>{generateAnimationKeyframes()}</style>
      {clouds?.map((cloud) => {
        let cloudBorderColor = "";
        if (cloud.clicked) {
          cloudBorderColor = cloud.validClick ? "border-green" : "border-red";
        }
        return (
          <div
            key={cloud.id}
            className={`cloud ${cloudBorderColor}`}
            style={getCloudStyle(cloud)}
            onClick={() => {
              !cloud.clicked && handleCloudClick(cloud);
            }}
          >
            {cloud.id}
          </div>
        );
      })}
    </div>
  );
};
