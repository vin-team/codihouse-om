import { Action, Dispatch } from "@reduxjs/toolkit";
import { setLogined } from "@/slices/app";
import { authService } from "@/services/auth.service";
import { storage } from "@/utils/storage.util";
import { store } from "@/app/store";

export const authMiddleware =
  ({ dispatch }: { dispatch: Dispatch<Action> }) =>
    (next: (arg0: any) => void) =>
      (action: any) => {
        // if (action.payload && action.payload.message) {
        //   const { message } = action.payload;

        //   if (message === "Invalid refresh token!" || message === "Refresh token expired") {
        //     store.dispatch(setLogined(false));

        //     const currentRoute = window.location.pathname + window.location.search;
        //     if (currentRoute !== "/login") {
        //       storage.setItem("redirectAfterLogin", currentRoute);
        //     }

        //     authService.clearTokens();

        //     window.location.replace("/login");
        //     return;
        //   }

        //   if (message === "Invalid access token!" || message === "Access token expired") {
        //     const refreshToken = storage.getItem(process.env.NEXT_PUBLIC_storageRefreshTokenKey!);
        //     if (refreshToken) {
        //       authService.refreshToken().then((result) => {
        //         if (result.code === 200 && result.data) {
        //           return next(action);
        //         } else {
        //           store.dispatch(setLogined(false));
        //           const currentRoute = window.location.pathname + window.location.search;
        //           if (currentRoute !== "/login") {
        //             storage.setItem("redirectAfterLogin", currentRoute);
        //           }
        //           authService.clearTokens();
        //           window.location.replace("/login");
        //           return;
        //         }
        //       }).catch(() => {
        //         store.dispatch(setLogined(false));
        //         const currentRoute = window.location.pathname + window.location.search;
        //         if (currentRoute !== "/login") {
        //           storage.setItem("redirectAfterLogin", currentRoute);
        //         }
        //         authService.clearTokens();
        //         window.location.replace("/login");
        //         return;
        //       });
        //       return;
        //     } else {
        //       store.dispatch(setLogined(false));
        //       const currentRoute = window.location.pathname + window.location.search;
        //       if (currentRoute !== "/login") {
        //         storage.setItem("redirectAfterLogin", currentRoute);
        //       }
        //       authService.clearTokens();
        //       window.location.replace("/login");
        //       return;
        //     }
        //   }
        // }

        next(action);
      }; 