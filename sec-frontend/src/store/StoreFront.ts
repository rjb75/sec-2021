import { createStore, createTypedHooks } from "easy-peasy";
import { testingModel, TestingModel } from "./misc/testing.store";

export interface StoreModel {
  testingModel: TestingModel;
}

export const model: StoreModel = {
  testingModel,
};

export const store = createStore(model);

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreState };
