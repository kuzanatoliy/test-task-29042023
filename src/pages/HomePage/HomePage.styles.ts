import { SxProps } from '@mui/material';

export const container: SxProps = {
  padding: 2,
  maxWidth: 'lg',
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  height: '100%',
};

export const content: SxProps = {
  flex: 1,
};

export const nav: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};
