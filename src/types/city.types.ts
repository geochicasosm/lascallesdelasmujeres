export interface CityData {
  numLink: number;
  pcLink: number;
  numNoLink: number;
  pcNoLink: number;
  numMale: number;
  numFemale: number;
  pcMale: number;
  pcFemale: number;
  totalNames: number;
}

export interface City {
  id: string;
  name: string;
  datos: CityData;
  center: [number, number]; // [lng, lat]
}

export interface Country {
  id: string;
  name: string;
  citiesList: City[];
}

export interface StreetProperties {
  name: string;
  gender: 'Female' | 'Male';
  wikipedia_link: string;
}
