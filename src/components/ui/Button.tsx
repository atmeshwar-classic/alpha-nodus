import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "utils/cn";

const buttonVariants = cva(
  "text-sm text-center text-slate-700 bg-white cursor-pointer hover:bg-slate-100 transition-colors",
  {
    variants: {
      variant: {
        default: "px-4 py-2 border border-slate-700",
        icon: "w-10 h-10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, ...rest }: ButtonProps) {
  return <button className={cn(buttonVariants({ className }))} {...rest} />;
}
