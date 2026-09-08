export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export interface PopupInfo {
  longitude: number;
  latitude: number;
  name: string;
  gender: 'Female' | 'Male';
  wikipediaLink: string;
}
