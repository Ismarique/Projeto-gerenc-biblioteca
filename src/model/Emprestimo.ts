import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel

const database = new DatabaseModel().pool; // Inicializa o pool de conexões com o banco de dados


class Emprestimo{
private id_emprestimo : number;
private id_Aluno : number;
private id_livro : number;
private data_emprestimo : Date;
private data_devolucao : Date;
private status_emprestimo: string;
    
constructor(
_id_emprestimo: number,
_id_Aluno: number,
_id_livro: number,
_data_emprestimo: Date,
_data_devolucao: Date,
_status_emprestimo: string
){
this.id_emprestimo = _id_emprestimo
this.id_Aluno = _id_Aluno
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

        public setid_Aluno(_id_Aluno:number): void{
        this.id_Aluno=_id_Aluno
    }

    public getid_Aluno():number{
        return this.id_Aluno;
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


    
    
    
        /**
         * Retorna os Emprestimos cadastrados no banco de dados
         * @returns Lista com Emprestimos cadastrados
         * @returns valor nulo em caso de erro na consulta
         */
        static async listarEmprestimos(): Promise<Array<Emprestimo> | null> {
            try {
                // Cria uma lista vazia que irá armazenar os objetos do tipo Emprestimo
                let listaDeEmprestimos: Array<Emprestimo> = [];
    
                // Define a consulta SQL que irá buscar todos os registros da tabela 'Emprestimos'
                const querySelectEmprestimos = `SELECT * FROM Emprestimo;`;
    
                // Executa a consulta no banco de dados e aguarda a resposta
                const respostaBD = await database.query(querySelectEmprestimos);
    
                // Percorre cada linha retornada pela consulta
                respostaBD.rows.forEach((EmprestimoBD: any) => {
                    // Cria um novo objeto Emprestimo usando os dados da linha atual (nome, cpf, telefone)
                    const novoEmprestimo: Emprestimo = new Emprestimo(
                        EmprestimoBD.id_emprestimo,
                        EmprestimoBD.id_aluno,
                        EmprestimoBD.id_livro,
                        EmprestimoBD.data_emprestimo,
                        EmprestimoBD.data_devolucao,
                        EmprestimoBD.status_emprestimo
                    );
    
                    // Define o ID do Emprestimo usando o valor retornado do banco
                    novoEmprestimo.setId_emprestimo(EmprestimoBD.id_Emprestimo);
    
                    // Adiciona o novo Emprestimo à lista de Emprestimos
                    listaDeEmprestimos.push(novoEmprestimo);
                });
    
                // Retorna a lista completa de Emprestimos
                return listaDeEmprestimos;
            } catch (error) {
                // Em caso de erro na execução da consulta, exibe uma mensagem no console
                console.error(`Erro na consulta ao banco de dados. ${error}`);
    
                // Retorna null para indicar que houve uma falha na operação
                return null;
            }
        }
    
        static async cadastrarEmprestimo(Emprestimo: EmprestimoDTO): Promise<boolean> {
            try {
    
                const queryInsertClient: string = `INSERT INTO Emprestimo (id_aluno,id_livro,data_emprestimo,data_devolucao,status_emprestimo)
                VALUES ($1,$2,$3,$4,$5)
                RETURNING id_Emprestimo;`;
    
                const respostaBD = await database.query(queryInsertClient, [
                    Emprestimo.id_aluno,
                    Emprestimo.id_livro,
                    Emprestimo.data_emprestimo,
                    Emprestimo.data_devolucao,
                    Emprestimo.status_emprestimo
                ]);
    
                if (respostaBD.rows.length > 0) {
                    console.info('Emprestimo cadastrado com sucesso! ID: ${resposte DB.rows[0]}')
                    return true;
                }
    
                return false;
    
            } catch (erro) {
                console.log(`Erro na consulta ao banco de dados ${erro}`);
                return false
            }
        }
    
        static async listarEmprestimo(id_Emprestimo: number): Promise<Emprestimo | null> {
    
            try {
                const querySelectEmprestimos = `SELECT * FROM Emprestimo WHERE id_emprestimo;`;
                const respostaBD = await database.query(querySelectEmprestimos, [id_Emprestimo]);
    
                if (respostaBD.rowCount != 0) {
                    const emprestimo: Emprestimo = new Emprestimo(
                        
                        respostaBD.rows[0].id_emprestimo,
                        respostaBD.rows[0].id_Aluno,
                        respostaBD.rows[0].id_livro,
                        respostaBD.rows[0].data_emprestimo,
                        respostaBD.rows[0].data_devolucao,
                        respostaBD.rows[0].status_emprestimo
                    );
    
                    emprestimo.setId_emprestimo(respostaBD.rows[0].id_emprestimo);
    
                    return emprestimo;
    
                }
                return null;
    
            } catch (error) {
                console.log(`Erro ao buscar o Emprestimo no banco de dados. ${error}`);
                return null;
            }
    
        }



}
export default Emprestimo;
