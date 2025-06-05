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
