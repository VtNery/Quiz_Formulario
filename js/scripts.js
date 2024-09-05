//Declaração de Variaveis

const question = document.querySelector("#question");
const answerBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];

let points = 0;
let actualQuestion = 0;

//Perguntas

const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]

// Substituição do quizz para a primeira pergunta

function init(){
    //Criar a primeira pergunta
    createQuestion(0);
}

//Cria uma Pergunta

function createQuestion(i){
    //Limpar a questão anterior
    const oldButtons = answerBox.querySelectorAll('button')

    oldButtons.forEach(function(btn){
        btn.remove();
    })

    //Alterar o texto da pergunta
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //Insere alternativas

    questions[i].answers.forEach(function(answer,i){
        //Cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");
        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);


        //Remove hide e template class

        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        //Inserir alternativa na tela
        answerBox.appendChild(answerTemplate);

        //Inserir evento de click no botão

        answerTemplate.addEventListener("click", function(){
            checkAnswers(this);
        })       
    })
     //Incrementar o número da questão

     actualQuestion++;

}

//Verificando resposta do usuário

function checkAnswers(btn){
    
    //Seleciona todos os botões
    const buttons = answerBox.querySelectorAll('button')

    //Verifica se a resposta está correta e adicionas as classes aos botões
    buttons.forEach(function(button){

        if(button.getAttribute("correct-answer") === 'true'){
            button.classList.add('correct-answer');
            
            //Checa se o usuário acertou
            if(btn === button){
                //incremento dos pontos
                points++;
            }
        }else{
            button.classList.add('wrong-answer')
        }

    });
    //Exibir próxima pergunta

    nextQuestion();
}

//Exibe a próxima pergunta

function nextQuestion(){

    //Time para o usuários ver as respostas
    setTimeout(function() {
        //Verifica se ainda há perguntas
        if(actualQuestion >= questions.length){
            showSucessMessage();
            return;
        }
        createQuestion(actualQuestion);
    }, 1500);

}

//Exibe a tela final

function showSucessMessage(){

    hideOrShowQuizz()


    
    //Trocar os dados da tela de sucesso

    //Calcular score

    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    //Alterar o numero de perguntas corretas

    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    //Alterar o total de perguntas

    const totalQuestions = document.querySelector('#question-qty')
    totalQuestions.textContent = questions.length

}

//Mostra ou esconde o score

function hideOrShowQuizz(){
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

//Reiniciar Quizz

const restartBtn = document.querySelector('#restart')

restartBtn.addEventListener("click", function(){

        //zerar o jogo
        actualQuestion = 0;
        points = 0
        hideOrShowQuizz();
        init();
    
})


//Inicialização do Quizz
init();