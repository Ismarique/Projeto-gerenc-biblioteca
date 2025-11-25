import type { AlunoDTO } from "../interface/AlunoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"; // Importa a classe DatabaseModel

const database = new DatabaseModel().pool;

class Aluno {
    private idAluno: number = 0;
    private ra: number;
    private nome: string;
    private sobrenome: string;
    private dataNacimento: Date;
    private endereco: string;
    private email: string;
    private celular: number;

    constructor(
        _ra: number,
        _nome: string,
        _sobrenome: string,
        _dataNacimento: Date,
        _endereco: string,
        _email: string,
        _celular: number
    ) {

        this.ra = _ra
        this.nome = _nome
        this.sobrenome = _sobrenome
        this.dataNacimento = _dataNacimento
        this.endereco = _endereco
        this.email = _email
        this.celular = _celular
    }

    public setIdAluno(_idAluno: number): void {
        this.idAluno = _idAluno
    }


    public getidAluno(): number {
        return this.idAluno
    }


    public setRa(_ra: number): void {
        this.ra = _ra;
    }

    public getRa(): number {
        return this.ra;
    }

    public setNome(_nome: string): void {
        this.nome = _nome;
    }

    public getNome(): string {
        return this.nome;
    }

    public setSobrenome(_sobrenome: string): void {
        this.sobrenome = _sobrenome;
    }

    public getSobrenome(): string {
        return this.sobrenome
    }

    public setDataNacimento(_dataNacimento: Date) {
        this.dataNacimento = _dataNacimento;
    }

    public getDataNacimento(): Date {
        return this.dataNacimento;
    }

    public setEndereco(_endereco: string) {
        this.endereco = _endereco;
    }


    public getEndereco(): string {
        return this.endereco;
    }

    public setEmail(_email: string) {
        this.email = _email;
    }

    public getEmail(): string {
        return this.email;
    }

    public setCelular(_celular: number) {
        this.celular = _celular;
    }

    public getCelular(): number {
        return this.celular
    }

    /**
     * Retorna os Alunos cadastrados no banco de dados
     * @returns Lista com Alunos cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarAlunos(): Promise<Array<Aluno> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Aluno
            let listaDeAlunos: Array<Aluno> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'Alunos'
            const querySelectAlunos = `SELECT * FROM Aluno;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectAlunos);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((AlunoBD: any) => {
                // Cria um novo objeto Aluno usando os dados da linha atual (nome, cpf, telefone)
                const novoAluno: Aluno = new Aluno(

                    AlunoBD.ra,
                    AlunoBD.nome,
                    AlunoBD.sobrenome,
                    AlunoBD.dataNascimento,
                    AlunoBD.endereco,
                    AlunoBD.email,
                    AlunoBD.celular
                );

                // Define o ID do Aluno usando o valor retornado do banco
                novoAluno.setIdAluno(AlunoBD.idAluno);

                // Adiciona o novo Aluno à lista de Alunos
                listaDeAlunos.push(novoAluno);
            });

            // Retorna a lista completa de Alunos
            return listaDeAlunos;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }

    static async cadastrarAluno(Aluno: AlunoDTO): Promise<boolean> {
        try {

            const queryInsertClient: string = `INSERT INTO Aluno (ra,nome,sobrenome,data_nascimento,endereco,email,celular)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id_Aluno;`;

            const respostaBD = await database.query(queryInsertClient, [
                Aluno.ra,
                Aluno.nome.toUpperCase(),
                Aluno.sobrenome,
                Aluno.data_nascimento,
                Aluno.endereco,
                Aluno.email.toUpperCase(),
                Aluno.celular
            ]);

            if (respostaBD.rows.length > 0) {
                console.info('Aluno cadastrado com sucesso! ID: ${resposte DB.rows[0]}')
                return true;
            }

            return false;

        } catch (erro) {
            console.log(`Erro na consulta ao banco de dados ${erro}`);
            return false
        }
    }

    static async listarAluno(id_Aluno: number): Promise<Aluno | null> {

        try {
            const querySelectAlunos = `SELECT * FROM aluno WHERE id_Aluno=$1;`;
            const respostaBD = await database.query(querySelectAlunos, [id_Aluno]);

            if (respostaBD.rowCount != 0) {
                const aluno: Aluno = new Aluno(
                    respostaBD.rows[0].ra,
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].sobrenome,
                    respostaBD.rows[0].dataNacimento,
                    respostaBD.rows[0].endereco,
                    respostaBD.rows[0].email,
                    respostaBD.rows[0].celular

                );

                aluno.setRa(respostaBD.rows[0].ra);

                return aluno;

            }
            return null;

        } catch (error) {
            console.log(`Erro ao buscar o Aluno no banco de dados. ${error}`);
            return null;
        }

    }

}

export default Aluno;







