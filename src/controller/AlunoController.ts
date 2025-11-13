import type { AlunoDTO } from "../interface/AlunoDTO.js";
import Aluno from "../model/Aluno.js";
import type { Request, Response } from "express";

/**
 * Classe responsável por receber a requisição do Aluno, processar essa requisição e devolver a resposta ao Aluno
 * 
 * Trata apenas de requisições relacionadas ao recurso Aluno
 */
class AlunoController extends Aluno {

    /**
     * Faz a chamada ao modelo para obter a lista de Alunos e devolve ao Aluno
     * 
     * @param req Requisição do Aluno
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os Alunos
     * @returns (500) Erro na consulta
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarAlunos da classe Aluno para buscar todos os Alunos no banco de dados
            const listaAlunos: Array<Aluno> | null = await Aluno.listarAlunos();

            // Retorna uma resposta HTTP com status 200 (OK) e envia a lista de Alunos em formato JSON
            return res.status(200).json(listaAlunos);
        } catch (error) {
            // Em caso de erro, exibe a mensagem no console para ajudar na depuração
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de Alunos." });
        }
    }

    /**
     * Faz a chamada ao modelo para inserir um novo Aluno
     * @param req Requisição do Aluno
     * @param res Resposta do servidor
     * @returns (200) Objeto do Aluno inserido
     * @returns (400) Erro ao inserir Aluno
     * @returns (500) Erro na consulta
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Extrai os dados enviados pelo Aluno na requisição HTTP (normalmente via POST)
            // Esses dados devem estar no corpo da requisição e seguir o formato da interface CarroDTO
            const dadosRecebidosAluno = req.body;

            // validação de dados ...

            // Chama o método cadastrarCarro da classe Carro, passando os dados recebidos
            // Esse método deve inserir o carro no banco de dados e retornar true ou false
            const respostaModelo = await Aluno.cadastrarAluno(dadosRecebidosAluno);

            // Verifica se o cadastro foi bem-sucedido
            if (respostaModelo) {
                // Se sim, retorna uma resposta HTTP com status 201 (Created)
                // Envia uma mensagem informando que o carro foi cadastrado com sucesso
                return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso." });
            } else {
                // Se não, retorna uma resposta HTTP com status 400 (Bad Request)
                // Envia uma mensagem informando que houve erro no cadastro
                return res.status(400).json({ mensagem: "Erro ao cadastrar Aluno." });
            }
        } catch (error) {
            // Em caso de erro inesperado (como falha de conexão ou erro interno), exibe a mensagem no console
            console.error(`Erro no modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível inserir o novo carro
            return res.status(500).json({ mensagem: "Não foi possível inserir o Aluno" });
        }
    }

    static async Aluno(req: Request, res: Response): Promise<Response>{
        try{
            const idAluno: number = parseInt (req.params.idAluno as string);
            console.log(idAluno);

            //validação simples
            if (isNaN(idAluno) || idAluno <= 0){
                return res.status(400).json({mensagem: "ID inválido."});            
            } 

            const respostaModelo = await Aluno.listarAluno(idAluno);

              if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum Aluno encontrado com o ID fornecido." });
            }
            return res.status(400).json(respostaModelo);
        }catch(error){
            console.error(`Erro ao acesso o modelo. ${error}`);
            return res.status(500).json({mensagem: "Não foi possivel recuperar o Aluno."});
        }
    }


}

export default AlunoController;