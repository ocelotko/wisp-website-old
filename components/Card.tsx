import { ComponentChildren } from "preact";
import Button, { ButtonVariant } from "./Button.tsx";

interface CardProps {
  icon?: ComponentChildren;
  title?: string;
  text: string;
  buttonLabel?: string;
  buttonOnClick?: () => void;
  buttonHref?: string;
  buttonVariant?: ButtonVariant;
  buttonClassName?: string;
  buttonBgColorClassName?: string;
  buttonTextColorClassName?: string;
  secondButtonLabel?: string;
  secondButtonOnClick?: () => void;
  secondButtonHref?: string;
  secondButtonVariant?: ButtonVariant;
  secondButtonClassName?: string;
  secondButtonBgColorClassName?: string;
  secondButtonTextColorClassName?: string;
  className?: string;
}

const Card = ({
  icon,
  title,
  text,
  buttonLabel,
  buttonOnClick,
  buttonHref,
  buttonVariant,
  buttonClassName,
  buttonBgColorClassName,
  buttonTextColorClassName,
  secondButtonLabel,
  secondButtonOnClick,
  secondButtonHref,
  secondButtonVariant,
  secondButtonClassName,
  secondButtonBgColorClassName,
  secondButtonTextColorClassName,
  className,
}: CardProps) => {
  const cardClassName =
    `rounded-2xl shadow-md p-6 bg-dark-surfaceContainer flex flex-col items-center text-center flex-1 ${
      className || ""
    }`;
  const headerClassName = "flex items-center justify-start mb-2 w-full";
  const buttonContainerClassName = "w-full mt-4 flex justify-center gap-2";

  return (
    <div className={cardClassName} style={{ height: "fit-content" }}>
      <div className={headerClassName}>
        {icon && <div className="mr-2">{icon}</div>}
        {title && (
          <h3 className="text-white font-semibold uppercase">{title}</h3>
        )}
      </div>
      <p className="text-white/75 mb-2 text-left w-full">{text}</p>
      {buttonLabel || secondButtonLabel
        ? (
          <div className={buttonContainerClassName}>
            {buttonLabel && (
              <Button
                onClick={buttonOnClick}
                href={buttonHref}
                variant={buttonVariant}
                className={`${buttonClassName || ""} !px-8 text-sm`}
                bgColorClassName={buttonBgColorClassName}
                textColorClassName={buttonTextColorClassName}
              >
                {buttonLabel}
              </Button>
            )}
            {secondButtonLabel && (
              <Button
                onClick={secondButtonOnClick}
                href={secondButtonHref}
                variant={secondButtonVariant}
                className={`${secondButtonClassName || ""} !px-8 text-sm`}
                bgColorClassName={secondButtonBgColorClassName}
                textColorClassName={secondButtonTextColorClassName}
              >
                {secondButtonLabel}
              </Button>
            )}
          </div>
        )
        : null}
    </div>
  );
};

export default Card;
