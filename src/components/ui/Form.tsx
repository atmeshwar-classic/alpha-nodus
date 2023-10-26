import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "utils/cn";
import { Label } from "./Label";

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const useFormField = () => {
  const itemContext = React.useContext(FormItemContext);

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return itemContext;
};

export function FormField({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

export function FormLabel(props: React.ComponentProps<typeof Label>) {
  const { id } = useFormField();

  return <Label htmlFor={id} {...props} />;
}

export function FormControl({ ...props }) {
  const { id } = useFormField();

  return <Slot id={id} {...props} />;
}
