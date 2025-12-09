import { EditTransactionClient } from "@/features/transactions/components/editTransactionClient";

interface EditTransactionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTransactionPage({
  params,
}: EditTransactionPageProps) {
  const { id } = await params;

  return <EditTransactionClient id={id} />;
}
