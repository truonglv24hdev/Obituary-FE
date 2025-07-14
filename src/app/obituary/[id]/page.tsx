"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { IconPencil, IconPicture, IconCalendar } from "@/components/icons";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  GalleryFolder,
  IEvent,
  TCondolences,
  TFavorite,
  TimelineEvent,
  TObituary,
} from "@/types/type";
import SidebarObituary from "@/components/obituary/SidebarObituary";
import { getObituaryByMemorialId, putObituary } from "@/lib/obituaryAPI";
import { format, parse, isValid } from "date-fns";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import FormObituary from "@/components/obituary/FormObituary";
import TimelineObituary from "@/components/obituary/TimelineObituary";
import FamilyTreeSection from "@/components/obituary/FamilyTree";
import Event from "@/components/obituary/Event";
import FavoritesObituary from "@/components/obituary/FavoritesObituary";
import { favoriteTypes } from "@/constants/obituary";
import FormRSVP from "@/components/obituary/FormRSVP";
import { Switch } from "@/components/ui/switch";
import Gallery from "@/components/obituary/Gallery";
import GuestBook from "@/components/obituary/GuestBook";
import { getAllCondolences } from "@/lib/condolences";
import VideoWall from "@/components/obituary/VideoWall";

const formSchema = z.object({
  picture: z.any().optional(),
  headerImage: z.any().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birthDate: z.date().nullable().optional(),
  deathDate: z.date().nullable().optional(),
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
  const [showFamilyTree, setShowFamilyTree] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showTimeline, setShowTimeline] = useState(true);
  const [timeLine, setTimeline] = useState<TimelineEvent[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [showFavorites, setShowFavorites] = useState(true);
  const [favorites, setFavorites] = useState<TFavorite[]>([]);
  const [showGallery, setShowGallery] = useState(true);
  const [allowVisitorPhotos, setAllowVisitorPhotos] = useState(true);
  const [moderationType, setModerationType] = useState<"pre" | "post">("pre");
  const [requireEmail, setRequireEmail] = useState(false);
  const [selectedHeaderFile, setSelectedHeaderFile] = useState<File | null>(
    null
  );
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryOldImages, setGalleryOldImages] = useState<string[]>([]);
  const [galleryFolders, setGalleryFolders] = useState<GalleryFolder[]>([]);
  const [showVideos, setShowVideos] = useState(true);
  const [condolences, setCondolences] = useState<TCondolences[] | null>(null);
  const [openVideoWall, setOpenVideoWall] = useState(false);

  const addTimelineEvent = () => {
    const newEvent: TimelineEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      description: "",
      date: "",
      location: "",
    };
    setTimeline([...timeLine, newEvent]);
  };

  const { id } = use(params);

  useEffect(() => {
    getObituaryByMemorialId(id)
      .then((data) => {
        if (!data) return;

        form.reset({
          firstName: data.memorial.first_name,
          lastName: data.memorial.last_name,
          birthDate: data.memorial.born ? new Date(data.memorial.born) : null,
          deathDate: data.memorial.death ? new Date(data.memorial.death) : null,
          quote: data.quote,
          wordsFromFamily: data.wordsFromFamily,
          lifeStory: data.lifeStory,
        });
        console.log(data)

        setObituary(data);
        setCategories(data.familyTree ?? []);
        setTimeline(data.timeLine);
        setFavorites(data.favorites);
        setGalleryOldImages(data.gallery || []);
        setRequireEmail(data.memorial.require_email)
        setModerationType(data.memorial.moderation)
        setAllowVisitorPhotos(data.memorial.add_photos)

        const eventsWithId = (data.event || []).map((ev: any) => ({
          ...ev,
          id: ev.id || Math.random().toString(36).substring(2),
        }));
        setEvents(eventsWithId);
        getAllCondolences(data._id)
          .then((data) => {
            setCondolences(data);
            console.log(data);
          })
          .catch((err) => {
            console.error("Lỗi khi lấy obituary:", err);
          });
      })
      .catch((err) => {
        console.error("Lỗi khi lấy obituary:", err);
      });
  }, [id]);

  const handleHeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedHeaderFile(file);
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedAvatarFile(file);
  };

  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const totalImages = galleryOldImages.length + galleryImages.length;
      const availableSlots = 5 - totalImages;
      if (availableSlots <= 0) return;

      const filesToAdd = filesArray.slice(0, availableSlots);
      setGalleryImages([...galleryImages, ...filesToAdd]);
    }
  };

  const handleRemoveGalleryImage = (type: "old" | "new", idx: number) => {
    if (type === "old") {
      setGalleryOldImages((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setGalleryImages((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const addGalleryFolder = () => {
    const newFolder: GalleryFolder = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      images: [],
    };
    setGalleryFolders([...galleryFolders, newFolder]);
  };

  const addFavorite = (type: string) => {
    const favoriteType = favoriteTypes.find((t) => t.id === type);
    if (!favoriteType) return;

    const newFavorite: TFavorite = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      question: `What was ${obituary?.memorial.first_name} ${obituary?.memorial.last_name} favorite ${favoriteType.id}?`,
      answer: "",
      icon: favoriteType.icon,
    };
    setFavorites([...favorites, newFavorite]);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formMemorial = new FormData();
      const formObituary = new FormData();

      if (selectedAvatarFile) {
        formMemorial.append("picture", selectedAvatarFile);
      }
      if (selectedHeaderFile) {
        formObituary.append("headerImage", selectedHeaderFile);
      }
      if (galleryImages) {
        galleryImages.forEach((file) => {
          formObituary.append("gallery", file);
        });
      }

      formObituary.append("galleryOld", JSON.stringify(galleryOldImages));

      const formattedBorn = values.birthDate
        ? format(values.birthDate, "dd/MM/yyyy")
        : undefined;
      const formattedDeath = values.deathDate
        ? format(values.deathDate, "dd/MM/yyyy")
        : undefined;

      formMemorial.append("first_name", values.firstName || "");
      formMemorial.append("last_name", values.lastName || "");
      formMemorial.append("born", formattedBorn || "");
      formMemorial.append("death", formattedDeath || "");
      formMemorial.append("require_email", String(requireEmail));
      formMemorial.append("moderation", moderationType);
      formMemorial.append("add_photos", String(allowVisitorPhotos));
      formObituary.append("quote", values.quote || "");
      formObituary.append("wordsFromFamily", values.wordsFromFamily || "");
      formObituary.append("lifeStory", values.lifeStory || "");
      formObituary.append("familyTree", JSON.stringify(categories));
      formObituary.append("favorites", JSON.stringify(favorites));
      categories.forEach((cat) => {
        cat.members.forEach((member) => {
          if (member.image) {
            formObituary.append(`familyTreeImage-${member.id}`, member.id);
          }
        });
      });
      formObituary.append("event", JSON.stringify(events));
      formObituary.append("timeLine", JSON.stringify(timeLine));

      // Send request with FormData
      const updateMemorial = await putMemorial(id, formMemorial);
      const updateObituary = await putObituary(id, formObituary);

      if (updateMemorial || updateObituary) {
        router.push("/account/memorials");
      }
    } catch (error) {
      console.error("Failed to update memorial:", error);
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header Image Section */}
          <div className="relative w-full aspect-[1440/400] sm:h-[400px]">
            <FormField
              control={form.control}
              name="headerImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-full h-full">
                      {selectedHeaderFile ? (
                        <Image
                          src={URL.createObjectURL(selectedHeaderFile)}
                          alt="Preview"
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        obituary?.headerImage && (
                          <Image
                            src={`https://obituary-be-production.up.railway.app${obituary.headerImage}`}
                            alt="Memorial"
                            fill
                            className="object-cover rounded"
                          />
                        )
                      )}

                      <label className="absolute bottom-3 right-3 sm:bottom-5 sm:right-6 bg-[#E5F6EC] text-black rounded museo text-sm sm:text-base cursor-pointer flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm">
                        <IconPicture className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className=" xs:inline">Change image</span>
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

            <div className="flex-1 p-8 w-full">
              <div className="space-y-8 max-w-[1000px] w-full">
                {/* Basic Information */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-15 w-full">
                  {/* Avatar Section */}
                  <div className="w-full lg:w-[248px]">
                    <FormField
                      control={form.control}
                      name="picture"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <div className="relative w-full h-[248px] border rounded shadow-md overflow-hidden bg-white">
                              <label className=" w-[248px] h-[248px] rounded shadow-md overflow-hidden bg-white">
                                {selectedAvatarFile ? (
                                  <Image
                                    src={URL.createObjectURL(
                                      selectedAvatarFile
                                    )}
                                    alt="Preview"
                                    width={240}
                                    height={240}
                                    className="px-2 py-3 mx-auto w-[240px] h-60 object-cover"
                                  />
                                ) : (
                                  obituary?.memorial.picture && (
                                    <Image
                                      src={`https://obituary-be-production.up.railway.app${obituary.memorial.picture}`}
                                      alt="Memorial"
                                      width={240}
                                      height={240}
                                      className="px-2 py-3 mx-auto w-[240px] h-60 object-cover"
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
                  </div>

                  {/* Name and Dates Section */}
                  <div className="flex flex-col gap-5 pt-6 w-full lg:w-[560px]">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                className="border border-dashed border-black h-12 text-[32px] museo font-medium text-center"
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
                          <FormItem className="w-full sm:w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                className="border border-dashed border-black h-12 text-[32px] museo font-medium text-center"
                                placeholder="Last name"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/2">
                            <FormLabel className="text-base font-light">
                              Born
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-between text-left font-normal h-14",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value instanceof Date &&
                                    !isNaN(field.value.getTime())
                                      ? format(field.value, "MMMM d, yyyy")
                                      : "Pick a date"}
                                    <IconCalendar className="ml-auto h-6 w-6" />
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
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deathDate"
                        render={({ field }) => (
                          <FormItem className="w-full sm:w-1/2">
                            <FormLabel className="text-base font-light">
                              Death
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-between text-left font-normal h-14",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value instanceof Date &&
                                    !isNaN(field.value.getTime())
                                      ? format(field.value, "MMMM d, yyyy")
                                      : "Pick a date"}
                                    <IconCalendar className="ml-auto h-6 w-6" />
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

                {/* Family Tree Section */}
                <FamilyTreeSection
                  showFamilyTree={showFamilyTree}
                  setShowFamilyTree={setShowFamilyTree}
                  categories={categories}
                  setCategories={setCategories}
                />

                {/* */}
                <FavoritesObituary
                  show={showFavorites}
                  setShow={setShowFavorites}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  favoriteTypes={favoriteTypes}
                  addFavorite={addFavorite}
                />

                {/* Time Line */}
                <TimelineObituary
                  showTimeline={showTimeline}
                  setShowTimeline={setShowTimeline}
                  timelineEvents={timeLine}
                  setTimelineEvents={setTimeline}
                  addTimelineEvent={addTimelineEvent}
                />

                {/* Event */}
                <h3 className="text-[32px] font-medium museo">Event</h3>
                <FormProvider {...form}>
                  <Event height="auto" setEvents={setEvents} events={events} />
                </FormProvider>

                {/*Form RSVP */}
                <FormRSVP obituaryId={obituary?._id || ""} />

                {/* Gallery Section */}
                <Gallery
                  id={id}
                  showGallery={showGallery}
                  setShowGallery={setShowGallery}
                  allowVisitorPhotos={allowVisitorPhotos}
                  setAllowVisitorPhotos={setAllowVisitorPhotos}
                  moderationType={moderationType}
                  setModerationType={setModerationType}
                  requireEmail={requireEmail}
                  setRequireEmail={setRequireEmail}
                  galleryOldImages={galleryOldImages}
                  galleryImages={galleryImages}
                  handleGalleryFilesChange={handleGalleryFilesChange}
                  handleRemoveGalleryImage={handleRemoveGalleryImage}
                  addGalleryFolder={addGalleryFolder}
                />

                {/* Videos Section */}
                <div className="flex flex-col gap-8 sm:gap-10">
                  {/* Header */}
                  <div className="flex sm:flex-row items-center justify-between gap-3">
                    <h3 className="text-[28px] sm:text-[32px] font-medium museo">
                      Videos
                    </h3>
                    <Switch
                      checked={showVideos}
                      onCheckedChange={setShowVideos}
                    />
                  </div>

                  {/* Video Content */}
                  {showVideos && (
                    <div className="flex flex-col items-center gap-6 sm:gap-10">
                      {/* Video Preview */}
                      <div className="w-full max-w-[519px] aspect-video relative rounded overflow-hidden">
                        <Image
                          src="/img/video.png"
                          alt="video"
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      {/* Upload Button */}
                      <Button
                        type="button"
                        onClick={() => setOpenVideoWall(true)}
                        className="w-full sm:w-[162px] h-12 bg-[#699D99] rounded px-7 py-2 text-base museo text-white hover:bg-[#4e7c7a]"
                      >
                        Upload Videos
                      </Button>
                    </div>
                  )}
                </div>

                {openVideoWall && (
                  <VideoWall
                    obituaryId={id}
                    open={openVideoWall}
                    onClose={() => setOpenVideoWall(false)}
                  />
                )}

                {/* Guest Book */}
                <GuestBook condolences={condolences || []} />
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
