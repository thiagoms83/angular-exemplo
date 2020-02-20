import { Plantao } from './plantao';
import { Equipe } from "./equipe";
import { Perito } from "./perito";

export class Deslocamento {
    horaDeslocamento: Date
    horaInicio: Date
    horaTermino: Date
    desfeito: boolean
    perito: Perito
    equipe: Equipe
}