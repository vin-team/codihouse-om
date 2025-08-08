import UsersEditForm from "@/components/users/edit/Form";
import UsersEditChangePassword from "@/components/users/edit/ChangePassword";
import UsersEditHeader from "@/components/users/edit/Header";

export default function UsersEdit() {
  return (
    <div className="min-h-full flex flex-col gap-4">
      <UsersEditHeader />
      <UsersEditForm />
      <UsersEditChangePassword />
    </div>
  )
}