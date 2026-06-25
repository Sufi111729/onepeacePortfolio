import type { Metadata } from 'next';
import { AdminMessagesDashboard } from '@/components/admin/AdminMessagesDashboard';
import { ProtectedAdmin } from '@/components/admin/ProtectedAdmin';

export const metadata: Metadata = {
  title: 'Contact Messages | Muhammad Sufiyan Portfolio Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminMessagesPage() {
  return (
    <ProtectedAdmin>
      <AdminMessagesDashboard />
    </ProtectedAdmin>
  );
}
