"use client";

import Image from "next/image";
import IconFilterDrop from "@/components/icons/IconFilterDrop";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { putMemorial } from "@/lib/memorialAPI";

interface GallerySectionProps {
  id: string;
  showGallery: boolean;
  setShowGallery: (value: boolean) => void;
  allowVisitorPhotos: boolean;
  setAllowVisitorPhotos: (value: boolean) => void;
  moderationType: "pre" | "post";
  setModerationType: (value: "pre" | "post") => void;
  requireEmail: boolean;
  setRequireEmail: (value: boolean) => void;
  galleryOldImages: string[];
  galleryImages: File[];
  handleGalleryFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveGalleryImage: (type: "old" | "new", idx: number) => void;
  addGalleryFolder: () => void;
}

const Gallery = ({
  id,
  showGallery,
  setShowGallery,
  allowVisitorPhotos,
  setAllowVisitorPhotos,
  moderationType,
  setModerationType,
  requireEmail,
  setRequireEmail,
  galleryOldImages,
  galleryImages,
  handleGalleryFilesChange,
  handleRemoveGalleryImage,
  addGalleryFolder,
}: GallerySectionProps) => {
  return (
    <div className="space-y-6">
      {/* Gallery Title */}
      <div className="flex sm:flex-row items-center justify-between gap-3">
        <h3 className="text-[28px] sm:text-[32px] text-[#699D99] font-medium">
          Gallery
        </h3>
        <Switch checked={showGallery} onCheckedChange={setShowGallery} />
      </div>

      {/* Gallery Toolbar */}
      {showGallery && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:h-[72px] border items-start lg:items-center justify-between bg-white shadow-md px-5 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <span className="text-[14px] museo text-gray-700">
                Organize your photos in folder
              </span>
              <Button
                onClick={addGalleryFolder}
                size="sm"
                className="bg-[#699D99] hover:bg-[#4e7c7a] text-[14px] museo text-white w-fit h-10 rounded px-4 py-[5px]"
                type="button"
              >
                Add folder
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[14px] museo text-gray-700">
                  Allow visitors to add photos
                </span>
                <Switch
                  checked={allowVisitorPhotos}
                  onCheckedChange={async (value) => {
                    setAllowVisitorPhotos(value);
                    const formData = new FormData();
                    formData.append("add_photos", String(value));
                    await putMemorial(id, formData);
                  }}
                  className="bg-blue-700"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-white border text-[14px] museo h-10 w-fit border-[#699D99] text-[#699D99] rounded px-3 py-[5px] hover:bg-[#e5f6ec]"
                      type="button"
                    >
                      Moderation
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    align="end"
                    className="w-[322px] flex flex-col h-auto rounded px-6 py-5 gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="font-semibold text-base museo">
                        Moderation type
                      </div>
                      <Select
                        value={moderationType}
                        onValueChange={async (value: "post" | "pre") => {
                          setModerationType(value);
                          const formData = new FormData();
                          formData.append("moderation", value);
                          await putMemorial(id, formData);
                        }}
                      >
                        <SelectTrigger className="text-sm w-[259px] museo h-10 rounded border border-[#699D99] text-[#699D99] bg-white px-3">
                          <SelectValue placeholder="Select moderation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="post">Post-Moderation</SelectItem>
                          <SelectItem value="pre">Pre-Moderation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-sm font-light museo">
                      <div className="mb-2">
                        <span className="font-semibold">Post-moderation:</span>{" "}
                        new photos are automatically published. You can erase
                        them when necessary.
                      </div>
                      <div>
                        <span className="font-semibold">Pre-moderation:</span>{" "}
                        by default, new photos are not displayed... until
                        explicitly approved by you.
                      </div>
                    </div>
                    <div className="border" />
                    <div className="flex items-center gap-2">
                      <Checkbox
                        className="rounded-2xl"
                        checked={requireEmail}
                        onCheckedChange={async (checked) => {
                          const newValue = Boolean(checked);
                          setRequireEmail(newValue);
                          const formData = new FormData();
                          formData.append("require_email", String(newValue));
                          await putMemorial(id, formData);
                        }}
                        id="require-email"
                      />
                      <label
                        htmlFor="require-email"
                        className="text-[12px] museo cursor-pointer"
                      >
                        Require e-mail address
                      </label>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  size="sm"
                  type="button"
                  className="bg-[#699D99] w-[104px]  hover:bg-[#4e7c7a] text-[14px] museo text-white rounded h-10 px-3 py-[5px] flex items-center justify-between"
                >
                  Filter
                  <IconFilterDrop className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryOldImages.map((imgUrl, idx) => (
              <div
                key={`old-${idx}`}
                className="relative w-full aspect-square rounded-lg overflow-hidden"
                onClick={() => handleRemoveGalleryImage("old", idx)}
                title="Click để xóa ảnh này"
              >
                <Image
                  src={`https://obituary-be-production.up.railway.app${imgUrl}`}
                  alt={`gallery-old-${idx}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
            {galleryImages.map((file, idx) => (
              <div
                key={`new-${idx}`}
                className="relative w-full aspect-square rounded-lg overflow-hidden"
                onClick={() => handleRemoveGalleryImage("new", idx)}
                title="Click để xóa ảnh này"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              id="gallery-upload"
              className="hidden"
              onChange={handleGalleryFilesChange}
            />
            <Button
              className="w-full sm:w-[211px] museo text-base h-12 rounded px-7 py-2 bg-[#699D99] mb-5"
              onClick={() => document.getElementById("gallery-upload")?.click()}
              type="button"
            >
              {galleryImages.length > 0
                ? "Upload photos"
                : "Upload Max 5 Photos"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
