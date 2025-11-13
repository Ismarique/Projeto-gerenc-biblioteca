import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import Emprestimo from "../model/Emprestimo.js";
import type { Request, Response } from "express";

/**
 * Classe responsável por receber a requisição do Emprestimo, processar essa requisição e devolver a resposta ao Emprestimo
 * 
 * Trata apenas de requisições relacionadas ao recurso Emprestimo
 */
class EmprestimoController extends Emprestimo {

    /**
     * Faz a chamada ao modelo para obter a lista de Emprestimos e devolve ao Emprestimo
     * 
     * @param req Requisição do Emprestimo
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os Emprestimos
     * @returns (500) Erro na consulta
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarEmprestimos da classe Emprestimo para buscar todos os Emprestimos no banco de dados
            const listaEmprestimos: Array<Emprestimo> | null = await Emprestimo.listarEmprestimos();

            // Retorna uma resposta HTTP com status 200 (OK) e envia a lista de Emprestimos em formato JSON
            return res.status(200).json(listaEmprestimos);
        } catch (error) {
            // Em caso de erro, exibe a mensagem no console para ajudar na depuração
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de Emprestimos." });
        }
    }

    /**
     * Faz a chamada ao modelo para inserir um novo Emprestimo
     * @param req Requisição do Emprestimo
     * @param res Resposta do servidor
     * @returns (200) Objeto do Emprestimo inserido
     * @returns (400) Erro ao inserir Emprestimo
     * @returns (500) Erro na consulta
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Extrai os dados enviados pelo Emprestimo na requisição HTTP (normalmente via POST)
            // Esses dados devem estar no corpo da requisição e seguir o formato da interface CarroDTO
            const dadosRecebidosEmprestimo = req.body;

            // validação de dados ...

            // Chama o método cadastrarCarro da classe Carro, passando os dados recebidos
            // Esse método deve inserir o carro no banco de dados e retornar true ou false
            const respostaModelo = await Emprestimo.cadastrarEmprestimo(dadosRecebidosEmprestimo);

            // Verifica se o cadastro foi bem-sucedido
            if (respostaModelo) {
                // Se sim, retorna uma resposta HTTP com status 201 (Created)
                // Envia uma mensagem informando que o carro foi cadastrado com sucesso
                return res.status(201).json({ mensagem: "Emprestimo cadastrado com sucesso." });
            } else {
                // Se não, retorna uma resposta HTTP com status 400 (Bad Request)
                // Envia uma mensagem informando que houve erro no cadastro
                return res.status(400).json({ mensagem: "Erro ao cadastrar Emprestimo." });
            }
        } catch (error) {
            // Em caso de erro inesperado (como falha de conexão ou erro interno), exibe a mensagem no console
            console.error(`Erro no modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível inserir o novo carro
            return res.status(500).json({ mensagem: "Não foi possível inserir o Emprestimo" });
        }
    }

    static async Emprestimo(req: Request, res: Response): Promise<Response>{
        try{
            const idEmprestimo: number = parseInt (req.params.idEmprestimo as string);
            console.log(idEmprestimo);

            //validação simples
            if (isNaN(idEmprestimo) || idEmprestimo <= 0){
                return res.status(400).json({mensagem: "ID inválido."});            
            } 

            const respostaModelo = await Emprestimo.listarEmprestimo(idEmprestimo);

              if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum Emprestimo encontrado com o ID fornecido." });
            }
            return res.status(400).json(respostaModelo);
        }catch(error){
            console.error(`Erro ao acesso o modelo. ${error}`);
            return res.status(500).json({mensagem: "Não foi possivel recuperar o Emprestimo."});
        }
    }


}

export default EmprestimoController;