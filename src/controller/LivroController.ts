import type { LivroDTO } from "../interface/LivroDTO.js";
import Livro from "../model/Livro.js";
import type { Request, Response } from "express";

/**
 * Classe responsável por receber a requisição do Livro, processar essa requisição e devolver a resposta ao Livro
 * 
 * Trata apenas de requisições relacionadas ao recurso Livro
 */
class LivroController extends Livro {

    /**
     * Faz a chamada ao modelo para obter a lista de Livros e devolve ao Livro
     * 
     * @param req Requisição do Livro
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os Livros
     * @returns (500) Erro na consulta
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarLivros da classe Livro para buscar todos os Livros no banco de dados
            const listaLivros: Array<Livro> | null = await Livro.listarLivros();

            // Retorna uma resposta HTTP com status 200 (OK) e envia a lista de Livros em formato JSON
            return res.status(200).json(listaLivros);
        } catch (error) {
            // Em caso de erro, exibe a mensagem no console para ajudar na depuração
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de Livros." });
        }
    }

    /**
     * Faz a chamada ao modelo para inserir um novo Livro
     * @param req Requisição do Livro
     * @param res Resposta do servidor
     * @returns (200) Objeto do Livro inserido
     * @returns (400) Erro ao inserir Livro
     * @returns (500) Erro na consulta
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Extrai os dados enviados pelo Livro na requisição HTTP (normalmente via POST)
            // Esses dados devem estar no corpo da requisição e seguir o formato da interface CarroDTO
            const dadosRecebidosLivro = req.body;

            // validação de dados ...

            // Chama o método cadastrarCarro da classe Carro, passando os dados recebidos
            // Esse método deve inserir o carro no banco de dados e retornar true ou false
            const respostaModelo = await Livro.cadastrarLivro(dadosRecebidosLivro);

            // Verifica se o cadastro foi bem-sucedido
            if (respostaModelo) {
                // Se sim, retorna uma resposta HTTP com status 201 (Created)
                // Envia uma mensagem informando que o carro foi cadastrado com sucesso
                return res.status(201).json({ mensagem: "Livro cadastrado com sucesso." });
            } else {
                // Se não, retorna uma resposta HTTP com status 400 (Bad Request)
                // Envia uma mensagem informando que houve erro no cadastro
                return res.status(400).json({ mensagem: "Erro ao cadastrar Livro." });
            }
        } catch (error) {
            // Em caso de erro inesperado (como falha de conexão ou erro interno), exibe a mensagem no console
            console.error(`Erro no modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível inserir o novo carro
            return res.status(500).json({ mensagem: "Não foi possível inserir o Livro" });
        }
    }

    static async Livro(req: Request, res: Response): Promise<Response>{
        try{
            const idLivro: number = parseInt (req.params.idLivro as string);
            console.log(idLivro);

            //validação simples
            if (isNaN(idLivro) || idLivro <= 0){
                return res.status(400).json({mensagem: "ID inválido."});            
            } 

            const respostaModelo = await Livro.listarLivro(idLivro);

              if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum Livro encontrado com o ID fornecido." });
            }
            return res.status(400).json(respostaModelo);
        }catch(error){
            console.error(`Erro ao acesso o modelo. ${error}`);
            return res.status(500).json({mensagem: "Não foi possivel recuperar o Livro."});
        }
    }


}

export default LivroController;