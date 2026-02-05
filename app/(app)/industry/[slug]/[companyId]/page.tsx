import { CompanyCalls } from "@/components/company/CompanyCalls";

export default async function Page({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  return <CompanyCalls companyId={companyId} />;
}
