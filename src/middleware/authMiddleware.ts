import { Action, Dispatch } from "@reduxjs/toolkit";
import { setLogined } from "@/slices/app";
import { authService } from "@/services/auth.service";
import { storage } from "@/utils/storage.util";
import { store } from "@/app/store";

export const authMiddleware =
  ({ dispatch }: { dispatch: Dispatch<Action> }) =>
    (next: (arg0: any) => void) =>
      (action: any) => {
        // Kiểm tra nếu action có payload và có message
        if (action.payload && action.payload.message) {
          const { message } = action.payload;

          // Xử lý refresh token hết hạn
          if (message === "Invalid refresh token!" || message === "Refresh token expired") {
            store.dispatch(setLogined(false));

            // Lưu route hiện tại để redirect sau khi login
            const currentRoute = window.location.pathname + window.location.search;
            if (currentRoute !== "/login") {
              storage.setItem("redirectAfterLogin", currentRoute);
            }

            // Clear tokens
            authService.clearTokens();

            // Redirect về login
            window.location.replace("/login");
            return;
          }

          // Xử lý access token hết hạn
          if (message === "Invalid access token!" || message === "Access token expired") {
            // Thử refresh token
            const refreshToken = storage.getItem(process.env.NEXT_PUBLIC_storageRefreshTokenKey!);
            if (refreshToken) {
              authService.refreshToken().then((result) => {
                if (result.code === 200 && result.data) {
                  // Refresh thành công, retry action gốc
                  return next(action);
                } else {
                  // Refresh thất bại, logout
                  store.dispatch(setLogined(false));
                  const currentRoute = window.location.pathname + window.location.search;
                  if (currentRoute !== "/login") {
                    storage.setItem("redirectAfterLogin", currentRoute);
                  }
                  authService.clearTokens();
                  window.location.replace("/login");
                  return;
                }
              }).catch(() => {
                // Refresh thất bại, logout
                store.dispatch(setLogined(false));
                const currentRoute = window.location.pathname + window.location.search;
                if (currentRoute !== "/login") {
                  storage.setItem("redirectAfterLogin", currentRoute);
                }
                authService.clearTokens();
                window.location.replace("/login");
                return;
              });
              return;
            } else {
              // Không có refresh token, logout
              store.dispatch(setLogined(false));
              const currentRoute = window.location.pathname + window.location.search;
              if (currentRoute !== "/login") {
                storage.setItem("redirectAfterLogin", currentRoute);
              }
              authService.clearTokens();
              window.location.replace("/login");
              return;
            }
          }
        }

        // Nếu không phải lỗi token, tiếp tục xử lý action
        next(action);
      }; 