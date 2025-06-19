import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TFavorite, TFavoriteType } from "@/types/type";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

  return (
    <div className="space-y-6 relative  flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-[32px] museo font-medium">Favorites</h3>
        <Switch checked={show} onCheckedChange={setShow} />
      </div>

      {show && (
        <div className="relative flex-1 flex flex-col space-y-6">
          {/* Overlay Favorite Options */}
          {showFavoriteOptions && (
            <div className="absolute w-[723px] h-[240px] bg-[#FAFAFA] z-50 py-5 px-7 right-0 bottom-8 flex flex-col gap-6 shadow-lg">
              <div className="grid grid-cols-3 gap-4">
                {favoriteTypes.map((type) => (
                  <Button
                    type="button"
                    key={type.id}
                    onClick={() => {
                      addFavorite(type.id);
                      setShowFavoriteOptions(false);
                    }}
                    className="flex border-none rounded-none shadow-none hover:bg-gray-300 bg-[#FAFAFA] justify-start transition-colors w-[224px] h-5 gap-4"
                  >
                    <i className={`${type.icon} text-black`}></i>
                    <span className="text-sm text-black">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Existing Favorites */}
          <div
            className={`flex flex-col border-blue overflow-auto rounded border p-5 gap-10`}
          >
            {favorites.map((favorite) => (
              <div key={favorite.id} className="flex flex-col gap-3 w-[950px] h-14">
                <div className="flex items-center gap-2 text-base museo font-light">
                  <i className={favorite.icon}></i>
                  <span>{favorite.question}</span>
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
                  className="w-[156px] h-6 border-dashed border-[#00000080] rounded-none"
                />
              </div>
            ))}
          </div>

          {/* Add Favorite Button at Bottom Right */}
          <div className="mt-auto flex justify-end">
            <Button
              type="button"
              className="w-[157px] h-11 bg-teal-600 rounded font-light hover:bg-teal-700 text-white"
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
