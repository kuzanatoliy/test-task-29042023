import {
  useSelector as useOriginSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import type { TRootState } from '../store';

export const useSelector: TypedUseSelectorHook<TRootState> = useOriginSelector;
