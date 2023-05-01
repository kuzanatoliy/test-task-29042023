import { useState } from 'react';
import { Container, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'react-use';

import { fetchPersons, useDispatch } from '../../store';

import * as styles from './HomePage.styles';

const DELAY = 500;

export const HomePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get('search') || '');

  useDebounce(
    () => {
      dispatch(fetchPersons({ search }));
      setSearchParams({ search });
    },
    DELAY,
    [search]
  );

  return (
    <Container sx={styles.container}>
      <TextField
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value)}
        id='search-input'
        label='Search'
        placeholder='Type search quary'
        size='small'
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};
