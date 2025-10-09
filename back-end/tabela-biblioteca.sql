-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-----------------------------------------------------------------------

-- CREATE ALUNO - TRIGGER - FUNCTION

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

-- cria o RA
CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Marcio', 'Nacimento', '2005-2-10', 'Rua São Pedro, 321', 'marcin@bloxfruits.com', '993583343'),
('Daniel', 'Danga', '2005-1-03', 'Rua Albania, 444', 'daniel@z2005.com', '994543221'),
('Carla', 'Santos', '2005-5-20', 'Rua São Pedro, 335', 'carla@santos.com', '993545643'),
('Laubewio', 'Sikzo', '2004-10-10', 'Rua Touvayr, 321', 'laubewio@113ac.com', '992943023'),
('Malenia', 'Souls', '2006-6-4', 'Rua Castelo, 321', 'malenia@souls.com', '991234312'),
('Felisberto', 'Bertold', '2003-7-22', 'Rua Castelo, 777', 'felisberto@felis.com', '991324568'),
('Eren', 'Santos', '2003-8-09', 'Rua Muralha Maria, 502', 'eren@tatakae.com', '998439203'),
('Max', 'Verstapen', '2005-9-10', 'Rua Corre Maquina, 61', 'maxverstapen@f1.com', '992384634'),
('Carlos', 'Almeida', '2006-3-11', 'Rua Corre Maquina, 212', 'carlos@almeida.com', '992984739'),
('Frank', 'Stain', '2005-5-02', 'Rua Albert Ainten, 676', 'carlos@almeida.com', '993492234');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('A Divina Comédia', 'Dante Alighieri', 'Editora 34', '1321', '132-1321343433', 10, 10, 150.00, 'Disponível'),
('Jurassic Park ', 'Michael Crichton', 'Alfred A. Knopf', '1990', '0-394-58816-9', 5, 20, 150.00, 'Disponível'),
('Perry Rhodan', 'Jeyamohan', 'VPM', ' 1961', '354-132134234', 10, 20, 150.00, 'Disponível'),
('Jurassic Park-The Lost World', 'Michael Crichton', ' Aleph', '1995', '580-2933292309', 5, 10, 150.00, 'Disponível'),
('The Lost World', 'Arthur Conan Doyle', 'Hodder & Stoughton', '1912', '239-3231231321', 5, 20, 150.00, 'Disponível'),
('Todos os Amanhãs', 'C. M. Kösemen', 'Time Publishing', '2006', '324-564745456', 2, 15, 150.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Canvas', '1832', '556-3424241321', 20, 20, 150.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'livroslegais', '1932', '987-2432256789', 17, 17 , 150.00, 'Disponível'),
('Cem Anos de Solidão', 'Gabriel García Márquez', 'tristesal', '1998', '876-3543543523', 18, 18 , 150.00, 'Disponível'),
('Crime e Castigo', 'Fiódor Dostoiévski', 'tristesal', '1980', '098-4354243557', 10, 10 , 150.00, 'Disponível');



