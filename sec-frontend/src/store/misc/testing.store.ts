import { action, Action, thunk, Thunk } from "easy-peasy";

interface TestingState {
  isClick: boolean;
  service: string;
}

interface TestingAction {
  toggleClick: Action<this>;
  setService: Action<TestingModel, string>;
}

interface TestingThunk {
  callService: Thunk<TestingModel, never, any, TestingModel, Promise<void>>;
  fetchService: Thunk<TestingModel, string, any, Promise<void>>;
}

export interface TestingModel
  extends TestingState,
    TestingAction,
    TestingThunk {}

export const testingModel: TestingModel = {
  // *State
  isClick: false,
  service: "",

  // *Action
  toggleClick: action((state) => {
    state.isClick = !state.isClick;
  }),
  setService: action((state, payload) => {
    state.service = payload;
  }),

  // *Thunk
  callService: thunk(async (actions, _) => {}),
  fetchService: thunk(async (action, payload) => {
    action.setService(payload);
  }),
};
