import Header from "../components/Header.tsx";

export default function About() {
  return (
    <div class="bg-dark-background min-h-screen text-dark-onBackground font-dmsans">
      <Header />
      <main class="w-full p-6 md:p-12 pt-24 md:pt-32 flex flex-col gap-8">
        <h1 class="text-white text-3xl font-extrabold text-center">
          About Wisp
        </h1>
        <div class="flex flex-col gap-10 py-8">
          <div class="flex flex-col gap-3">
            <h2 class="text-dark-primary text-xl font-bold">A Brief History</h2>
            <p>
              Wisp was launched as an academic, open-source project to
              demonstrate a high-performance, safe blockchain implementation.
              Unlike older cryptocurrencies, Wisp is engineered in{" "}
              <strong>Rust</strong>, eliminating entire classes of critical
              security vulnerabilities inherent in memory-unsafe languages.
            </p>
            <p>
              The project was a fair launch — no pre-mine, no instamine, and
              100% of the block reward goes directly to the miners who secure
              the network. Wisp builds on the robust UTXO model, focusing on
              engineering efficiency and provable safety.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <h2 class="text-dark-primary text-xl font-bold">
              The Core Philosophy
            </h2>
            <p>
              Wisp is a secure, digital commodity built for developers and
              researchers who value engineering integrity. Our primary focus is
              on{" "}
              <strong>safety and performance</strong>, achieved by leveraging
              Rust's unique capabilities. Every piece of the protocol, from
              transaction handling to the consensus mechanism, is auditable,
              open-source, and designed for maximum stability.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <h2 class="text-dark-primary text-xl font-bold">
              Technical Specifications
            </h2>
            <p>
              Wisp uses a set of tightly controlled parameters to ensure
              predictable performance and scalability.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <h2 class="text-dark-primary text-xl font-bold">
              Proof-of-Work (PoW)
            </h2>
            <p>
              Wisp utilizes double-SHA256 for its Proof-of-Work algorithm, a
              widely trusted and computationally straightforward standard.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <h2 class="text-dark-primary text-xl font-bold">
              Block Parameters
            </h2>
            <p>
              The network is structured around a precise block schedule and size
              limit:
            </p>
            <ul class="list-disc ml-6
            ">
              <li class="text-sm">A new block is mined every ~2 minutes.</li>
              <li class="text-sm">The maximum block size is fixed at 1 MB.</li>
              <li class="text-sm">
                The maximum number of transactions per block is capped at 4,000
                as a secondary security limit.
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-3">
            <h2 class="text-dark-primary text-xl font-bold">Emission Curve</h2>
            <p>
              Wisp implements a clear, predictable monetary policy to ensure
              long-term incentive for miners:
            </p>
            <ul class="list-disc ml-6
            ">
              <li class="text-sm">
                <b>Initial Block Reward:</b> 100 WISP per block.
              </li>
              <li class="text-sm">
                <b>Halving:</b>{" "}
                The block reward is halved every 525,600 blocks, which equates
                to approximately every two years. This schedule provides an
                aggressive initial distribution followed by a gradual decrease
                in inflation.
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-3">
            <h2 class="text-dark-primary text-xl font-bold">
              Difficulty Adjustment
            </h2>
            <p>
              To maintain the 2-minute block time, the mining difficulty is
              automatically adjusted based on the previous 720 blocks
              (approximately 24 hours of activity), ensuring network stability
              regardless of changes in hashing power.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <h2 class="text-dark-primary text-xl font-bold">
              Core Dependencies (Built in Rust)
            </h2>
            <p>The project leverages modern, high-performance Rust crates:</p>
            <ul class="list-disc ml-6
            ">
              <li class="text-sm">
                <b>Storage:</b> Uses the embedded key-value database{" "}
                <code class="bg-dark-surfaceContainer px-1 py-0.5 rounded">
                  sled
                </code>{" "}
                for efficient persistent storage of the blockchain state.
              </li>
              <li class="text-sm">
                <b>Asynchronous Processing:</b> Built on the{" "}
                <code class="bg-dark-surfaceContainer px-1 py-0.5 rounded">
                  tokio
                </code>{" "}
                runtime for scalable, concurrent network operations.
              </li>
              <li class="text-sm">
                <b>Cryptography:</b> Uses{" "}
                <code class="bg-dark-surfaceContainer px-1 py-0.5 rounded">
                  k256
                </code>{" "}
                for Secp256k1 elliptic curve cryptography and{" "}
                <code class="bg-dark-surfaceContainer px-1 py-0.5 rounded">
                  sha2
                </code>{" "}
                for hashing, ensuring standard and robust security primitives.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
