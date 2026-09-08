import { useState, useCallback } from 'react';
import { INITIAL_VIEW_STATE } from '../utils/constants';

export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

export const useMap = () => {
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);

  const flyToCity = useCallback((center: [number, number], zoom = 13) => {
    setViewState({
      longitude: center[0],
      latitude: center[1],
      zoom,
    });
  }, []);

  const resetView = useCallback(() => {
    setViewState(INITIAL_VIEW_STATE);
  }, []);

  return {
    viewState,
    setViewState,
    flyToCity,
    resetView,
  };
};
