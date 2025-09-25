"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { editCollection } from "../lib/actions";
import { Collection } from "../lib/types";
import {
  collectionEditSchema,
  CollectionEditSchemaType,
} from "../lib/validation";
import ConditionsSection from "./ConditionsSection";
import ProductsSearchSection from "./ProductsSearchSection";
import SearchEngineListingSection from "./SearchEngineListingSection";

interface Props {
  collection: Collection;
}
export default function CollectionEditForm({ collection }: Props) {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(collectionEditSchema),
    mode: "onChange",
    defaultValues: {
      id: collection.id,
      title: collection.title,
      description: collection.description,
      type: collection.type,
      matchType: collection.matchType ?? undefined,
      pageTitle: collection.pageTitle ?? "",
      metaDescription: collection.metaDescription ?? "",
      slug: collection.slug,
      conditions: collection.conditions,
      products: collection.products.map((product) => product.id),
    },
  });

  console.log(form.formState.errors);

  function onSubmit(data: CollectionEditSchemaType) {
    startTransition(async () => {
      await editCollection(data);
      push("/dashboard/collections");
    });
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form
          action=""
          className="space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card>
            <CardContent className="space-y-5">
              <FormField
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          {collection.type === "automatic" ? (
            <ConditionsSection />
          ) : (
            <ProductsSearchSection />
          )}
          <SearchEngineListingSection />
          <Button disabled={isPending}>{isPending ? "Editing" : "Edit"}</Button>
        </form>
      </Form>
    </div>
  );
}
