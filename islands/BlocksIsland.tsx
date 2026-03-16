import { useEffect, useState } from "preact/hooks";
import Header from "../components/Header.tsx";
import GoBackArrow from "./GoBackArrow.tsx";
import { formatMiningTime, formatTimestamp } from "../utils/format.ts";
import ClipboardCopy from "./ClipboardCopy.tsx";

interface Block {
  height: number;
  hash: string;
  timestamp: number;
  transactions: unknown[];
  size: number;
  time_to_mine_secs: number | null;
  nonce: number;
}

interface BlockchainData {
  data: Block[];
  page: number;
  limit: number;
  total_blocks: number;
}

// Fetch blocks from the provided API endpoint with pagination
const fetchBlocks = async (
  page: number,
  limit: number,
): Promise<BlockchainData> => {
  const response = await fetch(`/api/v1/blocks?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blockchain data");
  }
  const result = await response.json();
  return result;
};

export default function BlocksIsland() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [limit] = useState(25);
  const [totalBlocks, setTotalBlocks] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const loadBlocks = async () => {
      try {
        setError(null);
        const result = await fetchBlocks(page, limit);
        if (page === 1) {
          setBlocks(result.data);
        } else {
          setBlocks((prevBlocks) => [...prevBlocks, ...result.data]);
        }
        setTotalBlocks(result.total_blocks);
      } catch (error) {
        console.error("Error fetching blocks:", error);
        setError(
          "Failed to load blockchain data. The node might be offline or there's an issue with the API response.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadBlocks();
  }, [page, limit]);

  // Effect for polling for new blocks
  useEffect(() => {
    const pollForNewBlocks = async () => {
      try {
        const result = await fetchBlocks(1, limit);
        setTotalBlocks(result.total_blocks);

        setBlocks((prevBlocks) => {
          if (prevBlocks.length === 0) return result.data;

          const existingHashes = new Set(prevBlocks.map((b) => b.hash));
          const newBlocks = result.data.filter((b) =>
            !existingHashes.has(b.hash)
          );

          return newBlocks.length > 0
            ? [...newBlocks, ...prevBlocks]
            : prevBlocks;
        });
      } catch (error) {
        console.error("Polling for new blocks failed:", error);
      }
    };

    const intervalId = setInterval(pollForNewBlocks, 15000); // Poll every 15 seconds
    return () => clearInterval(intervalId);
  }, [limit]); // Re-run if limit changes

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div class="bg-dark-background min-h-screen text-dark-onBackground font-dmsans">
      <Header />
      {/* Main Content */}
      <main class="w-full p-6 md:p-12 pt-24 md:pt-32">
        <div class="flex items-start gap-4 mb-6">
          <GoBackArrow />
          <div>
            <h2 class="text-3xl font-bold">
              Blocks History
            </h2>
            <p class="text-dark-onSurfaceVariant mt-1">
              {totalBlocks > 0
                ? `${totalBlocks.toLocaleString()} blocks since inception`
                : "Loading..."}
            </p>
          </div>
        </div>

        <div class="bg-dark-surfaceContainer rounded-xl shadow-lg overflow-hidden">
          {isLoading && blocks.length === 0
            ? (
              <div class="p-8 flex items-center justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-4 border-t-dark-primary border-transparent">
                </div>
                <span class="ml-4 text-dark-onSurfaceVariant">
                  Loading blocks...
                </span>
              </div>
            )
            : error
            ? (
              <div class="p-8 text-center text-red-400">
                <p class="text-lg font-bold">An Error Occurred</p>
                <p class="mt-2">
                  {error}
                </p>
              </div>
            )
            : !isLoading && blocks.length === 0
            ? (
              <div class="p-8 text-center text-dark-onSurfaceVariant">
                <p class="text-lg">No blocks have been mined yet.</p>
                <p class="mt-2">
                  Please wait for the first block to be created.
                </p>
              </div>
            )
            : (
              <div class="overflow-x-auto">
                <table class="w-full table-auto text-left whitespace-nowrap">
                  <thead class="text-dark-onSurfaceVariant uppercase text-xs border-b border-dark-outlineVariant">
                    <tr>
                      <th class="px-6 py-3">Number</th>
                      <th class="px-6 py-3 text-left">Hash</th>
                      <th class="px-6 py-3 text-left">Mined At</th>
                      <th class="px-6 py-3 text-left">Time to Mine</th>
                      <th class="px-6 py-3 text-left">Tx Count</th>
                      <th class="px-6 py-3 text-left">Size (bytes)</th>
                      <th class="px-6 py-3 text-left">Nonce</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-dark-outlineVariant">
                    {blocks.map((block) => (
                      <tr
                        key={block.height}
                        class="hover:bg-dark-surfaceVariant transition-colors cursor-pointer"
                        onClick={() => (globalThis.location.href =
                          `/block/${block.hash}`)}
                      >
                        <td class="px-6 py-4">
                          <span class="font-semibold">
                            {block.height}
                          </span>
                        </td>
                        <td class="px-6 py-4 text-left">
                          <ClipboardCopy
                            text={block.hash}
                            displayText={`${block.hash.substring(0, 6)}...${
                              block.hash.slice(-4)
                            }`}
                            className="hover:underline text-dark-primary"
                          />
                        </td>
                        <td class="px-6 py-4 text-left">
                          {formatTimestamp(block.timestamp)}
                        </td>
                        <td class="px-6 py-4 text-left">
                          {(() => {
                            if (block.time_to_mine_secs != null) {
                              return formatMiningTime(block.time_to_mine_secs);
                            }
                            return "N/A";
                          })()}
                        </td>
                        <td class="px-6 py-4 text-left">
                          {block.transactions.length}
                        </td>
                        <td class="px-6 py-4 text-left">
                          {block.size.toLocaleString()}
                        </td>
                        <td class="px-6 py-4 text-left">
                          {block.nonce.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div class="p-4 flex justify-center">
                  {totalBlocks > blocks.length
                    ? (
                      <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        class="bg-dark-primaryContainer text-dark-onPrimaryContainer font-bold py-2 px-4 rounded-xl shadow-lg hover:bg-dark-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Loading..." : "Load More"}
                      </button>
                    )
                    : blocks.length > 0 && (
                      <p class="text-dark-onSurfaceVariant">
                        All blocks loaded.
                      </p>
                    )}
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
