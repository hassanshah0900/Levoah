"use server";

import { toSnakeCase } from "@/lib/utils";
import { createClient } from "@/supabase/server";
import { Collection } from "./types";
import { CollectionEditSchemaType, CollectionSchemaType } from "./validation";

export async function createCollection(collection: CollectionSchemaType) {
  const { conditions, banner, ...collectionToInsert } = collection;

  const supabase = await createClient();

  const { data: insertedCollection, error } = await supabase
    .from("collections")
    .insert(toSnakeCase(collectionToInsert))
    .select("id")
    .single();
  if (error) throw error;

  const conditionsToInsert = conditions.map((condition) => ({
    ...toSnakeCase(condition),
    collection_id: insertedCollection.id,
  }));

  const { error: conditionsError } = await supabase
    .from("conditions")
    .insert(conditionsToInsert);
  if (conditionsError) throw conditionsError;

  if (collection.banner) {
    const { data, error } = await supabase.storage
      .from("Banners")
      .upload(crypto.randomUUID(), collection.banner);
    if (error) throw error;

    const { error: collectionsUpdateError } = await supabase
      .from("collections")
      .update({ banner_url: data.path })
      .eq("id", insertedCollection.id);
    if (collectionsUpdateError) throw collectionsUpdateError;
  }
}

export async function deleteCollection(collection: Collection) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("id", collection.id);
  if (error) throw error;

  if (collection.bannerUrl) {
    const { error } = await supabase.storage
      .from("Banners")
      .remove([collection.bannerUrl]);
    if (error) throw error;
  }
}

export async function editCollection(collection: CollectionEditSchemaType) {
  const supabase = await createClient();
  let { conditions, banner, id, ...collectionToUpdate } = collection;

  const oldBannerUrl = collectionToUpdate.bannerUrl;
  let newBannerUrl = oldBannerUrl;

  if (banner) {
    const { data, error: uploadError } = await supabase.storage
      .from("Banners")
      .upload(`${crypto.randomUUID()}`, banner);
    if (uploadError) throw uploadError;

    newBannerUrl = data.path;
  }

  const collectionPayload = toSnakeCase({
    ...collectionToUpdate,
    bannerUrl: newBannerUrl,
  });

  const { error: collectionError } = await supabase
    .from("collections")
    .update(collectionPayload)
    .eq("id", id);
  if (collectionError) throw collectionError;

  const conditionsToUpdate = conditions
    .filter((condition) => condition.id)
    .map((condition) => toSnakeCase(condition));

  const conditionsToInsert = conditions
    .filter((condition) => !condition.id)
    .map((condition) => ({ ...toSnakeCase(condition), collection_id: id }));

  const conditionsToNotDeleteIds = conditionsToUpdate.map(
    (condition) => condition.id
  );

  const notDeleteIdsString =
    conditionsToNotDeleteIds.length > 0
      ? `(${conditionsToNotDeleteIds.join(",")})`
      : ``;

  if (notDeleteIdsString) {
    const { error: deleteConditionsError } = await supabase
      .from("conditions")
      .delete()
      .not("id", "in", notDeleteIdsString)
      .eq("collection_id", id);
    if (deleteConditionsError) throw deleteConditionsError;
  }

  const { error: conditionsUpdateError } = await supabase
    .from("conditions")
    .upsert(conditionsToUpdate);
  if (conditionsUpdateError) throw conditionsUpdateError;

  if (conditionsToInsert.length) {
    const { error: conditionsInsertError } = await supabase
      .from("conditions")
      .insert(conditionsToInsert);
    if (conditionsInsertError) throw conditionsInsertError;
  }

  if (banner && oldBannerUrl && oldBannerUrl !== newBannerUrl) {
    const { error: removeError } = await supabase.storage
      .from("Banners")
      .remove([oldBannerUrl]);

    if (removeError) {
      console.error("Error removing old banner:", removeError);
    }
  }
}
