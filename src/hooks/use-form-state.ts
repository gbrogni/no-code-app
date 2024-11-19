import { FormEvent, useState, useTransition } from 'react';

interface FormState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition();

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null },
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form: EventTarget & HTMLFormElement = event.currentTarget;
    const data: FormData = new FormData(form);

    startTransition(async () => {
      const state: FormState = await action(data);

      if (state.success && onSuccess) {
        await onSuccess();
      }

      setFormState(state);
    });

    form.reset();
  }

  return [formState, handleSubmit, isPending] as const;
}
