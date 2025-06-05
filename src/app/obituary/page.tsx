"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useState } from "react";
import {
  IconCalendar,
  IconPencil,
  IconPlus,
  IconTrash,
  IconSetting,
  IconFilter,
} from "@/components/icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import FormRSVP from "@/components/obituary/FormRSVP";
import FormObituary from "@/components/obituary/FormObituary";
import { favoriteTypes } from "@/constants/favorites";
import FavoritesObituary from "@/components/obituary/FavoritesObituary";
import { TFavorite } from "@/types/type";

interface ObituaryForm {
  firstName: string;
  lastName: string;
  birthDate: string;
  deathDate: string;
  quote: string;
  wordsFromFamily: string;
  lifeStory: string;
  image: string;
  quoteEvent: string;
}

interface FamilyMember {
  id: string;
  name: string;
  image: string;
  relationship: "sibling" | "parent";
}

interface ObituaryForm {
  firstName: string;
  lastName: string;
  birthDate: string;
  deathDate: string;
  quote: string;
  wordsFromFamily: string;
  lifeStory: string;
  image: string;
  quoteEvent: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface GalleryFolder {
  id: string;
  name: string;
  images: GalleryImage[];
}

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

interface GuestBookEntry {
  id: string;
  content: string;
  status: "approved" | "rejected" | "pending";
}

export default function page() {
  const [formData, setFormData] = useState<ObituaryForm>({
    firstName: "",
    lastName: "",
    birthDate: "",
    deathDate: "",
    quote: "",
    wordsFromFamily: "",
    lifeStory: "",
    image: "/img/default-memorial.jpg",
    quoteEvent: "",
  });

  const addFamilyMember = (relationship: "sibling" | "parent") => {
    const newMember: FamilyMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      image: "/img/default-avatar.png",
      relationship,
    };
    setFamilyMembers([...familyMembers, newMember]);
  };

  const [showQuote, setShowQuote] = useState(true);
  const [showWords, setShowWords] = useState(true);
  const [showLifeStory, setShowLifeStory] = useState(true);
  const [showFamilyTree, setShowFamilyTree] = useState(true);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [favorites, setFavorites] = useState<TFavorite[]>([]);
  const [showFavorites, setShowFavorites] = useState(true);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [showTimeline, setShowTimeline] = useState(true);
  const [showQuoteEvent, setShowQuoteEvent] = useState(true);
  const [showGallery, setShowGallery] = useState(true);
  const [showVideos, setShowVideos] = useState(true);
  const [galleryFolders, setGalleryFolders] = useState<GalleryFolder[]>([]);
  const [allowVisitorPhotos, setAllowVisitorPhotos] = useState(false);
  const [moderationType, setModerationType] = useState<"pre" | "post">("pre");
  const [requireEmail, setRequireEmail] = useState(false);
  const [showGuestBook, setShowGuestBook] = useState(true);

  const [filterStatus, setFilterStatus] = useState<
    "all" | "approved" | "rejected" | "pending"
  >("all");
  const [showGuestBookSettings, setShowGuestBookSettings] = useState(false);

  const addFavorite = (type: string) => {
    const favoriteType = favoriteTypes.find((t) => t.id === type);
    if (!favoriteType) return;

    const newFavorite: TFavorite = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      question: favoriteType.label,
      answer: "",
      icon: favoriteType.icon,
    };
    setFavorites([...favorites, newFavorite]);
  };

  const menuItems = [
    { id: "information", label: "Information" },
    { id: "words", label: "Words from family" },
    { id: "life-story", label: "Life story" },
    { id: "family-tree", label: "Family tree" },
    { id: "favorites", label: "Favorites" },
    { id: "gallery", label: "Gallery" },
    { id: "guest-book", label: "Guest book" },
  ];

  const addTimelineEvent = () => {
    const newEvent: TimelineEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      description: "",
      date: "",
      location: "",
    };
    setTimelineEvents([...timelineEvents, newEvent]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addGalleryFolder = () => {
    const newFolder: GalleryFolder = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      images: [],
    };
    setGalleryFolders([...galleryFolders, newFolder]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-[300px] w-full">
        <Image
          src={formData.image}
          alt="Memorial"
          fill
          className="object-cover"
        />
        <Button className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-md text-sm">
          Change image
        </Button>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-[#699D99] text-white min-h-screen p-4">
          <h2 className="text-xl font-semibold mb-6">Edit Memorial</h2>
          <nav>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                className="flex items-center space-x-2 w-full py-3 px-4 hover:bg-white/10 rounded-lg"
              >
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 max-w-4xl">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Birth Date
                </label>
                <Input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Death Date
                </label>
                <Input
                  type="date"
                  name="deathDate"
                  value={formData.deathDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Quote Section */}
            <FormObituary
              title="Quote"
              name="quote"
              show={showQuote}
              setShow={setShowQuote}
              value={formData.quote}
              onChange={handleInputChange}
              placeholder="Enter a meaningful quote"
            />

            {/* Words from Family */}
            <FormObituary
              title="Words from family"
              name="wordsFromFamily"
              value={formData.wordsFromFamily}
              show={showWords}
              setShow={setShowWords}
              onChange={handleInputChange}
              placeholder="Enter a meaningful quote"
            />

            {/* Life Story Section */}
            <FormObituary
              title="Life story"
              subtitleButtonLabel="How to write an obituary"
              onSubtitleClick={() => {
                console.log("Clicked help button");
              }}
              show={showLifeStory}
              setShow={setShowLifeStory}
              name="lifeStory"
              value={formData.lifeStory}
              onChange={handleInputChange}
              placeholder="Write a short obituary of your loved one"
            />

            {/* Family Tree Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Family tree</h3>
                <Switch
                  checked={showFamilyTree}
                  onCheckedChange={setShowFamilyTree}
                />
              </div>
              {showFamilyTree && (
                <div className="space-y-8">
                  {/* Siblings Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium px-4 py-2 bg-gray-50 inline-block rounded-md">
                      Siblings
                    </h4>
                    <div className="grid grid-cols-5 gap-4">
                      {familyMembers
                        .filter((member) => member.relationship === "sibling")
                        .map((sibling) => (
                          <div key={sibling.id} className="text-center">
                            <div className="relative w-24 h-24 mx-auto mb-2">
                              <Image
                                src={sibling.image}
                                alt={sibling.name}
                                fill
                                className="object-cover rounded-md"
                              />
                              <Button className="absolute bottom-1 right-1 p-1 bg-white rounded-md shadow-sm">
                                <IconPencil className="w-3 h-3" />
                              </Button>
                            </div>
                            <Input
                              value={sibling.name}
                              onChange={(e) => {
                                const newMembers = familyMembers.map((m) =>
                                  m.id === sibling.id
                                    ? { ...m, name: e.target.value }
                                    : m
                                );
                                setFamilyMembers(newMembers);
                              }}
                              placeholder="Name"
                              className="text-center"
                            />
                          </div>
                        ))}
                      <Button
                        onClick={() => addFamilyMember("sibling")}
                        className="w-24 h-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        <IconPlus className="w-6 h-6 text-gray-400" />
                      </Button>
                    </div>
                  </div>

                  {/* Parents Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium px-4 py-2 bg-gray-50 inline-block rounded-md">
                      Parents
                    </h4>
                    <div className="grid grid-cols-5 gap-4">
                      {familyMembers
                        .filter((member) => member.relationship === "parent")
                        .map((parent) => (
                          <div key={parent.id} className="text-center">
                            <div className="relative w-24 h-24 mx-auto mb-2">
                              <Image
                                src={parent.image}
                                alt={parent.name}
                                fill
                                className="object-cover rounded-md"
                              />
                              <Button className="absolute bottom-1 right-1 p-1 bg-white rounded-md shadow-sm">
                                <IconPencil className="w-3 h-3" />
                              </Button>
                            </div>
                            <Input
                              value={parent.name}
                              onChange={(e) => {
                                const newMembers = familyMembers.map((m) =>
                                  m.id === parent.id
                                    ? { ...m, name: e.target.value }
                                    : m
                                );
                                setFamilyMembers(newMembers);
                              }}
                              placeholder="Name"
                              className="text-center"
                            />
                          </div>
                        ))}
                      <Button
                        onClick={() => addFamilyMember("parent")}
                        className="w-24 h-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        <IconPlus className="w-6 h-6 text-gray-400" />
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    Add Individual
                  </Button>
                </div>
              )}
            </div>

            {/* Favorites Section */}
            <FavoritesObituary
              show={showFavorites}
              setShow={setShowFavorites}
              favorites={favorites}
              setFavorites={setFavorites}
              favoriteTypes={favoriteTypes}
              addFavorite={addFavorite}
            />

            {/* Timeline Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Timeline</h3>
                <Switch
                  checked={showTimeline}
                  onCheckedChange={setShowTimeline}
                />
              </div>
              {showTimeline && (
                <div className="space-y-6">
                  {timelineEvents.map((event, index) => (
                    <div key={event.id} className="relative">
                      {index !== 0 && (
                        <div className="absolute left-[23px] -top-6 h-6 w-[2px] bg-[#699D99]" />
                      )}
                      {index !== timelineEvents.length - 1 && (
                        <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-[#699D99]" />
                      )}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-[#699D99] flex items-center justify-center text-white">
                            <IconCalendar className="w-6 h-6" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-4">
                          <Input
                            value={event.title}
                            onChange={(e) => {
                              const newEvents = timelineEvents.map((ev) =>
                                ev.id === event.id
                                  ? { ...ev, title: e.target.value }
                                  : ev
                              );
                              setTimelineEvents(newEvents);
                            }}
                            placeholder="Title"
                            className="font-medium"
                          />
                          <div className="flex gap-4">
                            <Input
                              type="date"
                              value={event.date}
                              onChange={(e) => {
                                const newEvents = timelineEvents.map((ev) =>
                                  ev.id === event.id
                                    ? { ...ev, date: e.target.value }
                                    : ev
                                );
                                setTimelineEvents(newEvents);
                              }}
                              className="w-40"
                            />
                            <Input
                              value={event.location}
                              onChange={(e) => {
                                const newEvents = timelineEvents.map((ev) =>
                                  ev.id === event.id
                                    ? { ...ev, location: e.target.value }
                                    : ev
                                );
                                setTimelineEvents(newEvents);
                              }}
                              placeholder="Location"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setTimelineEvents(
                                  timelineEvents.filter(
                                    (ev) => ev.id !== event.id
                                  )
                                );
                              }}
                            >
                              <IconTrash className="w-4 h-4" />
                            </Button>
                          </div>
                          <Textarea
                            value={event.description}
                            onChange={(e) => {
                              const newEvents = timelineEvents.map((ev) =>
                                ev.id === event.id
                                  ? { ...ev, description: e.target.value }
                                  : ev
                              );
                              setTimelineEvents(newEvents);
                            }}
                            placeholder="Description of event"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={addTimelineEvent}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Add Event
                  </Button>
                </div>
              )}
            </div>

            {/* Quote Event Section */}
            <FormObituary
              title="Quote"
              name="quoteEvent"
              show={showQuoteEvent}
              setShow={setShowQuoteEvent}
              value={formData.quoteEvent}
              onChange={handleInputChange}
              placeholder="Enter a meaningful quote"
            />

            {/*Form RSVP */}
            <FormRSVP />
            {/* Gallery Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Gallery</h3>
                <Switch
                  checked={showGallery}
                  onCheckedChange={setShowGallery}
                />
              </div>
              {showGallery && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Organize your photos in folder
                    </div>
                    <Button
                      onClick={addGalleryFolder}
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Add folder
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={allowVisitorPhotos}
                          onCheckedChange={setAllowVisitorPhotos}
                        />
                        <span className="text-sm">
                          Allow visitors to add photos
                        </span>
                      </div>
                      <Select
                        value={moderationType}
                        onValueChange={(value: "pre" | "post") =>
                          setModerationType(value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Moderation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre">Pre-moderation</SelectItem>
                          <SelectItem value="post">Post-moderation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        {moderationType === "post"
                          ? "Post-moderation: new photos are automatically published. You can erase them when necessary."
                          : "Pre-moderation: by default, new photos are not displayed... until explicitely approved by you."}
                      </p>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={requireEmail}
                          onCheckedChange={(checked) =>
                            setRequireEmail(Boolean(checked))
                          }
                        />
                        <label>Require e-mail address</label>
                      </div>
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                      Upload photos
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Videos Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Videos</h3>
                <Switch checked={showVideos} onCheckedChange={setShowVideos} />
              </div>
              {showVideos && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center">
                    <div className="w-64 h-64 relative mb-4">
                      <Image
                        src="/img/upload-video.png"
                        alt="Upload Video"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                      Upload Videos
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {/* Guest Book Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Guest book</h3>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setShowGuestBookSettings(!showGuestBookSettings)
                    }
                  >
                    <IconSetting className="w-4 h-4" />
                    Settings
                  </Button>
                  <div className="flex items-center gap-2 border border-input rounded-md px-2 py-1 text-sm">
                    <IconFilter className="w-4 h-4" />
                    <Select
                      value={filterStatus}
                      onValueChange={(
                        value: "all" | "approved" | "rejected" | "pending"
                      ) => setFilterStatus(value)}
                    >
                      <SelectTrigger className="border-0 p-0 hover:bg-transparent focus:ring-0 focus:outline-none">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Switch
                    checked={showGuestBook}
                    onCheckedChange={setShowGuestBook}
                  />
                </div>
              </div>

              {showGuestBook && (
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <Textarea
                      placeholder="Share your condolences"
                      className="min-h-[120px] border-dashed mb-4"
                    />
                    <div className="flex justify-end">
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                        Contribute
                      </Button>
                    </div>
                  </div>

                  {/* Settings Dialog */}
                  {showGuestBookSettings && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                      <div className="bg-white rounded-lg p-6 w-[500px]">
                        <h4 className="text-lg font-medium mb-4">
                          Guest Book Settings
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Allow visitor comments</span>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Require moderation</span>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Email notifications</span>
                            <Switch />
                          </div>
                          <div className="flex justify-end gap-2 mt-6">
                            <Button
                              variant="outline"
                              onClick={() => setShowGuestBookSettings(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="bg-teal-600 hover:bg-teal-700 text-white"
                              onClick={() => setShowGuestBookSettings(false)}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
