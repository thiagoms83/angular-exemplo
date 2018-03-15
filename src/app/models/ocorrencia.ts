import { Veiculo } from './veiculo';
import { Distrito } from "./distrito";
import { Protocolo } from "./protocolo";

export class Ocorrencia {
    id: number
    numero: number
    ano: number
    distrito: Distrito
    data: string
    tipo: string
    natureza: string
    endereco: string
    historico: string
    flagrante: boolean
    protocolo: Protocolo
    veiculos: Veiculo[]

    constructor() {
    }
}