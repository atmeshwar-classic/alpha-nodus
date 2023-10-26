import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "utils/cn";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

interface LabelProps
  extends LabelPrimitive.LabelProps,
    VariantProps<typeof labelVariants> {}

export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
}
