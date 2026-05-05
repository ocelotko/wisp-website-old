import { Handlers, PageProps } from "$fresh/server.ts";
import GoBackArrow from "../../islands/GoBackArrow.tsx";
import Header from "../../components/Header.tsx";
import TransactionDetail from "../../islands/TransactionDetail.tsx";

const RUST_API_BASE_URL = "http://localhost:3001";
// export const RUST_API_BASE_URL = "http://92.180.227.230:1571";

interface ApiTransactionInput {
  outpoint: string;
  signature: string | null;
}

interface ApiTransactionOutput {
  value: string;
  address: string;
}

interface TransactionDetails {
  hash: string;
  block_height: number | null;
  timestamp: number;
  inputs: ApiTransactionInput[];
  outputs: ApiTransactionOutput[];
  fee_or_reward: string;
  total_output_wisp: string;
  coinbase_message?: string;
}

interface Data {
  transaction: TransactionDetails | null;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const { hash } = ctx.params;

    const backendUrl = `${RUST_API_BASE_URL}/api/v1/transaction/${hash}`;

    try {
      const response = await fetch(backendUrl);

      if (response.status === 404) {
        return ctx.render({ transaction: null });
      }

      if (!response.ok) {
        console.error(`Error fetching transaction: ${response.statusText}`);
        throw new Error("Failed to fetch transaction details");
      }

      const transaction: TransactionDetails = await response.json();
      return ctx.render({ transaction });
    } catch (error) {
      console.error("Error in transaction detail handler:", error);
      return ctx.render({ transaction: null });
    }
  },
};

export default function TransactionDetailPage({ data }: PageProps<Data>) {
  const { transaction } = data;

  return (
    <div class="bg-dark-background min-h-screen text-dark-onBackground font-dmsans">
      <Header />
      <main class="w-full p-6 md:p-12 pt-24 md:pt-32">
        {transaction
          ? (
            <div>
              <div class="flex items-center gap-4 mb-6">
                <GoBackArrow />
                <h2 class="text-3xl font-bold">Transaction Details</h2>
              </div>
              <TransactionDetail transaction={transaction} />
            </div>
          )
          : (
            <div class="text-center p-8 bg-dark-surfaceContainer rounded-xl shadow-lg">
              <h1 class="text-2xl font-bold text-red-400">
                Transaction Not Found
              </h1>
              <p class="mt-2 text-dark-onSurfaceVariant">
                The transaction with the specified hash could not be found.
              </p>
            </div>
          )}
      </main>
    </div>
  );
}
