import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWatch } from "react-hook-form";

export default function SearchEngineListingSection() {
  const [pageTitle, metaDescription, slug] = useWatch({
    name: ["pageTitle", "metaDescription", "slug"],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search engine listing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <FormField
          name="pageTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>{`${pageTitle.length} out of 70 characters used`}</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>{`${metaDescription.length} out of 160 characters used`}</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL handle</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>{`${process.env.NEXT_PUBLIC_SITE_URL}/collections/${slug}`}</FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
