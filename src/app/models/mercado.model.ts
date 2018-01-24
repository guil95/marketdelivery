export class Mercado{
    public id: number
    constructor(
        public descricao: string,
        public razaoSocial: string,
        public nomeFantasia: string,
        public cnpjCpf: string,
        public inscricaoEstadual: string,
        public endereco: string,
        public telefone: string,
        public celular: string
    ){}

}