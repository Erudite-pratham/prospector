import { IndustryTabs } from "@/components/industry/IndustryTabs";

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="space-y-8 py-8">
      <IndustryTabs industryId={slug} />
    </div>
  );
}
