import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS, DOCUMENT_IDS } from "@/lib/firebase/collections";
import { SettingsForm } from "@/components/admin/settings/SettingsForm";

export default async function SettingsPage() {
  const doc = await adminDb
    .collection(COLLECTIONS.SETTINGS)
    .doc(DOCUMENT_IDS.SITE_SETTINGS)
    .get();

  const settings = doc.exists ? doc.data() : null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Settings
      </h2>

      <SettingsForm settings={settings} />
    </div>
  );
}