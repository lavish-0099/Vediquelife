export type Country = {
  countryCode: string;
  name: string;
  phoneCode: string | null;
};

export type State = {
  stateCode: string;
  name: string;
  countryCode: string;
};

export type City = {
  name: string;
  countryCode: string;
  stateCode: string;
};
