import { ProductosMappers } from "@/infraestructura/mappers/productos.mappers";
import { ProductosAPI } from "@/infraestructura/responses/productos.responses";
import { configuracionComunApi } from "../api/fakestoreapi";

export const getProductos = async () => {
  try {
    const { data } =
      await configuracionComunApi.get<ProductosAPI[]>("/products");
    const resultado = data.map(ProductosMappers.fromAPIToProductos);
    return resultado;
  } catch (error) {
    throw "no se pudo cargar los productos";
  }
};
