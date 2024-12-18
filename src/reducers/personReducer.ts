import { Person } from 'src/types';
import { PERSON_SET_FULL_INFO, PersonAction } from 'src/actions/personActions';

export type PersonInitialStateType = {
  personInfo: Person | null;
};

export const personInitialState: PersonInitialStateType = {
  personInfo: null,
};

export const personReducer = (
  state = personInitialState,
  action: PersonAction
): PersonInitialStateType => {
  switch (action.type) {
    case PERSON_SET_FULL_INFO:
      return {
        ...state,
        personInfo: action.payload,
      };

    default:
      return state;
  }
};
