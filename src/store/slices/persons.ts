import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';

import { TRootState } from '../store';
import { ERequestStatus, IPersons } from '../../types';

interface IPersonsState {
  persons: IPersons;
  next: string | null;
  previous: string | null;
  status: ERequestStatus;
}

const createEmptyState: () => IPersonsState = () => ({
  persons: [],
  next: null,
  previous: null,
  status: ERequestStatus.NOT_STARTED,
});

export type TPersonsFetchProps = {
  url?: string;
  search?: string;
  page?: number;
};

export const fetchPersons = createAsyncThunk(
  'persons/loadflow',
  async ({ url, search = '', page = 1 }: TPersonsFetchProps = {}) => {
    const requestUrl = url
      ? url
      : `https://swapi.dev/api/people/?search=${encodeURIComponent(
          search
        )}&page=${page}`;

    const res = await fetch(requestUrl);
    const { next, previous, result } = await res.json();

    return {
      next,
      previous,
      persons: result,
    };
  }
);

export const personsResetAction = createAction('person/reset');

export const personsSlice = createSlice({
  name: 'programs',
  initialState: createEmptyState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersons.pending, (state) => {
      state.persons = [];
      state.status = ERequestStatus.LOADING;
      state.next = null;
      state.previous = null;
    });

    builder.addCase(fetchPersons.fulfilled, (state, action) => {
      state.persons = action.payload.persons;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.status = ERequestStatus.SUCCESS;
    });

    builder.addCase(fetchPersons.rejected, (state) => {
      state.status = ERequestStatus.ERROR;
    });

    builder.addCase(personsResetAction, createEmptyState);
  },
});

export const { reducer: personsReducer } = personsSlice;

export const selectPersonsStatus = (state: TRootState) => state.persons.status;
export const selectPersons = (state: TRootState) => state.persons.persons;
