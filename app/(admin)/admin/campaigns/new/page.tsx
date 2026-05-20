import { CampaignForm } from "@/components/admin/campaigns/CampaignForm";
import { CampaignService } from "@/services/campaign/campaign.service";

export default function NewCampaignPage() {
  async function handleCreate(data: any) {
    "use server";
    await CampaignService.createCampaign(data);
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Create Campaign
      </h2>

      <CampaignForm onSubmit={handleCreate} />
    </div>
  );
}