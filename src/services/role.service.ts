import { storage } from "@/utils/storage.util";
import { HttpService } from "./http/HttpService";
import { parseExecuteResult } from "./http/parse.service";
import { RoleModel } from "@/model/Role.mode";

class RoleService {
  async getRole(roleId: string) {
    const response = await HttpService.doGetRequest(`/roles/${roleId}`, '');
    return parseExecuteResult(response);
  }

  setRole(role: RoleModel) {
    storage.setItem(process.env.NEXT_PUBLIC_storageRoleKey!, JSON.stringify(role));
  }

  getRoleLocal() {
    return JSON.parse(storage.getItem(process.env.NEXT_PUBLIC_storageRoleKey!) || '{}') as RoleModel;
  }

  isAdmin() {
    return this.getRoleLocal().name === 'Admin App';
  }
}

export const roleService = new RoleService();