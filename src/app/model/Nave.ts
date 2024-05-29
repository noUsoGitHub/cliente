import { InventarioNave } from "./Inventario";
import { Tripulacion } from "./Tripulacion";
import { Estrella } from "./Estrella";
import { Planeta } from "./Planeta";

export class Nave {
  id: number;
  foto: string;
  nombreNave: string;
  capacidadCarga: number;
  velocidadMaxima: number;
  tripulacion: Tripulacion[];
  inventarioNave: InventarioNave[];
  currentStar?: Estrella;
  planeta?: Planeta;
  tripulacionId?: number;

  constructor(
    id: number = 0,
    foto: string = '',
    nombreNave: string = '',
    capacidadCarga: number = 0,
    velocidadMaxima: number = 0,
    tripulacion: Tripulacion[] = [],
    inventarioNave: InventarioNave[] = [],
    currentStar?: Estrella,
    planeta?: Planeta,
    tripulacionId?: number,
  ) {
    this.id = id;
    this.foto = foto;
    this.nombreNave = nombreNave;
    this.capacidadCarga = capacidadCarga;
    this.velocidadMaxima = velocidadMaxima;
    this.tripulacion = tripulacion;
    this.inventarioNave = inventarioNave;
    this.currentStar = currentStar;
    this.planeta = planeta;
    this.tripulacionId = tripulacionId;
  }
  toJSON(): {
    id: number;
    foto: string;
    nombreNave: string;
    capacidadCarga: number;
    velocidadMaxima: number;
    tripulacion: ReturnType<typeof Tripulacion.prototype.toJSON>[];
    inventarioNave: ReturnType<typeof InventarioNave.prototype.toJSON>[];
    currentStar?: ReturnType<typeof Estrella.prototype.toJSON>;
    planeta?: ReturnType<typeof Planeta.prototype.toJSON>;
    tripulacionId?: number;
  } {
    return {
      id: this.id,
      foto: this.foto,
      nombreNave: this.nombreNave,
      capacidadCarga: this.capacidadCarga,
      velocidadMaxima: this.velocidadMaxima,
      tripulacion: this.tripulacion.map(member => member.toJSON()),
      inventarioNave: this.inventarioNave.map(item => item.toJSON()),
      currentStar: this.currentStar?.toJSON(),
      planeta: this.planeta?.toJSON(),
      tripulacionId: this.tripulacionId,
    };
  }
  static fromJSON(json: any): Nave {
    const inventarioNave = json.inventarioNave.map((itemJson: any) => InventarioNave.fromJSON(itemJson));
    return new Nave(
      json.id,
      json.foto,
      json.nombreNave,
      json.capacidadCarga,
      json.velocidadMaxima,
      json.tripulacionId,
      inventarioNave,
      json.currentStar ? Estrella.fromJSON(json.currentStar) : undefined,
      json.planeta ? Planeta.fromJSON(json.planeta) : undefined
    );
  }
}
