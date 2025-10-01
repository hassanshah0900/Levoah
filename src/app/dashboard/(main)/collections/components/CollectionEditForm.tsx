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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editCollection } from "../lib/actions";
import { Collection } from "../lib/types";
import {
  collectionEditSchema,
  CollectionEditSchemaType,
} from "../lib/validation";
import ConditionsSection from "./ConditionsSection";
import ProductsSearchSection from "./ProductsSearchSection";
import SearchEngineListingSection from "./SearchEngineListingSection";
import { getCollectionBySlug } from "../lib/queries";
import { useEffect } from "react";
import { compressImage, getImagePublicUrl } from "@/lib/utils";

interface Props {
  slug: string;
}
export default function CollectionEditForm({ slug }: Props) {
  const { data: collection, status } = useQuery({
    queryKey: ["collections", slug],
    queryFn: () => getCollectionBySlug(slug),
  });

  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: editCollection,
    onSuccess: () => {
      toast.success("Successfully edited collection.", {
        id: "edit collection",
      });
      router.push("/dashboard/collections");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: () => {
      toast.error("An error occured while editing collection.", {
        id: "edit collection",
      });
    },
  });
  const form = useForm({
    resolver: zodResolver(collectionEditSchema),
    mode: "onChange",
    defaultValues: {
      id: collection?.id,
      title: collection?.title,
      description: collection?.description,
      type: collection?.type,
      matchType: collection?.matchType ?? undefined,
      pageTitle: collection?.pageTitle ?? "",
      metaDescription: collection?.metaDescription ?? "",
      slug: collection?.slug,
      conditions: collection?.conditions,
      products: collection?.products.map((product) => product.id),
      bannerUrl: collection?.bannerUrl,
    },
  });

  console.log(form.formState.errors);

  async function onSubmit(data: CollectionEditSchemaType) {
    toast.loading("Editing collection...", { id: "edit collection" });
    let banner = data.banner
      ? await compressImage(data.banner, "banner")
      : undefined;
    const collection = { ...data, banner };
    mutate(collection);
    console.log({ collection });
  }

  if (status === "error" || (status === "success" && !collection)) notFound();

  return (
    <>
      {status === "pending" ? (
        <div className="w-full flex justify-center items-center mt-20">
          <div className="w-14 h-14 rounded-full border-2 border-r-white animate-spin"></div>
        </div>
      ) : (
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
                          <BannerInput
                            {...field}
                            value={
                              collection?.bannerUrl &&
                              getImagePublicUrl(
                                collection?.bannerUrl,
                                "Banners"
                              )
                            }
                          />
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
              {collection?.type === "automatic" ? (
                <ConditionsSection />
              ) : (
                <ProductsSearchSection />
              )}
              <SearchEngineListingSection />
              <Button disabled={isPending}>
                {isPending ? "Editing..." : "Edit"}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
