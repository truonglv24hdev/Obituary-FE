"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import {
  IconCalendar,
  IconPencil,
  IconPlus,
  IconTrash,
  IconSetting,
  IconFilter,
  IconPicture,
} from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import FormRSVP from "@/components/obituary/FormRSVP";
import FormObituary from "@/components/obituary/FormObituary";
import { favoriteTypes } from "@/constants/obituary";
import FavoritesObituary from "@/components/obituary/FavoritesObituary";
import {
  FamilyMember,
  GalleryFolder,
  ObituaryForm,
  TFavorite,
  TimelineEvent,
  TMemorial,
  TObituary,
} from "@/types/type";
import TimelineObituary from "@/components/obituary/TimelineObituary";
import SidebarObituary from "@/components/obituary/SidebarObituary";
import WakeDetails from "@/components/obituary/WakeDetails";
import { getObituaryById, putObituary } from "@/lib/obituaryAPI";
import { formatDate } from "@/constants/formatDateRange";
import { Calendar } from "@/components/ui/calendar";
import { format, parse } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { putMemorial } from "@/lib/memorialAPI";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  picture: z.any().optional(),
  headerImage: z.any().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.date().nullable(),
  deathDate: z.date().nullable(),
  quote: z.string().optional(),
  wordsFromFamily: z.string().optional(),
  lifeStory: z.string().optional(),
  quoteEvent: z.string().optional(),
});

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      picture: "",
      headerImage: "",
      firstName: "",
      lastName: "",
      birthDate: null,
      deathDate: null,
      quote: "",
      wordsFromFamily: "",
      lifeStory: "",
      quoteEvent: "",
    },
  });

  const router = useRouter();
  const [obituary, setObituary] = useState<TObituary | null>(null);
  const [showQuote, setShowQuote] = useState(true);
  const [showWords, setShowWords] = useState(true);
  const [showLifeStory, setShowLifeStory] = useState(true);

  const { id } = use(params);

  useEffect(() => {
    getObituaryById(id)
      .then((data) => {
        setObituary(data);
        if (data) {
          form.reset({
            firstName: data.memorial.first_name,
            lastName: data.memorial.last_name,
            birthDate: parse(data.memorial.born, "dd/MM/yyyy", new Date()),
            deathDate: parse(data.memorial.death, "dd/MM/yyyy", new Date()),
            quote: data.quote,
            wordsFromFamily: data.wordsFromFamily,
            lifeStory:data.lifeStory
          });
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy obituary:", err);
      });
  }, []);

  const addFamilyMember = (relationship: "sibling" | "parent") => {
    const newMember: FamilyMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      image: "/img/default-avatar.png",
      relationship,
    };
    setFamilyMembers([...familyMembers, newMember]);
  };

  const [selectedHeaderFile, setSelectedHeaderFile] = useState<File | null>(
    null
  );
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [galleryFolders, setGalleryFolders] = useState<GalleryFolder[]>([]);

  const handleHeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedHeaderFile(file);
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedAvatarFile(file);
  };

  const addGalleryFolder = () => {
    const newFolder: GalleryFolder = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      images: [],
    };
    setGalleryFolders([...galleryFolders, newFolder]);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formMemorial = new FormData();
      const formObituary = new FormData();

      if (selectedAvatarFile) {
        formMemorial.append("picture", selectedAvatarFile);
      }
      if (selectedHeaderFile) {
        formObituary.append("header_image", selectedHeaderFile);
      }

      // Format dates
      const formattedBorn = values.birthDate
        ? format(values.birthDate, "dd/MM/yyyy")
        : undefined;
      const formattedDeath = values.deathDate
        ? format(values.deathDate, "dd/MM/yyyy")
        : undefined;

      // Append other data
      formMemorial.append("first_name", values.firstName);
      formMemorial.append("last_name", values.lastName);
      formMemorial.append("born", formattedBorn || "");
      formMemorial.append("death", formattedDeath || "");
      formObituary.append("quote", values.quote || "");
      formObituary.append("wordsFromFamily", values.wordsFromFamily || "");
      formObituary.append("lifeStory", values.lifeStory || "");

      // Send request with FormData
      const updateMemorial = await putMemorial(id, formMemorial);
      const updateObituary = await putObituary(id, formObituary);

      if (updateMemorial || updateObituary) {
        router.push("/account");
      }
    } catch (error) {
      console.error("Failed to update memorial:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Header Image Section */}
          <div className="relative h-[400px] w-full">
            <FormField
              control={form.control}
              name="headerImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      {selectedHeaderFile ? (
                        <Image
                          src={URL.createObjectURL(selectedHeaderFile)}
                          alt="Preview"
                          width={1440}
                          height={400}
                          className="h-100 w-full object-cover"
                        />
                      ) : (
                        obituary?.memorial.picture && (
                          <Image
                            src={`http://localhost:5000${obituary.memorial.picture}`}
                            alt="Memorial"
                            width={1440}
                            height={400}
                            className="w-full h-100 object-cover"
                          />
                        )
                      )}
                      <label className="absolute bottom-10 right-15 bg-[#E5F6EC] text-black rounded museo text-base cursor-pointer flex items-center gap-2 justify-center px-4 py-2">
                        <IconPicture className="w-5 h-5" />
                        Change image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeaderFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-10">
            <SidebarObituary />

            <div className="flex-1 p-8">
              <div className="space-y-8 max-w-[1000px]">
                {/* Basic Information */}
                <div className="flex gap-15 w-[867px]">
                  {/* Avatar Section */}
                  <FormField
                    control={form.control}
                    name="picture"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative w-[248px] h-[248px] rounded shadow-md overflow-hidden bg-white">
                            {/* Avatar image logic */}
                            <label className=" w-[248px] h-[248px] rounded shadow-md overflow-hidden bg-white">
                              {selectedAvatarFile ? (
                                <Image
                                  src={URL.createObjectURL(selectedAvatarFile)}
                                  alt="Preview"
                                  width={240}
                                  height={240}
                                  className="px-2 py-3 w-[240px] h-60 object-cover"
                                />
                              ) : (
                                obituary?.memorial.picture && (
                                  <Image
                                    src={`http://localhost:5000${obituary.memorial.picture}`}
                                    alt="Memorial"
                                    width={240}
                                    height={240}
                                    className="px-2 py-3 w-[240px] h-60 object-cover"
                                  />
                                )
                              )}
                              <IconPencil className="absolute bottom-1 right-1 bg-[#699D99] text-white rounded shadow h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-gray-400" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarFileChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Name and Dates Section */}
                  <div className="flex flex-col gap-5 pt-10">
                    <div className="flex gap-8">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                className="border-1 border-black border-dashed h-12 w-[177px] text-[32px] museo font-medium text-center"
                                placeholder="First name"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                className="border-1 border-black border-dashed h-12 w-[177px] text-[32px] museo font-medium text-center"
                                placeholder="Last name"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Date Fields */}
                    <div className="flex gap-7 w-[560px]">
                      {/* Birth Date */}
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-2 w-[266px]">
                            <FormLabel className="text-base font-light">
                              Born
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal h-14",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <IconCalendar className="mr-2 h-4 w-4" />
                                    {field.value
                                      ? format(field.value, "MMMM d, yyyy")
                                      : "Pick a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Death Date - Similar structure to Birth Date */}
                      <FormField
                        control={form.control}
                        name="deathDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-2 w-[266px]">
                            <FormLabel className="text-base font-light">
                              Death
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal h-14",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <IconCalendar className="mr-2 h-4 w-4" />
                                    {field.value
                                      ? format(field.value, "MMMM d, yyyy")
                                      : "Pick a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                {/* Quote Section */}
                <FormObituary
                  title="Quote"
                  name="quote"
                  show={showQuote}
                  setShow={setShowQuote}
                  form={form} // Pass the form instance
                  placeholder="Quote/Saying"
                />

                {/* Words From Family Section */}
                <FormObituary
                  title="Words from family"
                  name="wordsFromFamily"
                  show={showWords}
                  setShow={setShowWords}
                  form={form} // Pass the form instance
                  placeholder="Quote/Saying"
                />

                {/* Life Story Section */}
                <FormObituary
                  title="Life story"
                  name="lifeStory"
                  subtitleButtonLabel="How to write an obituary"
                  show={showLifeStory}
                  setShow={setShowLifeStory}
                  form={form} // Pass the form instance
                  placeholder="Quote/Saying"
                />
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center mb-10">
            <Button
              type="submit"
              className="bg-[#133C4C] hover:bg-[#0f2f3c] museo text-white px-6 py-2"
            >
              Publish page
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
