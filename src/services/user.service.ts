import { storage } from "@/utils/storage.util";
import { HttpService } from "./http/HttpService";
import { parseExecuteResult } from "./http/parse.service";
import { UserModel } from "@/model/User.model";

class UserService {
  async getUser() {
    const queryParams = new URLSearchParams({ 'fields[]': '*' });
    const response = await HttpService.doGetRequest(`/users/me?${queryParams.toString()}`, '');
    return parseExecuteResult(response);
  }

  setUser(user: UserModel) {
    storage.setItem(process.env.NEXT_PUBLIC_storageUserKey!, JSON.stringify(user));
  }

  getUserLocal() {
    return JSON.parse(storage.getItem(process.env.NEXT_PUBLIC_storageUserKey!) || '{}') as UserModel;
  }
}

export const userService = new UserService();