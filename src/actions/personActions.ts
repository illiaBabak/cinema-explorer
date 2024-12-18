import { Person } from 'src/types';

export const PERSON_SET_FULL_INFO = 'person_set_full_info';

export type PersonAction = { type: typeof PERSON_SET_FULL_INFO; payload: Person | null };

export const personSetFullInfo = (personInfo: Person | null): PersonAction => ({
  type: PERSON_SET_FULL_INFO,
  payload: personInfo,
});
