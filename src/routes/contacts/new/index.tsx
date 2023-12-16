import { component$ } from "@builder.io/qwik";
import { routeAction$, zod$, z, Form, Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button";
import { TextInput } from "~/components/ui/text-input";
import { Textarea } from "~/components/ui/textarea";
import { prisma } from "~/lib/prisma";

export const useAddContact = routeAction$(
  async (formData, { redirect }) => {
    const contact = await prisma.contact.create({
      data: formData,
    });

    throw redirect(303, `/contacts/${contact.id}`);
  },
  zod$({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string(),
    twitter: z.string(),
    avatarUrl: z.string(),
    notes: z.string(),
  }),
);
export default component$(() => {
  return (
    <article class="card card-bordered mx-auto max-w-xl">
      <Form class="card-body">
        <header class="card-title">New Contact</header>
        <div>
          <TextInput name="name" id="name" label="Full Name" error={""} />
          <TextInput
            name="twitter"
            id="twitter"
            label="Twitter handler"
            error={""}
          />
          <TextInput
            name="twitter"
            id="twitter"
            label="Twitter handler"
            error={""}
          />
          <TextInput name="avatar" id="avatar" label="Avatar URL" error={""} />
          <Textarea name="notes" id="notes" label="Notes" error={""} />
        </div>

        <footer class="card-actions">
          <Link class="btn btn-error" href={"/"}>
            Cancel
          </Link>
          <Button type={"submit"} colorScheme={"btn-primary"}>
            Create
          </Button>
        </footer>
      </Form>
    </article>
  );
});
