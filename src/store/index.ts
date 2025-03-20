import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "@/store/ui-slice.ts";
import authSlice from "@/store/auth-slice.ts";

const store = configureStore({
    reducer: {
        ui: uiSlice,
        auth: authSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
// >;
export default store;