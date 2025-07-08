import React, { useEffect, useRef, useState } from "react";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TFavorite, TFavoriteType } from "@/types/type";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { IconCancel, IconDelete } from "../icons";

interface FavoritesSectionProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  favorites: TFavorite[];
  setFavorites: React.Dispatch<React.SetStateAction<TFavorite[]>>;
  favoriteTypes: TFavoriteType[];
  addFavorite: (typeId: string) => void;
}

const FavoritesObituary: React.FC<FavoritesSectionProps> = ({
  show,
  setShow,
  favorites,
  setFavorites,
  favoriteTypes,
  addFavorite,
}) => {
  const [showFavoriteOptions, setShowFavoriteOptions] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");
  const [customAnswer, setCustomAnswer] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFavoriteOptions(false);
      }
    };

    if (showFavoriteOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFavoriteOptions]);

  const handleAddCustomFavorite = () => {
    if (customQuestion.trim() && customAnswer.trim()) {
      const newFavorite: TFavorite = {
        id: `custom-${Date.now()}`,
        type: "custom",
        question: customQuestion,
        answer: customAnswer,
        icon: "fa-solid fa-question",
      };
      setFavorites([...favorites, newFavorite]);
      setCustomQuestion("");
      setCustomAnswer("");
      setShowCustomForm(false);
    }
  };

  return (
    <div className=" space-y-6 relative z-[10]">
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-4">
        <h3 className="text-[32px] museo font-medium">Favorites</h3>
        <Switch checked={show} onCheckedChange={setShow} />
      </div>

      {show && (
        <div className="relative flex flex-col gap-10 z-[50]">
          {/* Favorite Options Dropdown */}
          {showFavoriteOptions && (
            <div
              ref={dropdownRef}
              className="
                absolute 
                w-full sm:w-[723px] 
                h-auto sm:h-[240px] 
                bg-[#FAFAFA] 
                z-[9999] 
                py-5 px-4 sm:px-7 
                right-0 bottom-14 
                flex flex-col gap-6 
                shadow-lg border border-gray-300
              "
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {favoriteTypes.map((type) => (
                  <Button
                    type="button"
                    key={type.id}
                    onClick={() => {
                      if (type.id === "custom") {
                        setShowFavoriteOptions(false);
                        setShowCustomForm(true);
                        setCustomQuestion("");
                        setCustomAnswer("");
                      } else {
                        addFavorite(type.id);
                        setShowFavoriteOptions(false);
                      }
                    }}
                    className="
                      flex 
                      border-none rounded-none shadow-none 
                      hover:bg-gray-300 bg-[#FAFAFA] 
                      justify-start transition-colors 
                      w-full sm:w-[224px] 
                      h-10 sm:h-5 gap-4
                    "
                  >
                    <i className={`${type.icon} text-black`}></i>
                    <span className="text-sm text-black">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Favorites List */}
          {favorites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border overflow-auto rounded border-gray-200 p-5">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-base museo font-light">
                      <i className={favorite.icon}></i>
                      <span>{favorite.question}</span>
                    </div>
                    <Button
                      type="button"
                      className="w-5 h-5 bg-white rounded border shadow-sm hover:bg-gray-300"
                      onClick={() => {
                        setFavorites(
                          favorites.filter((f) => f.id !== favorite.id)
                        );
                      }}
                    >
                      <IconDelete className="w-4 h-4 text-black" />
                    </Button>
                  </div>
                  <Input
                    value={favorite.answer}
                    onChange={(e) => {
                      const newFavorites = favorites.map((f) =>
                        f.id === favorite.id
                          ? { ...f, answer: e.target.value }
                          : f
                      );
                      setFavorites(newFavorites);
                    }}
                    placeholder="Your response"
                    className="w-full h-8 border-dashed border-[#00000080] rounded-none"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Custom Form */}
          {showCustomForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div
                className="
                  bg-white 
                  px-4 sm:px-6 py-6
                  rounded-md shadow-md border border-gray-200 
                  flex flex-col gap-10 
                  w-full max-w-[600px] 
                  mx-4 sm:mx-0 
                  box-border overflow-hidden
                "
              >
                <div className="flex justify-between">
                  <h2 className="text-[32px] font-medium">Favorites</h2>
                  <button
                    onClick={() => setShowCustomForm(false)}
                    className="top-5 right-5 text-gray-600 hover:text-black"
                  >
                    <IconCancel className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-base font-light museo">
                      Custom Question
                    </p>
                    <Input
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      placeholder="What was John Doe Favorite ...?"
                      className="w-full h-12 border-dashed border-[#00000080] rounded placeholder:text-black placeholder:museo"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-base font-light museo">Your response</p>
                    <Input
                      value={customAnswer}
                      onChange={(e) => setCustomAnswer(e.target.value)}
                      placeholder="Write your response here..."
                      className="w-full h-12 border-dashed border-[#00000080] rounded placeholder:text-black placeholder:museo"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={handleAddCustomFavorite}
                    className="w-[108px] h-11 px-7 py-2 rounded text-base museo font-light bg-teal-600 text-white hover:bg-teal-700"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Add Favorite Button */}
          <div className="mt-auto flex justify-center sm:justify-end">
            <Button
              type="button"
              className="w-full sm:w-[157px] h-11 bg-teal-600 rounded font-light hover:bg-teal-700 text-white"
              onClick={() => setShowFavoriteOptions((prev) => !prev)}
            >
              Add Favorite
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesObituary;
