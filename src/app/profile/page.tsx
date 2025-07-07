'use client';

import { useProfile } from "@/hooks";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, isLoadingProfile } = useProfile();

  const goTo = (path: string) => () => router.push(`/profile/${path}`);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <Card>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">Mi perfil</h2>
            {isLoadingProfile ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ) : profile ? (
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Nombre:</strong> {profile.firstName} {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Teléfono:</strong> {profile.thelephone}</p>
                <p><strong>Dirección:</strong> {profile.street} #{profile.number}, {profile.commune}, {profile.region}</p>
                <p><strong>Código Postal:</strong> {profile.postalCode}</p>
                <p><strong>Fecha de nacimiento:</strong> {profile.birthDate}</p>
                <p><strong>Registrado en:</strong> {new Date(profile.registeredAt).toLocaleDateString()}</p>
                <p><strong>Último acceso:</strong> {new Date(profile.lastAccess).toLocaleDateString()}</p>
              </div>
            ) : (
              <p>No se pudo cargar el perfil.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Button variant="outline" className="w-full" onClick={goTo("change-password")}>
          Cambiar contraseña
        </Button>
        <Button variant="outline" className="w-full" onClick={goTo("edit-profile")}>
          Editar perfil
        </Button>
        <Button variant="outline" className="w-full" onClick={goTo("edit-address")}>
          Editar dirección
        </Button>
      </div>
    </div>
  );
}
