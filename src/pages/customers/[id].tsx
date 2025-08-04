import Layout from "@/components/Layout";
import { useRouter } from "next/router";

interface CustomerDetailProps { }

const CustomerDetailPage: React.FC<CustomerDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout
      children={<></>}
    />
  )
}
export default CustomerDetailPage; 