import { storage } from "@/utils/storage.util";
import { HttpService } from "./http/HttpService";
import { UserModel } from "@/model/User.model";
import { parseCommonHttpResult } from "./http/parseCommonResult";

class UserService {
  async getUser() {
    const queryParams = new URLSearchParams({ 'fields[]': '*' });
    const response = await HttpService.doGetRequest(`/users/me?${queryParams.toString()}`, '');
    return parseCommonHttpResult(response);
  }

  async getUsers() {
    const queryParams = new URLSearchParams({ 'filter[_and][0][role][_eq]': process.env.NEXT_PUBLIC_storageUserRoleId! });
    const fields = [
      '*',
      'branch.id',
      'branch.title',
    ];
    fields.forEach(field => queryParams.append('fields[]', field));
    const response = await HttpService.doGetRequest(`/users?${queryParams}`, '');
    return parseCommonHttpResult(response);
  }

  async searchUsers(filters: any) {
    const queryParams = new URLSearchParams();
    let filter: any = {};

    filter._and = [
      {
        role: { _eq: process.env.NEXT_PUBLIC_storageUserRoleId! }
      }
    ];

    if (filters.search) {
      filter._or = [
        {
          first_name: { _icontains: filters.search }
        },
        {
          last_name: { _icontains: filters.search }
        },
        {
          email: { _icontains: filters.search }
        },
        {
          phone: { _icontains: filters.search }
        }
      ];
    }

    queryParams.append('fields[]', '*');
    queryParams.append('filter', JSON.stringify(filter));
    const response = await HttpService.doGetRequest(`/users?${queryParams}`, '');
    return parseCommonHttpResult(response);
  }

  setUser(user: UserModel) {
    storage.setItem(process.env.NEXT_PUBLIC_storageUserKey!, JSON.stringify(user));
  }

  getUserLocal() {
    return JSON.parse(storage.getItem(process.env.NEXT_PUBLIC_storageUserKey!) || '{}') as UserModel;
  }
}

export const userService = new UserService();