"use client";

import BannerInput from "@/components/BannerInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { compressImage } from "@/lib/utils";
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

  const { mutate, isPending } = useMutation({
    mutationFn: createCollection,
  });

  async function onSubmit(data: CollectionSchemaType) {
    const image = data.banner
      ? await compressImage(data.banner, "banner")
      : undefined;
    const collection = { ...data, banner: image };
    mutate(collection);
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
            <CardHeader>
              <CardTitle>Upload Banner</CardTitle>
              <CardDescription>
                This Banner image will appear on the top of collections page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                name="banner"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <BannerInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
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
        </form>
      </Form>
    </div>
  );
}
