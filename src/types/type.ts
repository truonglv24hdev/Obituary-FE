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
  memorial:TMemorial
  familyTree: object
  favorites: TFavorite
  timeLine:TTimelineEvent
  
};

export type TFavorite = {
  id: string;
  icon: React.ReactNode;
  question: string;
  answer: string;
  type: string;
};

export type TFavoriteType = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

export type TTimelineEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
};
