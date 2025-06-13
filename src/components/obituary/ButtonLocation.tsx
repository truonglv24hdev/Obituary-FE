import React from "react";
import { Button } from "../ui/button";
import { IconLocation } from "../icons";

type Props = {
  onLocationRetrieved: (address: string) => void;
  className?: string;
};

const ButtonLocation: React.FC<Props> = ({ onLocationRetrieved, className }) => {
  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.display_name || "Unknown location";

          onLocationRetrieved(address);
        } catch (error) {
          console.error("Reverse geocoding failed", error);
          alert("Unable to retrieve address from location.");
        }
      },
      (error) => {
        console.error("Geolocation error", error);
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <Button
      type="button"
      size="sm"
      className={`bg-white mt-3 rounded-[2px] hover:bg-[#5c8e8a] text-black ${className}`}
      onClick={handleClick}
    >
      <IconLocation className="w-4 h-4" /> Location
    </Button>
  );
};

export default ButtonLocation;
