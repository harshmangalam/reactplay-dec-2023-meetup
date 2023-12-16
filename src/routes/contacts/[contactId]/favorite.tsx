import { component$ } from "@builder.io/qwik";
import { useFavoriteContact } from ".";
import { Form } from "@builder.io/qwik-city";
import StarIcon from "~/assets/icons/star.svg?jsx";
import StarSolidIcon from "~/assets/icons/star-solid.svg?jsx";
import { Button } from "~/components/ui/button";

export const Favorite = component$(({ favorite }: { favorite: boolean }) => {
  const actionSig = useFavoriteContact();
  return (
    <Form action={actionSig}>
      <Button
        circle
        loading={actionSig.isRunning}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? (
          <span class="text-warning">
            <StarSolidIcon />
          </span>
        ) : (
          <StarIcon />
        )}
      </Button>
    </Form>
  );
});
