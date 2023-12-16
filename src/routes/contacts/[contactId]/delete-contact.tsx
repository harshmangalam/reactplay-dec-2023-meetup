import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useDeleteContact } from ".";

export const DeleteContact = component$(() => {
  const action = useDeleteContact();
  return (
    <Form action={action}>
      <button
        disabled={action.isRunning}
        class="disabled:bg-gray-100 disabled:cursor-wait disabled:text-gray-500 py-2 px-2 rounded-md border text-sm font-medium text-red-500 shadow"
        type="submit"
      >
        Delete
      </button>
    </Form>
  );
});
