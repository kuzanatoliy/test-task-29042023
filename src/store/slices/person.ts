import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';

import { TRootState } from '../store';
import { ERequestStatus, IPerson } from '../../types';

type TPersonState =
  | { person: IPerson; status: ERequestStatus.SUCCESS }
  | {
      person: null;
      status: ERequestStatus;
    };

const createEmptyState: () => TPersonState = () => ({
  person: null,
  status: ERequestStatus.NOT_STARTED,
});

type TPersonFetchProps = {
  url?: string;
  id?: string;
};

export const fetchPerson = createAsyncThunk(
  'person/loadflow',
  async ({ url, id }: TPersonFetchProps = {}) => {
    const requestUrl = url ? url : `https://swapi.dev/api/people/${id}`;

    const res = await fetch(requestUrl);
    return res.json();
  }
);

export const personResetAction = createAction('person/reset');

export const personSlice = createSlice({
  name: 'programs',
  initialState: createEmptyState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPerson.pending, (state) => {
      state.person = null;
      state.status = ERequestStatus.LOADING;
    });

    builder.addCase(fetchPerson.fulfilled, (state, action) => {
      state.person = action.payload;
      state.status = ERequestStatus.SUCCESS;
    });

    builder.addCase(fetchPerson.rejected, (state) => {
      state.status = ERequestStatus.ERROR;
    });

    builder.addCase(personResetAction, createEmptyState);
  },
});

export const { reducer: personReducer } = personSlice;

export const selectPersonStatus = (state: TRootState) => state.person.status;
export const selectPerson = (state: TRootState) => state.person.person;
