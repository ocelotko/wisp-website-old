import { useEffect, useState } from "preact/hooks";
import Header from "../components/Header.tsx";
import GoBackArrow from "./GoBackArrow.tsx";
import Button from "../components/Button.tsx";
import { formatBytes, formatTimeAgo } from "../utils/format.ts";

interface Block {
  height: number;
  hash: string;
  timestamp: number;
  transactions: string[];
}

interface TransactionSummary {
  hash: string;
  timestamp: number;
  total_output_wisp: string;
}

interface NetworkVitals {
  current_height: number;
  difficulty: string;
  avg_block_time_secs: number;
  reward_per_block_wisp: string;
  blockchain_size_bytes: number;
  next_halving_in_blocks: number;
  mempool_size: number;
  current_target: string;
}

const fetchLatest = async <T,>(
  endpoint: "blocks" | "transactions",
): Promise<T[]> => {
  const response = await fetch(`/api/v1/${endpoint}?page=1&limit=10`);
  if (!response.ok) {
    throw new Error(`Failed to fetch latest ${endpoint}`);
  }
  const result = await response.json();
  return result.data;
};

const fetchVitals = async (): Promise<NetworkVitals> => {
  const response = await fetch(`/api/v1/network/vitals`);
  if (!response.ok) {
    throw new Error("Failed to fetch network vitals");
  }
  return await response.json();
};

export default function BlockchainIsland() {
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);
  const [latestTransactions, setLatestTransactions] = useState<
    TransactionSummary[]
  >([]);
  const [vitals, setVitals] = useState<NetworkVitals | null>(null);

  useEffect(() => {
    const fetchData = () => {
      fetchLatest<Block>("blocks").then(setLatestBlocks).catch(console.error);
      fetchLatest<TransactionSummary>("transactions").then(
        setLatestTransactions,
      ).catch(console.error);
      fetchVitals().then(setVitals).catch(console.error);
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div class="bg-dark-background min-h-screen text-dark-onBackground font-dmsans">
      <Header />
      <main class="w-full p-6 md:p-12 pt-24 md:pt-32">
        <div class="flex items-start gap-4 mb-8">
          <GoBackArrow />
          <div>
            <h2 class="text-3xl font-bold">Blockchain Explorer</h2>
            <p class="text-dark-onSurfaceVariant mt-1">
              Explore blocks and transactions on the Wisp network.
            </p>
          </div>
        </div>

        <div class="flex flex-col bg-dark-surfaceContainer p-6 rounded-xl shadow-lg my-5">
          <div class="flex max-lg:flex-col md:items-center gap-8 my-2">
            <h1 class="flex-none text-dark-primary text-3xl font-semibold">
              Network Vitals
            </h1>
            <div class="flex-1 flex flex-warp md:justify-between items-center gap-8">
              <div class="px-4">
                <p class="uppercase opacity-80 text-sm">Avg Block Time</p>
                <p>
                  {vitals ? `${vitals.avg_block_time_secs.toFixed(2)}` : "..."}
                </p>
              </div>

              <div class="px-4">
                <p class="uppercase opacity-80 text-sm">Block Reward</p>
                <p>
                  {vitals ? `${vitals.reward_per_block_wisp} Wisp` : "..."}
                </p>
              </div>

              <div class="px-4">
                <p class="uppercase opacity-80 text-sm">Chain Size</p>
                <p>
                  {vitals ? formatBytes(vitals.blockchain_size_bytes) : "..."}
                </p>
              </div>

              <div class="px-4">
                <p class="uppercase opacity-80 text-sm">Difficulty</p>
                <p>{vitals ? vitals.difficulty : "..."}</p>
              </div>

              <div class="px-4">
                <p class="uppercase opacity-80 text-sm">Next Halving</p>
                <p>
                  {vitals
                    ? `${vitals.next_halving_in_blocks.toLocaleString()} blocks`
                    : "..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Blocks */}
          <div class="bg-dark-surfaceContainer p-6 rounded-xl shadow-lg flex flex-col">
            <div class="flex w-full items-center justify-between pb-4 mb-4 border-b border-dark-outlineVariant">
              <h3 class="text-2xl font-bold text-white">
                Latest Blocks
              </h3>
              <a
                href="/blocks"
                class="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer hover:bg-dark-surfaceVariant transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>

            <div class="flex-grow space-y-3">
              {latestBlocks.length > 0
                ? latestBlocks.map((block) => (
                  <div
                    key={block.hash}
                    onClick={() => (globalThis.location.href =
                      `/block/${block.hash}`)}
                    class="flex items-center gap-4 p-3 rounded-lg hover:bg-dark-surfaceVariant transition-colors cursor-pointer"
                  >
                    <div class="flex-shrink-0 bg-dark-surfaceContainerHighest p-2 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 text-dark-onSurface"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                        />
                      </svg>
                    </div>
                    <div class="flex-grow text-sm flex justify-between items-center text-dark-onSurfaceVariant">
                      <div>
                        <p class="text-dark-primary">
                          Block #{block.height}
                        </p>
                        <span>
                          {formatTimeAgo(block.timestamp)}
                        </span>
                      </div>
                      <span>{block.transactions.length} txs</span>
                    </div>
                  </div>
                ))
                : <p class="text-dark-onSurfaceVariant">Loading blocks...</p>}
            </div>
            <Button href="/blocks" variant="ghost" className="mt-6 w-full">
              View all blocks
            </Button>
          </div>

          {/* Latest Transactions */}
          <div class="bg-dark-surfaceContainer p-6 rounded-xl shadow-lg flex flex-col">
            <div class="flex w-full items-center justify-between pb-4 mb-4 border-b border-dark-outlineVariant">
              <h3 class="text-2xl font-bold text-white">
                Latest Transactions
              </h3>
              <a
                href="/transactions"
                class="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer hover:bg-dark-surfaceVariant transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>

            <div class="flex-grow space-y-3">
              {latestTransactions.length > 0
                ? latestTransactions.map((tx) => (
                  <div
                    key={tx.hash}
                    onClick={() => (globalThis.location.href =
                      `/transaction/${tx.hash}`)}
                    class="flex items-center gap-4 p-3 rounded-lg hover:bg-dark-surfaceVariant transition-colors cursor-pointer"
                  >
                    <div class="flex-shrink-0 bg-dark-surfaceContainerHighest p-2 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 text-dark-onSurface"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                        />
                      </svg>
                    </div>
                    <div class="flex-grow text-sm flex justify-between items-center w-full min-w-0">
                      <p class="text-dark-primary pr-4">
                        {`${tx.hash.substring(0, 6)}...${tx.hash.slice(-4)}`}
                      </p>
                      <p class="text-dark-onSurfaceVariant text-right flex-shrink-0">
                        {parseFloat(tx.total_output_wisp).toLocaleString(
                          undefined,
                        )} wisp
                      </p>
                    </div>
                  </div>
                ))
                : (
                  <p class="text-dark-onSurfaceVariant">
                    Loading transactions...
                  </p>
                )}
            </div>
            <Button
              href="/transactions"
              variant="ghost"
              className="mt-6 w-full"
            >
              View all transactions
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
