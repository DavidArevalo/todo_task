import { createTypedHooks } from "easy-peasy"; // πimport the helper
import { StoreModel } from "../store"; // π import our model type

// Provide our model to the helper      π
const typedHooks = createTypedHooks<StoreModel>();

// π export the typed hooks
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
