import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useDeleteContact } from ".";
import { Button } from "~/components/ui/button";

export const DeleteContact = component$(() => {
  const actionSig = useDeleteContact();
  return (
    <Form action={actionSig}>
      <Button
        loading={actionSig.isRunning}
        colorScheme={"btn-error"}
        type="submit"
      >
        Delete
      </Button>
    </Form>
  );
});
