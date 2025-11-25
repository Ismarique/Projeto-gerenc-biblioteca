import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel

const database = new DatabaseModel().pool; // Inicializa o pool de conexões com o banco de dados


class Emprestimo {
    private idEmprestimo: number = 0
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;

    constructor(
        _idAluno: number,
        _idLivro: number,
        _dataEmprestimo: Date,
        _dataDevolucao: Date,
        _statusEmprestimo: string
    ) {

        this.idAluno = _idAluno
        this.idLivro = _idLivro
        this.dataEmprestimo = _dataEmprestimo
        this.dataDevolucao = _dataDevolucao
        this.statusEmprestimo = _statusEmprestimo
    }

    public setIdEmprestimo(_idEmprestimo: number): void {
        this.idEmprestimo = _idEmprestimo
    }

    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    public setidAluno(_idAluno: number): void {
        this.idAluno = _idAluno
    }

    public getidAluno(): number {
        return this.idAluno;
    }

    public setIdLivro(_idLivro: number): void {
        this.idLivro = _idLivro
    }

    public getIdLivro(): number {
        return this.idLivro;
    }

    public setDataEmprestimo(_dataEmprestimo: Date): void {
        this.dataEmprestimo = _dataEmprestimo
    }

    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    public setDataDevolucao(_dataDevolucao: Date): void {
        this.dataDevolucao = _dataDevolucao
    }

    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    public setStatusEmprestimo(_statusEmprestimo: string): void {
        this.statusEmprestimo = _statusEmprestimo
    }

    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
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
                    EmprestimoBD.idaluno,
                    EmprestimoBD.idLivro,
                    EmprestimoBD.dataEmprestimo,
                    EmprestimoBD.dataDevolucao,
                    EmprestimoBD.statusEmprestimo
                );

                // Define o ID do Emprestimo usando o valor retornado do banco
                novoEmprestimo.setIdEmprestimo(EmprestimoBD.idEmprestimo);

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

            const queryInsertClient: string = `INSERT INTO Emprestimo (idaluno,idLivro,dataEmprestimo,dataDevolucao,statusEmprestimo)
                VALUES ($1,$2,$3,$4,$5)
                RETURNING idEmprestimo;`;

            const respostaBD = await database.query(queryInsertClient, [
                Emprestimo.idAluno,
                Emprestimo.idLivro,
                Emprestimo.dataEmprestimo,
                Emprestimo.dataDevolucao,
                Emprestimo.statusEmprestimo
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

    static async listarEmprestimo(idEmprestimo: number): Promise<Emprestimo | null> {

        try {
            const querySelectEmprestimos = `SELECT * FROM Emprestimo WHERE id_emprestimo;`;
            const respostaBD = await database.query(querySelectEmprestimos, [idEmprestimo]);

            if (respostaBD.rowCount != 0) {
                const emprestimo: Emprestimo = new Emprestimo(
                    respostaBD.rows[0].idAluno,
                    respostaBD.rows[0].idLivro,
                    respostaBD.rows[0].dataEmprestimo,
                    respostaBD.rows[0].dataDevolucao,
                    respostaBD.rows[0].statusEmprestimo
                );

                emprestimo.setIdEmprestimo(respostaBD.rows[0].idEmprestimo);

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
