DROP SEQUENCE IF EXISTS seq_ra CASCADE;
DROP TABLE IF EXISTS Aluno CASCADE;
DROP TABLE IF EXISTS Livro CASCADE;
DROP TABLE IF EXISTS Emprestimo CASCADE;

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

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno) NOT NULL,
    id_livro INT REFERENCES Livro(id_livro) NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);


-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');


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

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(11, 12, '2024-09-01', '2024-09-15', 'Em andamento'),
(12, 11, '2024-09-02', '2024-09-16', 'Em andamento'),
(13, 15, '2024-09-03', '2024-09-17', 'Em andamento'),
(15, 13, '2024-09-04', '2024-09-18', 'Em andamento'),
(14, 16, '2024-09-05', '2024-09-19', 'Em andamento'),
(16, 14, '2024-09-06', '2024-09-20', 'Em andamento'),
(17, 18, '2024-09-07', '2024-09-21', 'Em andamento'),
(18, 17, '2024-09-08', '2024-09-22', 'Em andamento'),
(20, 19, '2024-09-09', '2024-09-23', 'Em andamento'),
(19, 20, '2024-09-10', '2024-09-24', 'Em andamento'),
(11, 20, '2024-09-11', '2024-09-25', 'Em andamento'),
(12, 13, '2024-09-11', '2024-09-25', 'Em andamento'),
(14, 15, '2024-09-11', '2024-09-25', 'Em andamento'),
(16, 12, '2024-09-11', '2024-09-25', 'Em andamento');


