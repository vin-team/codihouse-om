import { Action, Dispatch } from "@reduxjs/toolkit";
import { setLogined } from "@/slices/app";
import { refreshToken } from "@/slices/authSlice";

export const authMiddleware =
  ({ dispatch }: { dispatch: Dispatch<Action> }) =>
    (next: (arg0: any) => void) =>
      async (action: any) => {
        const payload = action.payload as any;
        const errors = payload?.errors ? payload.errors : [];
        if (errors.length > 0) {
          const error = errors[0];
          const code = error.extensions.code;
          if (code === "INVALID_TOKEN") {
            dispatch(setLogined(false));
            const result = await dispatch(refreshToken())
            const payload = result.payload as any;
            if (payload?.errors?.length > 0) {
              const error = payload.errors[0];
              const code = error?.extensions?.code;
              if (code === "INVALID_CREDENTIALS") {
                window.location.replace("/login");
                return;
              }
            }
          }
        }

        next(action);
      }; 