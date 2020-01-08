let questions
let questionsCount
let currentQuestion
let score = 0


let question_title_elem = document.getElementById("title")
let answers_elem = document.getElementById("answers")
action_btn = document.getElementById("action_btn")

function getQuestions() {
    let request = new XMLHttpRequest()
    request.onreadystatechange= function () {
        if (this.readyState == 4 && this.status == 200) {
            questions = JSON.parse(this.responseText).questions
            console.log(questions)
            questionsCount = questions.length
            currentQuestion = 0
        }
    }

    request.open("GET", "/questions.json", false)
    request.send()
}

function displayQuestion (question) {
    console.log(question)
    question_title_elem.innerHTML = ""
    answers_elem.innerHTML = ""


    let question_title = document.createTextNode(question.question)
    question_title_elem.appendChild(question_title)

    question.answers.forEach(answer => {
        console.log(answer)
        let label = document.createElement("label")

        let answers_input = document.createElement("input")
        answers_input.setAttribute("type", "radio")
        answers_input.setAttribute("name", "answer")
        answers_input.setAttribute("value", answer.answer_id)
        answers_input.classList.add("answer")

        let answer_title = document.createTextNode(answer.answer)
        label.appendChild(answers_input)
        label.appendChild(answer_title)

        answers_elem.appendChild(label)
    });
}

action_btn.addEventListener("click", function () {
    let answers = document.getElementsByClassName("answer")
    console.log(answers)
    for (let i = 0; i < answers.length; i++) {
        let answer = answers[i]
        let question = questions[currentQuestion]
        if (answer.checked && answer.value == question.correct) {
            console.log("correct")
            answer.parentNode.classList.add("correct")
            score++
        } else if (answer.checked && answer.value != question.correct) {
            console.log("incorrect")
            answer.parentNode.classList.add("incorrect")
        }
        answer.disabled =true
    }
    currentQuestion++
    let next_btn = document.getElementById("next_btn")
    next_btn.classList.remove("hide")
    this.classList.add("hide")
})

next_btn.addEventListener("click", function () {
    if (currentQuestion == questionsCount) {
        console.log("Question Count Reached")
        document.getElementById("score").innerHTML = score + "/" + questionsCount
        document.getElementById("question_element").classList.add("hide")
        document.getElementById("scores").classList.remove("hide")
        return
    }
    displayQuestion(questions[currentQuestion])
    action_btn.classList.remove("hide")
    this.classList.add("hide")
})

// initialization
getQuestions()
displayQuestion(questions[currentQuestion])