class Livro{
   private idLivro : number
   private titulo : string
   private autor : string
   private editora : string
   private anoPublicacao: Date
   private isbn : number
   private quantTotal : number
   private quantDisponivel : number
   private valorAquisicao :number
   private statusLivroEmprestado : string

    constructor(
   _idLivro: number,
   _titulo: string,
   _autor: string,
   _editora: string,
   _anoPublicacao: Date,
   _isbn: number,
   _quantTotal: number,
   _quantDisponivel: number,
   _valorAquisicao: number,
   _statusLivroEmprestado: string
    ){
        this.idLivro = _idLivro
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

     public setIdLivro(_idLivro:number): void{
        this.idLivro=_idLivro
    }

    public getIdLivro():number{
         return this.idLivro
    }

    public setTitulo(_titulo:string): void{
        this.titulo = _titulo;
}

    public getTitulo():string{
        return this.titulo;
    }

    
    public setAutor(_autor:string): void{
        this.autor=_autor;
    }

    public getAutor():string{
        return this.autor;
    }

    
    public setEditora(_editora: string): void{
        this.editora=_editora
    }

    public getEditora():string{
        return this.editora;
    }

    
    public setAnoPublicacao(_anoPublicacao:Date): void{
        this.anoPublicacao=_anoPublicacao
    }

    public getAnoPublicacao():Date{
        return this.anoPublicacao;
    }

    
    public setIsbn(_isbn:number): void{
        this.isbn = _isbn
    }

    public getIsbn():number{
        return this.isbn;
    }

    
    public setQuantTotal(_quantTotal:number): void{
        this.quantTotal = _quantTotal
    }

    public getQuantTotal():number{
        return this.quantTotal;
    }

    
    public setQuantDisponivel(_quantDisponivel:number): void{
        this.quantDisponivel=_quantDisponivel
    }

    public getQuantDisponivel():number{
        return this.quantDisponivel;
    }

    
    public setValorAquisicao(_valorAquisicao:number): void{
        this.valorAquisicao = _valorAquisicao
    }

    public getValorAquisicao():number{
        return this.valorAquisicao;
    }

    
    public setStatusLivroEmprestado(_statusLivroEmprestado:string): void{
        this.statusLivroEmprestado=_statusLivroEmprestado
    }

    public getStatusLivroEmprestado():string{
        return this.statusLivroEmprestado;
    }

}

