interface GoBackArrowProps {
  href?: string;
}

const GoBackArrow = ({ href }: GoBackArrowProps) => {
  const goBack = () => {
    globalThis.history.back();
  };

  const commonProps = {
    class: "flex items-center justify-center rounded-full w-10 h-10 " +
      "cursor-pointer hover:bg-primary-15 transition-colors",
  };

  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 text-dark-primary"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 19.5 7.5 12l7.5-7.5"
      />
    </svg>
  );

  return href
    ? <a href={href} {...commonProps}>{svg}</a>
    : <div onClick={goBack} {...commonProps}>{svg}</div>;
};

export default GoBackArrow;
