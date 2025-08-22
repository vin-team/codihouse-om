'use client'
import LogsBody from "@/components/logs/LogsBody";
import LogsHeader from "@/components/logs/LogsHeader";
import { useRouter } from "next/router";

export default function LogDetail() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    router.push('/logs');
  }

  return <div>
    <div className="min-h-full flex flex-col gap-4">
      <LogsHeader id={id as string} />
      <LogsBody id={id as string} />
    </div>
  </div>
}