class Emprestimo{
private id_emprestimo : number;
private id_aluno : number;
private id_livro : number;
private data_emprestimo : Date;
private data_devolucao : Date;
private status_emprestimo: string;
    
constructor(
_id_emprestimo: number,
_id_aluno: number,
_id_livro: number,
_data_emprestimo: Date,
_data_devolucao: Date,
_status_emprestimo: string
){
this.id_emprestimo = _id_emprestimo
this.id_aluno = _id_aluno
this.id_livro = _id_livro
this.data_emprestimo = _data_emprestimo
this.data_devolucao = _data_devolucao
this.status_emprestimo = _status_emprestimo
}

    public setId_emprestimo(_id_emprestimo:number): void{
        this.id_emprestimo=_id_emprestimo
    }

    public getId_emprestimo():number{
        return this.id_emprestimo;
    }

        public setId_aluno(_id_aluno:number): void{
        this.id_aluno=_id_aluno
    }

    public getId_aluno():number{
        return this.id_aluno;
    }

    public setId_livro(_id_livro:number): void{
        this.id_livro= _id_livro
    }

    public getId_livro():number{
        return this.id_livro;
    }

    public setData_emprestimo(_data_emprestimo:Date): void{
        this.data_emprestimo=_data_emprestimo
    }

    public getData_emprestimo():Date{
        return this.data_emprestimo;
    }

        public setData_devolucao(_data_devolucao:Date): void{
        this.data_devolucao=_data_devolucao
    }

    public getData_devolucao():Date{
        return this.data_devolucao;
    }

        public setStatus_emprestimo(_status_emprestimo:string): void{
        this.status_emprestimo=_status_emprestimo
    }

    public getStatus_emprestimo():string{
        return this.status_emprestimo;
    }

}