import { useSignal } from "@preact/signals";

const Header = () => {
  const isMenuOpen = useSignal(false);

  return (
    <header class="w-full bg-transparent absolute top-0 left-0 z-10">
      <div class="w-full px-6 md:px-12 py-4 flex items-center justify-between">
        <div>
          <a
            href="/"
            class="text-dark-primary text-2xl font-black uppercase"
          >
            Wisp
          </a>
        </div>
        <nav class="hidden md:flex items-center justify-center gap-8">
          <a
            href="/features"
            class="text-lg font-normal text-white hover-underline-animation"
          >
            Features
          </a>
          <a
            href="/docs"
            class="text-lg font-normal text-white hover-underline-animation"
          >
            Docs
          </a>
          <a
            href="/blockchain"
            class="text-lg font-normal text-white hover-underline-animation"
          >
            Blockchain Explorer
          </a>
          <a
            href="https://github.com/ocelotko/wisp"
            class="text-lg font-normal text-white hover-underline-animation"
            target="_blank"
          >
            GitHub
          </a>
        </nav>
        <div class="md:hidden">
          <button
            type="button"
            onClick={() => isMenuOpen.value = !isMenuOpen.value}
            class="text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen.value
              ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              )
              : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
          </button>
        </div>
      </div>
      {isMenuOpen.value && (
        <div class="md:hidden absolute top-full left-0 w-full bg-dark-surfaceContainer shadow-lg">
          <nav class="flex flex-col items-center gap-4 py-4">
            <a href="/features" class="text-lg font-normal text-white p-2">
              Features
            </a>
            <a href="/docs" class="text-lg font-normal text-white p-2">
              Docs
            </a>
            <a href="/blockchain" class="text-lg font-normal text-white p-2">
              Blockchain Explorer
            </a>
            <a
              href="https://github.com/ocelotko/wisp"
              class="text-lg font-normal text-white p-2"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
