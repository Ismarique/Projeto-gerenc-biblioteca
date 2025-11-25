import type { LivroDTO } from "../interface/LivroDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"

const database = new DatabaseModel().pool;


class Livro {
    private idLivro: number = 0;
    private titulo: string
    private autor: string
    private editora: string
    private anoPublicacao: Date
    private isbn: number
    private quantTotal: number
    private quantDisponivel: number
    private valorAquisicao: number
    private statusLivroEmprestado: string

    constructor(

        _titulo: string,
        _autor: string,
        _editora: string,
        _anoPublicacao: Date,
        _isbn: number,
        _quantTotal: number,
        _quantDisponivel: number,
        _valorAquisicao: number,
        _statusLivroEmprestado: string
    ) {

        this.titulo = _titulo
        this.autor = _autor
        this.editora = _editora
        this.anoPublicacao = _anoPublicacao
        this.isbn = _isbn
        this.quantTotal = _quantTotal
        this.quantDisponivel = _quantDisponivel
        this.valorAquisicao = _valorAquisicao
        this.statusLivroEmprestado = _statusLivroEmprestado
    }

    public setIdLivro(_idLivro: number): void {
        this.idLivro = _idLivro
    }

    public getIdLivro(): number {
        return this.idLivro
    }

    public setTitulo(_titulo: string): void {
        this.titulo = _titulo;
    }

    public getTitulo(): string {
        return this.titulo;
    }


    public setAutor(_autor: string): void {
        this.autor = _autor;
    }

    public getAutor(): string {
        return this.autor;
    }


    public setEditora(_editora: string): void {
        this.editora = _editora
    }

    public getEditora(): string {
        return this.editora;
    }


    public setAnoPublicacao(_anoPublicacao: Date): void {
        this.anoPublicacao = _anoPublicacao
    }

    public getAnoPublicacao(): Date {
        return this.anoPublicacao;
    }


    public setIsbn(_isbn: number): void {
        this.isbn = _isbn
    }

    public getIsbn(): number {
        return this.isbn;
    }


    public setQuantTotal(_quantTotal: number): void {
        this.quantTotal = _quantTotal
    }

    public getQuantTotal(): number {
        return this.quantTotal;
    }


    public setQuantDisponivel(_quantDisponivel: number): void {
        this.quantDisponivel = _quantDisponivel
    }

    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }


    public setValorAquisicao(_valorAquisicao: number): void {
        this.valorAquisicao = _valorAquisicao
    }

    public getValorAquisicao(): number {
        return this.valorAquisicao;
    }


    public setStatusLivroEmprestado(_statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = _statusLivroEmprestado
    }

    public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }


    /**
     * Retorna os Livro cadastrados no banco de dados
     * @returns Lista com Livro cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarLivros(): Promise<Array<Livro> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Livro
            let listaDeLivro: Array<Livro> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'Livro'
            const querySelectLivro = `SELECT * FROM Livro;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectLivro);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((LivroBD: any) => {
                // Cria um novo objeto Livro usando os dados da linha atual (nome, cpf, telefone)
                const novoLivro: Livro = new Livro(
                    LivroBD.titulo,
                    LivroBD.autor,
                    LivroBD.editora,
                    LivroBD.ano_publicacao,
                    LivroBD.isbn,
                    LivroBD.quant_total,
                    LivroBD.quant_disponivel,
                    LivroBD.valor_aquisicao,
                    LivroBD.status_livro_emprestado
                );

                // Define o ID do Livro usando o valor retornado do banco
                novoLivro.setIdLivro(LivroBD.idLivro);

                // Adiciona o novo Livro à lista de Livro
                listaDeLivro.push(novoLivro);
            });

            // Retorna a lista completa de Livro
            return listaDeLivro;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }

    static async cadastrarLivro(Livro: LivroDTO): Promise<boolean> {
        try {

            const queryInsertClient: string = `INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
                RETURNING idLivro;`;

            const respostaBD = await database.query(queryInsertClient, [
                Livro.titulo,
                Livro.autor,
                Livro.editora,
                Livro.ano_publicacao,
                Livro.isbn,
                Livro.quant_total,
                Livro.quant_disponivel,
                Livro.valor_aquisicao,
                Livro.status_livro_emprestado
            ]);

            if (respostaBD.rows.length > 0) {
                console.info('Livro cadastrado com sucesso! ID: ${resposte DB.rows[0]}')
                return true;
            }

            return false;

        } catch (erro) {
            console.log(`Erro na consulta ao banco de dados ${erro}`);
            return false
        }
    }

    static async listarLivro(idLivro: number): Promise<Livro | null> {

        try {
            const querySelectLivro = `SELECT * FROM Livro WHERE idLivro;`;
            const respostaBD = await database.query(querySelectLivro, [idLivro]);

            if (respostaBD.rowCount != 0) {
                const livro: Livro = new Livro(

                    respostaBD.rows[0].titulo,
                    respostaBD.rows[0].autor,
                    respostaBD.rows[0].editora,
                    respostaBD.rows[0].ano_publicacao,
                    respostaBD.rows[0].isbn,
                    respostaBD.rows[0].quant_total,
                    respostaBD.rows[0].quant_disponivel,
                    respostaBD.rows[0].valor_aquisicao,
                    respostaBD.rows[0].status_livro_emprestado
                );

                livro.setIdLivro(respostaBD.rows[0].idLivro);

                return livro;

            }
            return null;

        } catch (error) {
            console.log(`Erro ao buscar o Livro no banco de dados. ${error}`);
            return null;
        }

    }



}
export default Livro;


