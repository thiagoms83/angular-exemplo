import { Plantao } from './plantao';
import { Equipe } from "./equipe";
import { Perito } from "./perito";

export class Deslocamento {
    id: number
    horaDeslocamento: Date
    horaInicio: Date
    horaTermino: Date
    desfeito: boolean
    plantao: Plantao
}