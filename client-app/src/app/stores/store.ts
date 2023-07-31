import { createContext, useContext } from "react";
import activityStore from "./activityStore";

interface store {
    activityStore: activityStore
}

export const store: store = {
    activityStore: new activityStore()
}

// creating context to use it in othet component

export const storeContext = createContext(store);

export function useStore() {
    return useContext(storeContext);
}


