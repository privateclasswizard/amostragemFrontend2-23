Trabalho Prático

Objetivos
Exercitar os seguintes conceitos trabalhados no desafio:
   - Gestão de projeto de software
   - Ambiente de desenvolvimento
   - Desenvolvimento com React
Enunciado
Sistema para cadastrar entidades para um controle de ensalamento de professores no Unisales.

Atividades
Construir uma interface que promova solução ao problema descrito.
Para cada caso sera criado uma tela de CRUD e uma lista dos dados cadastrados.

Segue dicionário de dados para cada tela:
    - Cadastro de Curso
        - Nome do curso
        - Data inicio de início do curso
        - Nome do Coordenador do curso
        
    -  Cadastro de Período
        - Numero do periodo (3 periodo)
        - Semestre/ano do periodo (2/2023)
        - data inicio
        - data fim
        - turno (campo multivalorado: matutino, vespertino ou noturno)
        - Curso (campo relacionado ao cadastro anterior)
        
    - Cadastro de Professores
        - nome do professor 
        - matrícula (número inteiro)
        - telefone celular
        
    - Cadastro de Salas
        - andar
        - número
        - prédio
        - número de cadeiras
        
    - Cadastro de Desafio(matérias)
        - nome do desafio
        - períodos (1:N com o lista de períodos)
        - professor(n:1 um desafio está relacionado apenas com um professor)
        - data início
        - data fim
        - dia da semana
        - horário
        - sala(selecionar a lista de salas que foi cadastrada)
        
    - Calendário de horários
        - apenas para consulta 
        - O calendário só precisa funcionar para o mês Novembro
        - deve exibir o horário, o professor, a sala por dia da semana dentro do calendário

O sistema tem os seguintes requisitos:
    Uma interface centralizada com menu para acessar as telas
    Deve ser criado CRUD’s para todas as entidades
    Deve ser cria lista para cada cadastro onde será exibido o que foi cadastrado
    Os dados devem ser persistidos no localstorage no formato json
    Usar apenas react.js e React Bootstrap
