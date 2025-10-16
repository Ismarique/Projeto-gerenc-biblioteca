class Aluno{
    private idAluno : number;
    private ra : number;
    private nome : string;
    private sobrenome : string;
    private dataNacimento : Date;
    private endereco : string;
    private email : string;
    private celular : number;

    constructor(
        _idAluno: number,
        _ra : number,
        _nome : string,
        _sobrenome : string,
        _dataNacimento : Date,
        _endereco : string,
        _email : string,
        _celular : number
    ){
        this.idAluno = _idAluno
        this.ra = _ra
       this.nome = _nome
       this.sobrenome = _sobrenome
       this.dataNacimento = _dataNacimento
       this.endereco = _endereco
       this.email = _email
       this.celular = _celular
    }

    public setId(_idAluno: number): void {
        this.idAluno = _idAluno;
    }

    public getId(): number{
        return this.idAluno;
    }

  public setRa(_ra: number): void {
        this.ra = _ra;
    }

    public getRa(): number{
        return this.ra;
    }

    public setNome(_nome: string): void {
        this.nome = _nome;
    }

    public getNome(): string{
        return this.nome;
    }
    
    public setSobrenome(_sobrenome: string): void{
        this.sobrenome = _sobrenome;
    }

    public getSobrenome(): string{
       return this.sobrenome
    }

    public setDataNacimento(_dataNacimento: Date){
        this.dataNacimento = _dataNacimento;
    }

    public getDataNacimento(): Date{
        return this.dataNacimento;
    }

    public setEndereco (_endereco: string){
        this.endereco = _endereco;
    }


    public getEndereco (): string {
        return this.endereco;
    }

    public setEmail(_email: string){
        this.email = _email;
    }

    public getEmail(): string {
        return this.email;
    }

    public setCelular (_celular: number){
        this.celular = _celular;
    }

    public getCelular(): number{
        return this.celular
    }

}




