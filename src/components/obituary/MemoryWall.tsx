import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { postCondolences } from "@/lib/condolences";
import Image from "next/image";

function UploadPhotoModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (file: File | null) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[620px] h-[521px] rounded-2xl p-8 bg-white shadow-xl relative flex flex-col">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upload photo</h2>
          <button
            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="flex-1 w-[556px] h-[293px] flex flex-col items-center justify-center">
          {!selectedFile ? (
            <label className="w-[556px] h-[293px] border-2 border-dashed border-[#00000040] rounded bg-[#f5fbf8] flex flex-col items-center justify-center cursor-pointer">
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                <rect width="64" height="64" rx="8" fill="#E5E5E5" />
                <path
                  d="M20 44l8-10 6 8 8-12 8 14"
                  stroke="#888"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="24" cy="28" r="4" fill="#B0B0B0" />
                <path
                  d="M32 44V32"
                  stroke="#699D99"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M28 36l4-4 4 4"
                  stroke="#699D99"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="mt-2 text-center">
                <span className="font-semibold">Upload photos</span> or just drag
                <br />
                and drop
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          ) : (
            <div
              className="mt-4 flex flex-col items-center cursor-pointer"
              onClick={handleImageClick}
              title="Click to change photo"
            >
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                width={180}
                height={180}
                className="object-cover rounded border border-gray-200"
              />
              <div className="text-sm text-gray-600 mt-2">{selectedFile.name}</div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <div className="text-xs text-blue-500 mt-1">(Click image to change)</div>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="w-[108px] h-11 px-7 py-2 bg-[#699D99] text-white rounded hover:bg-[#4B6B6C] transition"
            onClick={() => {
              onConfirm(selectedFile);
              onClose();
            }}
            disabled={!selectedFile}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

const MemoryWall = ({
  obituaryId,
  open,
  onClose,
}: {
  obituaryId: string;
  open: boolean;
  onClose: () => void;
}) => {
  const formSchema = z.object({
    fullName: z.string().min(1, "First name is required").optional(),
    email: z.string().email().optional(),
    message: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(open);
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);

  React.useEffect(() => {
    setShowForm(open);
  }, [open]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formMemoryWall = new FormData();
    formMemoryWall.append("full_name", values.fullName || "");
    formMemoryWall.append("email", values.email || "");
    formMemoryWall.append("message", values.message || "");
    if (photo) {
      formMemoryWall.append("photo", photo);
    }
    const condolences = await postCondolences(obituaryId, formMemoryWall);
    if (condolences) {
      window.location.reload();
    }
  };

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-[620px] h-[672px] flex flex-col rounded-2xl gap-10 p-8  bg-white shadow-xl relative">
            <div>
              <h2 className="text-2xl font-semibold">
                Contribute to memory wall
              </h2>
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
                onClick={onClose}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <FormProvider {...form}>
              <div className="flex flex-col gap-5 w-[556px] min-h-[444px]">
                <div className="flex gap-5 w-[556px] h-[76px]">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[268px] h-19 gap-2">
                        <FormLabel className="text-base museo">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white w-[268px] h-12 rounded border-dashed border-2 border-[#00000080]"
                            placeholder="John Doe"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[268px] h-19 gap-2">
                        <FormLabel className="text-base museo">
                          E-mail
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-[268px] h-12 bg-white rounded border-dashed border-2 border-[#00000080]"
                            placeholder="itsexample@gmail.com"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-[556px] h-[288px] gap-2">
                      <FormLabel className="text-base museo">
                        Your message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="w-[556px] h-[260px] bg-white text-[#444444] rounded border-dashed border-2 border-[#00000080]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center h-10">
                  <button
                    type="button"
                    className="px-4 py-2 h-10 border border-[#222222] rounded cursor-pointer bg-white hover:bg-gray-50 transition"
                    onClick={() => {
                      setShowForm(false);
                      setOpenUploadPhoto(true);
                    }}
                  >
                    Add photo
                  </button>
                  {photo && (
                    <span className="text-sm text-gray-600 ml-2">
                      {photo.name}
                    </span>
                  )}
                </div>
              </div>
            </FormProvider>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  form.handleSubmit(onSubmit)();
                }}
                className="w-[108px] h-11 px-7 py-2 bg-[#699D99] text-white rounded hover:bg-[#4B6B6C] transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <UploadPhotoModal
        open={openUploadPhoto}
        onClose={() => {
          setOpenUploadPhoto(false);
          setShowForm(true);
        }}
        onConfirm={(file) => {
          setPhoto(file);
          setOpenUploadPhoto(false);
          setShowForm(true);
        }}
      />
    </>
  );
};

export default MemoryWall;
