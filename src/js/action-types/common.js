import { createActionTypes } from '../utilities/action-type-factory';

const COMMON_STATE_ACTIONS = createActionTypes('COMMON', [
  'SET_COMMON_STATE'
]);

export default COMMON_STATE_ACTIONS;
