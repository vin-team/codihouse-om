import UsersFilter from "@/components/users/Filter";
import UsersHeader from "@/components/users/Header";
import UsersList from "@/components/users/List";

export default function Users() {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <UsersHeader />
      <UsersFilter />
      <UsersList />
    </div>
  )
}