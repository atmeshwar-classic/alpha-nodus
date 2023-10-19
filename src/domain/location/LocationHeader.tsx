import { Button, type ButtonProps } from "components/ui/Button";
import { ReactNode } from "react";
import { cn } from "utils/cn";

function LocationHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("grid grid-cols-3 items-center", className)}>
      {children}
    </header>
  );
}

function LocationHeaderTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("text-xl font-semibold text-center", className)}>
      {children}
    </h1>
  );
}

function LocationHeaderAction({
  children,
  ...rest
}: { children: ReactNode } & ButtonProps) {
  return <Button {...rest}>{children}</Button>;
}

export { LocationHeader, LocationHeaderAction, LocationHeaderTitle };
