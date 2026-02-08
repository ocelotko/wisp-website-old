import { Handlers, PageProps } from "$fresh/server.ts";
import GoBackArrow from "../../islands/GoBackArrow.tsx";
import Header from "../../components/Header.tsx";
import BlockDetail from "../../islands/BlockDetail.tsx";

const RUST_API_BASE_URL = "http://localhost:3001";

interface TransactionSummary {
  hash: string;
  total_output_wisp: string;
}

interface BlockDetails {
  version: number;
  height: number;
  hash: string;
  timestamp: number;
  transactions: TransactionSummary[];
  size: number;
  nonce: number;
  difficulty: string;
  previous_hash: string;
  time_to_mine_secs: number | null;
  mined_by: string | null;
}

interface Data {
  block: BlockDetails | null;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const { hash } = ctx.params;

    const backendUrl = `${RUST_API_BASE_URL}/api/v1/block/hash/${hash}`;

    try {
      const response = await fetch(backendUrl);

      if (response.status === 404) {
        return ctx.render({ block: null });
      }

      if (!response.ok) {
        console.error(`Error fetching block: ${response.statusText}`);
        throw new Error("Failed to fetch block details");
      }

      const block: BlockDetails = await response.json();
      return ctx.render({ block });
    } catch (error) {
      console.error("Error in block detail handler:", error);
      return ctx.render({ block: null });
    }
  },
};

export default function BlockDetailPage({ data }: PageProps<Data>) {
  const { block } = data;

  return (
    <div class="bg-dark-background min-h-screen text-dark-onBackground font-dmsans">
      <Header />
      <main class="w-full px-12 py-8">
        {block
          ? (
            <div>
              <div class="flex items-center gap-4 mb-6">
                <GoBackArrow />
                <h2 class="text-3xl font-bold">
                  Block Information
                </h2>
              </div>
              <BlockDetail block={block} />
            </div>
          )
          : (
            <div class="text-center p-8 bg-dark-surfaceContainer rounded-xl shadow-lg">
              <h1 class="text-2xl font-bold text-red-400">Block Not Found</h1>
              <p class="mt-2 text-dark-onSurfaceVariant">
                The block with the specified hash could not be found.
              </p>
            </div>
          )}
      </main>
    </div>
  );
}
