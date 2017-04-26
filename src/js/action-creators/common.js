import COMMON_STATE_ACTIONS from '../action-types/common';

export const setCommonState = (commonState) => ({
  type: COMMON_STATE_ACTIONS.SET_COMMON_STATE,
  data: commonState
});

