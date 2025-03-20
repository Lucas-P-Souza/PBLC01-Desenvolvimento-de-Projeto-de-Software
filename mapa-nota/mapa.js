class Avaliacao {

    //atributos státicos
    static notaMinima = 6; //notá minima para ser aprovado
    static frequenciaMinima = 0.75; //frequência mínima para ser aprovado
    static cargaTotalAulas = 64; //carga horária total do curso

    //construtor da classe
    constructor(matricula, presenca, nota1, nota2, substitutiva) {
        this.matricula = matricula; //matrícula do aluno
        this.presenca = presenca; //quantidade de presenças que o aluno teve
        this.nota1 = nota1; //nota da primeira avaliação
        this.nota2 = nota2; //nota da segunda avaliação
        this.substitutiva = substitutiva; //nota da avaliação substitutiva
    }

    //métodos da classe
    calcularMedia() { //método para calcular a média do aluno
        let media = (this.nota1 + this.nota2) / 2;
        if (media < Avaliacao.notaMinima && this.foiAprovadoPorFrequencia()) {
            if (this.nota1 < this.nota2) {
                media = (this.substitutiva + this.nota2) / 2;
            } else {
                media = (this.nota1 + this.substitutiva) / 2;
            }
        }
        return media;
    }

    foiAprovadoPorFrequencia() { //método para verificar se o aluno foi aprovado por frequência
        return this.presenca >= Avaliacao.frequenciaMinima * Avaliacao.cargaTotalAulas;
    }

    foiAprovadoPorNota() { //método para verificar se o aluno foi aprovado por nota
        return this.calcularMedia() >= Avaliacao.notaMinima;
    }

    foiAprovado() { //método para verificar se o aluno foi aprovado na disciplina
        return this.foiAprovadoPorFrequencia() && this.foiAprovadoPorNota();
    }
}

//main
const prompt = require('prompt-sync')();

let alunos = [];

//laço para cadastrar 5 alunos
for (let i = 0; i < 5; i++) {
    console.log(`\nAluno ${i + 1}:`);
    let matricula = prompt("Matrícula: ");
    let presenca = parseInt(prompt("Presenças: "));
    let nota1 = parseFloat(prompt("Nota 1: "));
    let nota2 = parseFloat(prompt("Nota 2: "));
    let substitutiva = parseFloat(prompt("Nota Substitutiva: "));

    //
    let aluno = new Avaliacao(matricula, presenca, nota1, nota2, substitutiva);
    alunos.push(aluno);
}

//imprimir resultados dos alunos
console.log("\nResultados:");
alunos.forEach((aluno, index) => {
    console.log(`\nAluno ${index + 1} - Matrícula: ${aluno.matricula}`);
    console.log(`Média: ${aluno.calcularMedia().toFixed(2)}`);
    console.log(`Aprovado por frequência: ${aluno.foiAprovadoPorFrequencia() ? "Sim" : "Não"}`);
    console.log(`Aprovado por nota: ${aluno.foiAprovadoPorNota() ? "Sim" : "Não"}`);
    console.log(`Aprovado na disciplina: ${aluno.foiAprovado() ? "Sim" : "Não"}`);
});