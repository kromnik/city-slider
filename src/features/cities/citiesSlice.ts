import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialDate from '../../data/db.json';

export interface City {
  id: number;
  name: string;
  src: string;
  description: string;
}

interface CitiesState {
  cities: City[];
  selectedCityState: City | null;
}

const initialState: CitiesState = {
  cities: initialDate.cities as City[],
  selectedCityState: null,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<City>) {
      state.cities.push(action.payload);
    },
    editCity(state, action: PayloadAction<City>) {
      const index = state.cities.findIndex((city) => city.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = action.payload;
      }
    },
    deleteCity(state, action: PayloadAction<number>) {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
    selectCity(state, action: PayloadAction<City>) {
      state.selectedCityState = action.payload;
    },
    clearSelectedCity(state) {
      state.selectedCityState = null;
    },
  },
});

export const { setCity, editCity, deleteCity, selectCity, clearSelectedCity } = citiesSlice.actions;

export default citiesSlice.reducer;