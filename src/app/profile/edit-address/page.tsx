'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createShippingAddressRequestSchema, CreateShippingAddressRequest } from "@/models";
import { useProfile } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";

export default function EditAddressPage() {
  const { profile, updateShippingAddress, isUpdatingShippingAddress } = useProfile();

  const form = useForm<CreateShippingAddressRequest>({
    resolver: zodResolver(createShippingAddressRequestSchema),
    defaultValues: {
      street: "",
      number: "",
      commune: "",
      region: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        street: profile.street,
        number: profile.number,
        commune: profile.commune,
        region: profile.region,
        postalCode: profile.postalCode,
      });
    }
  }, [profile, form]);

  const onSubmit = (data: CreateShippingAddressRequest) => {
    updateShippingAddress(data);
  };

  return (
    <Card className="max-w-md mx-auto mt-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Editar dirección de envío</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {["street", "number", "commune", "region", "postalCode"].map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof CreateShippingAddressRequest}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {{
                        street: "Calle",
                        number: "Número",
                        commune: "Comuna",
                        region: "Región",
                        postalCode: "Código Postal"
                      }[fieldName] || fieldName}
                    </FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" disabled={isUpdatingShippingAddress} className="w-full">
              Guardar cambios
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
