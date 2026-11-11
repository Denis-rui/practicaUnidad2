import { productos } from "@/infraestructura/interfaces/productos.interfaz";
import { getProductos } from "@/services/actions/productos.actions";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

export default function Inicio() {
  const [productos, setProductos] = useState<productos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    const cargarProductos = async () => {
      try {
        const resultado = await getProductos();
        if (activo) setProductos(resultado);
      } catch (error) {
        if (activo) setError("No se pudo cargar los Productos.");
      } finally {
        if (activo) setLoading(false);
      }
    };
    cargarProductos();
    return () => {
      activo = false;
    };
  }, []);
  if (loading) {
    return (
      <View className="flex-1 align-items-center justify-content-center">
        <ActivityIndicator size="large" />
        <Text className="mt-3">Cargando Productos...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 align-items-center justify-content-center">
        <Text className="text-center">{error}</Text>
      </View>
    );
  }
  return (
    <View className="flex-1">
      <FlatList
        numColumns={2}
        data={productos}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <Pressable className="flex-1 p-2">
            <View>
              <Image
                source={{ uri: item.imagen }}
                className="w-full aspect-[2/3] rounded-xl"
              />
            </View>
            <Text className="font-bold">{item.nombre}</Text>
            <Text className="text-gray-500">{item.precio} $</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
