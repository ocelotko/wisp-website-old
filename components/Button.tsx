import { ComponentChildren, JSX } from "preact";
import { memo } from "preact/compat";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  variant?: ButtonVariant;
  children: ComponentChildren;
  className?: string;
  bgColorClassName?: string;
  textColorClassName?: string;
  icon?: JSX.Element;
  iconAfter?: boolean;
}

const Button = memo(
  ({
    onClick,
    href,
    variant,
    children,
    className,
    bgColorClassName,
    textColorClassName,
    icon,
    iconAfter = false,
  }: ButtonProps) => {
    const baseClassName =
      "py-2 px-4 rounded-full shadow text-center font-medium select-none cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 " +
      (className || "");

    let variantClassName = "";
    switch (variant) {
      case "primary":
        variantClassName = bgColorClassName
          ? "bg-dark-primary text-dark-onPrimary"
          : "bg-dark-primary hover:bg-primary-70 text-dark-onPrimary";
        break;
      case "secondary":
        variantClassName = bgColorClassName
          ? "bg-white text-black"
          : "bg-white hover:bg-gray-200 text-black";
        break;
      case "danger":
        variantClassName = bgColorClassName
          ? "bg-red-500 text-white"
          : "bg-red-500 hover:bg-red-600 text-white";
        break;
      case "ghost":
        variantClassName = bgColorClassName
          ? "text-dark-primary bg-transparent border-2 border-dark-outline"
          : "text-dark-primary bg-transparent border-2 border-dark-outline hover:bg-primary-15";
        break;
      default:
        variantClassName = bgColorClassName
          ? "bg-dark-primary text-dark-onPrimary"
          : "bg-dark-primary hover:bg-primary-70 text-dark-onPrimary";
        break;
    }

    const finalClassName = `${baseClassName} ${variantClassName} ${
      bgColorClassName || ""
    } ${textColorClassName || ""}`;

    const buttonContent = (
      <>
        {!iconAfter && icon && icon} <span>{children}</span>
        {iconAfter && icon && icon}
        {" "}
      </>
    );

    if (href) {
      return (
        <a href={href} className={finalClassName}>
          {buttonContent}
        </a>
      );
    }

    if (onClick) {
      return (
        <button type="button" className={finalClassName} onClick={onClick}>
          {buttonContent}
        </button>
      );
    }

    return (
      <div className={finalClassName}>
        {buttonContent}
      </div>
    );
  },
);

export default Button;
