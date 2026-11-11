import { productos } from "../interfaces/productos.interfaz";
import { ProductosAPI } from "../responses/productos.responses";

export class ProductosMappers {
  static fromAPIToProductos(productoAPI: ProductosAPI): productos {
    return {
      id: productoAPI.id,
      nombre: productoAPI.title,
      precio: productoAPI.price,
      imagen: productoAPI.image,
    };
  }
}
