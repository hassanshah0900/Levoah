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
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCollection } from "../lib/actions";
import { collectionSchema, CollectionSchemaType } from "../lib/validation";
import CollectionTypeSection from "./CollectionTypeSection";
import SearchEngineListingSection from "./SearchEngineListingSection";

export default function CollectionForm() {
  const form = useForm({
    resolver: zodResolver(collectionSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      type: "automatic",
      matchType: "and",
      pageTitle: "",
      metaDescription: "",
      slug: "",
    },
  });

  console.log(form.formState.errors);

  const { mutate, isPending } = useMutation({
    mutationFn: createCollection,
  });

  function onSubmit(data: CollectionSchemaType) {
    mutate(data);
    console.log(data);
  }
  return (
    <div>
      <form
        action=""
        className="space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form {...form}>
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
          <CollectionTypeSection />
          <SearchEngineListingSection />
          <Button disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </Form>
      </form>
    </div>
  );
}
