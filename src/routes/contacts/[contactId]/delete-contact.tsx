import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useDeleteContact } from ".";

export const DeleteContact = component$(() => {
  const action = useDeleteContact();
  return (
    <Form action={action}>
      <button disabled={action.isRunning} class="btn btn-error" type="submit">
        Delete
      </button>
    </Form>
  );
});
