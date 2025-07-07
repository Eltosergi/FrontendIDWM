'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "@/hooks";
import { UpdateProfileRequest } from "@/models";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";

const schema = z.object({
  firstName: z.string().min(1, "Nombre requerido"),
  lastName: z.string().min(1, "Apellido requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Teléfono requerido"),
  birthDate: z.string().min(1, "Fecha requerida"),
});

export default function EditProfilePage() {
  const { profile, updateProfile, isUpdatingProfile } = useProfile();

  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        birthDate: profile.birthDate,
        phone: profile.thelephone,
      });
    }
  }, [profile, form]);

  const onSubmit = (data: UpdateProfileRequest) => {
    updateProfile(data);
  };

  return (
    <Card className="max-w-md mx-auto mt-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Editar perfil</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {["firstName", "lastName", "email", "birthDate", "phone"].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof UpdateProfileRequest}
                render={({ field: fieldProps }) => (
                  <FormItem>
                    <FormLabel>{field === "birthDate" ? "Fecha de nacimiento" : field}</FormLabel>
                    <Input {...fieldProps} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" disabled={isUpdatingProfile} className="w-full">
              Guardar cambios
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
