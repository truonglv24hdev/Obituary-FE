"use client";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { IconPencil, IconPlus } from "@/components/icons";
import { Category } from "@/types/type";

interface FamilyTreeSectionProps {
  showFamilyTree: boolean;
  setShowFamilyTree: (value: boolean) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export default function FamilyTreeSection({
  showFamilyTree,
  setShowFamilyTree,
  categories,
  setCategories,
}: FamilyTreeSectionProps) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleMemberImageChange = (
    categoryId: string,
    memberId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategories(
        categories.map((cat) => {
          if (cat.id === categoryId) {
            return {
              ...cat,
              members: cat.members.map((m) =>
                m.id === memberId
                  ? { ...m, image: URL.createObjectURL(file) }
                  : m
              ),
            };
          }
          return cat;
        })
      );
    }
  };

  const handleMemberNameChange = (
    categoryId: string,
    memberId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            members: cat.members.map((m) =>
              m.id === memberId ? { ...m, name: e.target.value } : m
            ),
          };
        }
        return cat;
      })
    );
  };

  const addFamilyMember = (categoryId: string) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            members: [
              ...cat.members,
              {
                id: Math.random().toString(36).substr(2, 9),
                name: "",
                image: "/img/default-avatar.png",
              },
            ],
          };
        }
        return cat;
      })
    );
  };

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-[32px] museo font-medium">Family tree</h3>
          <span className="text-[32px] museo text-gray-500">
            (Max 4 categories)
          </span>
        </div>
        <Switch checked={showFamilyTree} onCheckedChange={setShowFamilyTree} />
      </div>

      {showFamilyTree && (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-10">
              <div className="flex items-center justify-between">
                <Input
                  value={category.category}
                  onChange={(e) =>
                    setCategories(
                      categories.map((cat) =>
                        cat.id === category.id
                          ? { ...cat, category: e.target.value }
                          : cat
                      )
                    )
                  }
                  placeholder="Category"
                  className="w-[121px] h-10 border-2 border-dashed border-gray-300 text-center museo text-lg font-medium"
                />
              </div>
              <div className="flex flex-wrap gap-10">
                {category.members.map((member) => (
                  <div
                    key={member.id}
                    className="text-center flex flex-col gap-4"
                  >
                    <div className="relative w-[140px] h-[140px] bg-gray-100 rounded-2xl overflow-hidden">
                      <Image
                        src={member.image || "/img/avatar.jpg"}
                        alt={member.name || "Member"}
                        width={220}
                        height={170}
                        className="w-[220px] h-[140px] rounded-2xl px-1 py-1 object-cover"
                      />
                      <svg
                        width="140"
                        height="140"
                        viewBox="0 0 140 140"
                        className="absolute top-0 left-0 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon
                          points="12,0 128,0 140,12 140,140 12,140 0,128 0,12"
                          fill="none"
                          stroke="#0000004D"
                          strokeWidth="1"
                        />
                      </svg>
                      <label className="absolute bottom-0 right-0 bg-[#699D99] text-white rounded-md h-7 w-7 flex items-center justify-center cursor-pointer">
                        <IconPencil className="relative w-4 h-4" />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleMemberImageChange(
                              category.id,
                              member.id,
                              e
                            )
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                    <Input
                      value={member.name}
                      onChange={(e) =>
                        handleMemberNameChange(category.id, member.id, e)
                      }
                      placeholder="Name"
                      className="mx-auto mt-2 border-gray-300 border-1 border-dashed rounded-none text-center w-[66px] h-[30px]"
                    />
                  </div>
                ))}
                {category.members.length < 5 && (
                  <button
                    type="button"
                    onClick={() => addFamilyMember(category.id)}
                    className="relative w-[140px] h-[140px] flex items-center justify-center group"
                  >
                    <svg
                      width="140"
                      height="140"
                      viewBox="0 0 140 140"
                      className="absolute top-0 left-0 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon
                        points="12,0 128,0 140,12 140,128 128,140 12,140 0,128 0,12"
                        fill="#E5F6EC80"
                        stroke="#0000004D"
                        strokeWidth="1"
                      />
                    </svg>
                    <IconPlus className="w-10 h-10 text-black relative z-10" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add new category */}
          {categories.length < 4 && (
            <div className="space-y-4">
              {isAddingCategory ? (
                <div className="flex items-center gap-4">
                  <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category name"
                    className="max-w-[300px]"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newCategoryName.trim()) {
                        setCategories([
                          ...categories,
                          {
                            id: Math.random().toString(36).substr(2, 9),
                            category: newCategoryName,
                            members: [],
                          },
                        ]);
                        setNewCategoryName("");
                        setIsAddingCategory(false);
                      }
                    }}
                    variant="secondary"
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setNewCategoryName("");
                      setIsAddingCategory(false);
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setIsAddingCategory(true)}
                    className="w-[157px] h-11 bg-teal-600 rounded font-light hover:bg-teal-700 text-white"
                  >
                    Add Category
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
