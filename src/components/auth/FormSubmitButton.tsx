"use client";

import { useFormStatus } from "react-dom";

type Props = {
  loadingMessage: string;
};

function FormSubmitButton({ loadingMessage }: Props) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      {pending ? loadingMessage : "Submit"}
    </button>
  );
}

export default FormSubmitButton;
