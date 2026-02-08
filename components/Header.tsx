const Header = () => {
  return (
    <header class="w-full flex items-center justify-center bg-transparent">
      <div class="w-full px-12 py-4 flex items-center justify-between">
        <div>
          <a
            href="/"
            class="text-dark-primary text-2xl font-black uppercase"
          >
            Wisp
          </a>
        </div>
        <div class="flex items-center justify-center gap-8">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
