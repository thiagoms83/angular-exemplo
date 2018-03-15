import { Deslocamento } from "./deslocamento";
import { Ocorrencia } from "./ocorrencia";
import { Millenium } from "./millenium";
import { Memorando } from "./memorando";

export class Solicitacao {
    id: number
    data: Date
    tipo: string
    prioridade: boolean
    cadaver: boolean
    horaAviso: Date
    deslocamento: Deslocamento
    millenium: Millenium
    memorandos: Memorando[]
    ocorrencia: Ocorrencia
    version: number
}