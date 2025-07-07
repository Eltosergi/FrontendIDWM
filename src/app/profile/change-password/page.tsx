'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordRequestSchema, ChangePasswordRequest } from "@/models";
import { useProfile } from "@/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function ChangePasswordPage() {
  const form = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordRequestSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { changePassword, isChangingPassword } = useProfile();

  const onSubmit = (data: ChangePasswordRequest) => {
    changePassword(data, () => form.reset());
  };

  return (
    <Card className="max-w-md mx-auto mt-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar nueva contraseña</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isChangingPassword} className="w-full">
              Guardar cambios
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
