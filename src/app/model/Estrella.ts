import { Planeta } from "./Planeta";
import { AgujeroDeGusano } from "./AgujeroDeGusano";

export class Estrella {
  id: number;
  nombreEstrella: string;
  coordenadaX: number;
  coordenadaY: number;
  coordenadaZ: number;
  imagen: string;
  planetas: Planeta[];
  agujerosDeGusano: AgujeroDeGusano[];

  constructor(
    id: number = 0,
    nombreEstrella: string = '',
    coordenadaX: number = 0,
    coordenadaY: number = 0,
    coordenadaZ: number = 0,
    imagen: string = '',
    planetas: Planeta[] = [],
    agujerosDeGusano: AgujeroDeGusano[] = []
  ) {
    this.id = id;
    this.nombreEstrella = nombreEstrella;
    this.coordenadaX = coordenadaX;
    this.coordenadaY = coordenadaY;
    this.coordenadaZ = coordenadaZ;
    this.imagen = imagen;
    this.planetas = planetas;
    this.agujerosDeGusano = agujerosDeGusano;
  }

  // Define explícitamente el tipo de retorno de la función toJSON
  toJSON(): {
    id: number;
    nombreEstrella: string;
    coordenadaX: number;
    coordenadaY: number;
    coordenadaZ: number;
    imagen: string;
    planetas: any[];  // Utiliza un tipo más específico si tienes un tipo definido para la salida JSON de Planeta
    agujerosDeGusano: any[];  // Utiliza un tipo más específico si tienes un tipo definido para la salida JSON de AgujeroDeGusano
  } {
    return {
      id: this.id,
      nombreEstrella: this.nombreEstrella,
      coordenadaX: this.coordenadaX,
      coordenadaY: this.coordenadaY,
      coordenadaZ: this.coordenadaZ,
      imagen: this.imagen,
      planetas: this.planetas.map(planeta => planeta.toJSON()),
      agujerosDeGusano: this.agujerosDeGusano.map(tunel => tunel.toJSON())
    };
  }
  static fromJSON(json: any): Estrella {
    const planetas = json.planetas.map((planetaJson: any) => Planeta.fromJSON(planetaJson));
    const agujerosDeGusano = json.agujerosDeGusano.map((tunelJson: any) => AgujeroDeGusano.fromJSON(tunelJson));
    return new Estrella(
      json.id,
      json.nombreEstrella,
      json.coordenadaX,
      json.coordenadaY,
      json.coordenadaZ,
      json.imagen,
      planetas,
      agujerosDeGusano
    );
  }
}
