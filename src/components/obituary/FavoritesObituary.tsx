import React from "react";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TFavorite, TFavoriteType } from "@/types/type";

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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Favorites</h3>
        <Switch checked={show} onCheckedChange={setShow} />
      </div>

      {show && (
        <div className="space-y-6">
          {/* Existing Favorites */}
          {favorites.map((favorite) => (
            <div key={favorite.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <span>{favorite.icon}</span>
                <span>{favorite.question}</span>
              </div>
              <Input
                value={favorite.answer}
                onChange={(e) => {
                  const newFavorites = favorites.map((f) =>
                    f.id === favorite.id ? { ...f, answer: e.target.value } : f
                  );
                  setFavorites(newFavorites);
                }}
                placeholder="Your response"
                className="w-full"
              />
            </div>
          ))}

          {/* Add New Favorite Options */}
          <div className="grid grid-cols-3 gap-4">
            {favoriteTypes.map((type) => (
              <Button
                key={type.id}
                onClick={() => addFavorite(type.id)}
                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <span>{type.icon}</span>
                <span className="text-sm">{type.label}</span>
              </Button>
            ))}
          </div>

          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => addFavorite("custom")}
          >
            Add Favorite
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavoritesObituary;
