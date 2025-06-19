export type TUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  country: string;
  code: string;
};

export type TMemorial = {
  _id: string;
  picture: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  born: string;
  death: string;
  slug: string;
};

export type TObituary = {
  _id: string;
  headerImage: string;
  memorial: TMemorial;
  familyTree: Category[];
  favorites: TFavorite;
  timeLine: TTimelineEvent;
  gallery: []
};

export type TFavorite = {
  id: string;
  icon: string;
  question: string;
  answer: string;
  type: string;
};

export type TFavoriteType = {
  id: string;
  icon: string;
  label: string;
};

export type TTimelineEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
};

export interface ObituaryForm {
  birthDate: Date | null;
  deathDate: Date | null;
  quote: string;
  wordsFromFamily: string;
  lifeStory: string;
  image: string;
  quoteEvent: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface GalleryFolder {
  id: string;
  name: string;
  images: GalleryImage[];
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface Category {
  id: string;
  category: string;
  members: {
    id: string;
    name: string;
    image: string;
  }[];
}

export interface IEvent {
  id: string;
  eventTitle: string;
  description: string;
  location: string;
  show: boolean;
  date: string;
  timeFrom: string;
  timeTo: string;
}
