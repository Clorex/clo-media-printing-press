import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { CampaignTable } from "@/components/admin/campaigns/CampaignTable";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function CampaignsPage() {
  const snapshot = await adminDb
    .collection(COLLECTIONS.CAMPAIGNS)
    .get();

  const campaigns = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Campaigns
        </h2>

        <Link href="/admin/campaigns/new">
          <Button>Create Campaign</Button>
        </Link>
      </div>

      <CampaignTable campaigns={campaigns} />
    </div>
  );
}