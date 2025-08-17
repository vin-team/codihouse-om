import { storage } from "@/utils/storage.util";
import { HttpService } from "./http/HttpService";
import { UserModel } from "@/model/User.model";
import { parseCommonHttpResult } from "./http/parseCommonResult";

class UserService {
  async getUser() {
    const queryParams = new URLSearchParams({ 'fields[]': '*' });
    queryParams.append('fields[]', 'role.app_role');
    const response = await HttpService.doGetRequest(`/users/me?${queryParams.toString()}`, '');
    return parseCommonHttpResult(response);
  }

  async getUserById(id: string) {
    const queryParams = new URLSearchParams({ 'fields[]': '*' });
    queryParams.append('fields[]', 'branch.id');
    queryParams.append('fields[]', 'branch.title');
    const response = await HttpService.doGetRequest(`/users/${id}?${queryParams.toString()}`, '');
    return parseCommonHttpResult(response);
  }

  async getUsers() {
    const queryParams = new URLSearchParams();
    const fields = [
      '*',
      'branch.id',
      'branch.title',
      'role.id',
      'role.app_role'
    ];
    fields.forEach(field => queryParams.append('fields[]', field));
    const filter = {
      _and: [
        {
          role: {
            app_role: { _eq: 'user' }
          }
        }
      ]
    }
    queryParams.append('filter', JSON.stringify(filter));
    const response = await HttpService.doGetRequest(`/users?${queryParams}`, '');
    return parseCommonHttpResult(response);
  }

  async searchUsers(filters: any) {
    const queryParams = new URLSearchParams();
    let filter: any = {};

    filter._and = [
      {
        role: {
          app_role: { _eq: 'user' }
        }
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

  async addUser(user: any) {
    const response = await HttpService.doPostRequest(`/users`, user);
    return parseCommonHttpResult(response);
  }

  async updateUser(data: { id: string, data: any }) {
    const response = await HttpService.doPatchRequest(`/users/${data.id}`, data.data);
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