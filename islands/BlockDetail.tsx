import { useState } from "preact/hooks";
import { formatTimeAgo, formatTimestamp } from "../utils/format.ts";
import ClipboardCopy from "./ClipboardCopy.tsx";

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

interface TransactionSummary {
  hash: string;
  total_output_wisp: string;
}

interface BlockDetailProps {
  block: BlockDetails;
}

export default function BlockDetail({ block }: BlockDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["Overview", "Details", "Transactions"];

  return (
    <div class="bg-dark-surfaceContainer rounded-xl shadow-lg">
      {/* Tabs */}
      <div class="border-b border-dark-outlineVariant">
        <nav class="flex gap-4 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab.toLowerCase())}
              class={`py-4 px-1 font-semibold border-b-2 transition-colors ${
                activeTab === tab.toLowerCase()
                  ? "border-dark-primary text-dark-primary"
                  : "border-transparent text-dark-onSurfaceVariant hover:text-dark-onSurface"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div class="p-6">
        {activeTab === "overview" && (
          <div class="grid grid-cols-1 gap-y-8 justify-start items-start py-8">
            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Hash
              </div>

              <span class="w-full col-span-4 font-mono break-all">
                {block.hash}
              </span>
            </p>

            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Block number
              </div>
              <span class="w-full">{block.height}</span>
            </p>

            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Mined
              </div>
              <span class="w-full col-span-4">
                {formatTimeAgo(block.timestamp)}{"  "}
                ({formatTimestamp(block.timestamp)})
              </span>
            </p>

            {block.mined_by && (
              <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
                <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                  Mined by
                </div>
                <span class="w-full col-span-4 font-mono break-all">
                  <ClipboardCopy
                    text={block.mined_by}
                    className="text-dark-primary"
                  />
                </span>
              </p>
            )}

            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Transactions
              </div>
              <div class="w-full">
                <span
                  class="hover:underline text-dark-primary cursor-pointer"
                  onClick={() => setActiveTab("transactions")}
                >
                  {block.transactions.length} {block.transactions.length === 1
                    ? "transaction"
                    : "transactions"}
                </span>
              </div>
            </p>

            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Median time
              </div>
              <span class="w-full">N/A</span>
            </p>
          </div>
        )}

        {activeTab === "details" && (
          <div class="grid grid-cols-1 gap-y-8 justify-start items-start py-8">
            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Size
              </div>{" "}
              <span class="w-full">{block.size.toLocaleString()} bytes</span>
            </p>

            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Version
              </div>
              <span class="w-full">{block.version}</span>
            </p>

            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Merkle root
              </div>
              <span class="w-full">N/A</span>
            </p>

            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Difficulty
              </div>
              <span class="w-full">{block.difficulty}</span>
            </p>

            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Nonce
              </div>
              <span class="w-full">{block.nonce.toLocaleString()}</span>
            </p>

            <p class="flex flex-col lg:grid lg:grid-cols-5 md!gap-2 lg:items-center justify-between">
              <div class="flex items-center space-x-2 col-span-1 uppercase text-sm text-dark-onSurfaceVariant">
                Chainwork
              </div>
              <span class="w-full">N/A</span>
            </p>
          </div>
        )}

        {activeTab === "transactions" && (
          <div>
            {block.transactions.length > 0
              ? (
                <ul class="space-y-2 py-4">
                  {block.transactions.map((tx) => (
                    <li
                      key={tx.hash}
                      class="cursor-pointer font-mono text-sm bg-dark-surface p-3 rounded-md hover:bg-dark-surfaceVariant transition-colors flex justify-between items-center"
                      onClick={() => (globalThis.location.href =
                        `/transaction/${tx.hash}`)}
                    >
                      <div class="block hover:underline text-dark-primary break-all">
                        {tx.hash}
                      </div>
                      <span class="ml-4 px-2 py-1 text-xs whitespace-nowrap">
                        {tx.total_output_wisp} wisp
                      </span>
                    </li>
                  ))}
                </ul>
              )
              : (
                <p class="text-dark-onSurfaceVariant">
                  No transactions in this block.
                </p>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
