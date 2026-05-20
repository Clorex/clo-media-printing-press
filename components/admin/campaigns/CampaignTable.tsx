"use client";

export function CampaignTable({ campaigns }: any) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-brand-gray-light">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Active</th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map((campaign: any) => (
            <tr key={campaign.id} className="border-t">
              <td className="p-3">
                {campaign.title}
              </td>
              <td className="p-3">
                ₦{campaign.overridePrice}
              </td>
              <td className="p-3">
                {campaign.isActive ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
