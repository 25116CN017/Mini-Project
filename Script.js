
const filterButtons = document.querySelectorAll(".filter-btn");
const questionCards = document.querySelectorAll(".question-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const level = button.getAttribute("data-level");

        questionCards.forEach(function (card) {

            const cardLevel = card.getAttribute("data-level");

            if (level === "all" || level === cardLevel) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});


// ===============================
// QUESTION MODAL
// ===============================

const solveButtons = document.querySelectorAll(".solve-btn");

const questionModal = document.getElementById("questionModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalDifficulty = document.getElementById("modalDifficulty");

const answerBox = document.getElementById("answerBox");
const submitAnswer = document.getElementById("submitAnswer");
const answerMessage = document.getElementById("answerMessage");

const completeBtn = document.getElementById("completeQuestion");


// Current question
let currentQuestion = "";


// Completed questions
let completedQuestions = new Set();


// Open question

solveButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card = button.closest(".question-card");

        currentQuestion = card.querySelector("h3").innerText;

        modalTitle.innerText =
            currentQuestion;

        modalDescription.innerText =
            card.querySelector("p").innerText;

        modalDifficulty.innerText =
            card.querySelector(".difficulty").innerText;

        answerBox.value = "";

        answerMessage.innerText = "";

        completeBtn.innerText =
            "✓ Mark as Completed";

        completeBtn.disabled = false;

        questionModal.style.display = "flex";

    });

});


// ===============================
// SUBMIT ANSWER
// ===============================

submitAnswer.addEventListener("click", function () {

    if (answerBox.value.trim() === "") {

        answerMessage.style.color = "#ef4444";

        answerMessage.innerText =
            "Please write your answer first.";

        return;

    }

    answerMessage.style.color = "#22c55e";

    answerMessage.innerText =
        "Answer submitted successfully! ✅";

});


// ===============================
// MARK AS COMPLETED
// ===============================

completeBtn.addEventListener("click", function () {

    if (completedQuestions.has(currentQuestion)) {

        answerMessage.innerText =
            "This question is already completed.";

        return;

    }

    completedQuestions.add(currentQuestion);

    completeBtn.innerText =
        "✓ Completed";

    completeBtn.disabled = true;

    answerMessage.style.color = "#22c55e";

    answerMessage.innerText =
        "Question completed successfully! 🎉";


    // Update progress

    updateProgress();

});


// ===============================
// UPDATE DSA PROGRESS
// ===============================

function updateProgress() {

    const totalQuestions = questionCards.length;

    const completed = completedQuestions.size;

    const percentage =
        Math.round((completed / totalQuestions) * 100);


    const dsaProgress =
        document.getElementById("dsaProgress");

    const dsaPercent =
        document.getElementById("dsaPercent");


    if (dsaProgress) {
        dsaProgress.style.width =
            percentage + "%";
    }

    if (dsaPercent) {
        dsaPercent.innerText =
            percentage + "%";
    }

}


// ===============================
// CLOSE MODAL
// ===============================

closeModal.addEventListener("click", function () {

    questionModal.style.display = "none";

});


questionModal.addEventListener("click", function (event) {

    if (event.target === questionModal) {

        questionModal.style.display = "none";

    }

});


// ===============================
// START PREPARING
// ===============================

const startBtn =
    document.querySelector(".start-btn");

if (startBtn) {

    startBtn.addEventListener("click", function () {

        document.querySelector(".categories")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}


// ===============================
// EXPLORE TOPICS
// ===============================

const exploreBtn =
    document.querySelector(".explore-btn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", function () {

        document.querySelector(".categories")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}
// ===============================
// RESUME BUILDER
// ===============================

const generateResume =
    document.getElementById("generateResume");

generateResume.addEventListener("click", function () {

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    const github =
        document.getElementById("github").value;

    const education =
        document.getElementById("education").value;

    const skills =
        document.getElementById("skills").value;

    const projects =
        document.getElementById("projects").value;

    const achievements =
        document.getElementById("achievements").value;


    if (name.trim() === "") {

        alert("Please enter your name.");

        return;
    }


    // Create resume preview

    const resumeWindow = window.open(
        "",
        "_blank"
    );


    resumeWindow.document.write(`

        <html>

        <head>

            <title>${name} - Resume</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    max-width: 800px;
                    margin: auto;
                    color: #222;
                }

                h1 {
                    margin-bottom: 5px;
                }
                    button {
    padding: 10px 18px;
    margin-bottom: 25px;

    background: #111827;
    color: white;

    border: none;
    border-radius: 6px;

    cursor: pointer;
}

@media print {
    button {
        display: none;
    }
}

                h2 {
                    border-bottom: 2px solid #222;
                    padding-bottom: 5px;
                    margin-top: 30px;
                }

                p {
                    line-height: 1.6;
                }

                .contact {
                    color: #555;
                }

            </style>

        </head>


        <body>
        <button onclick="window.print()">
    Download / Save as PDF
</button>

            <h1>${name}</h1>

            <p class="contact">
                ${email} | ${phone}
            </p>

            <p>
                ${github}
            </p>


            <h2>Education</h2>

            <p>
                ${education}
            </p>


            <h2>Skills</h2>

            <p>
                ${skills}
            </p>


            <h2>Projects</h2>

            <p>
                ${projects}
            </p>


            <h2>Achievements & Certifications</h2>

            <p>
                ${achievements}
            </p>

        </body>

        </html>

    `);

    resumeWindow.document.close();

});
// ===============================
// LOGIN SYSTEM
// ===============================

const loginButton =
    document.querySelector(".login-btn");

const loginModal =
    document.getElementById("loginModal");

const closeLogin =
    document.getElementById("closeLogin");

const loginSubmit =
    document.getElementById("loginSubmit");

const loginName =
    document.getElementById("loginName");

const loginEmail =
    document.getElementById("loginEmail");

const loginMessage =
    document.getElementById("loginMessage");


// OPEN LOGIN

loginButton.addEventListener("click", function () {

    loginModal.style.display = "flex";

});


// CLOSE LOGIN

closeLogin.addEventListener("click", function () {

    loginModal.style.display = "none";

});


// LOGIN

loginSubmit.addEventListener("click", function () {

    const name = loginName.value.trim();
    const email = loginEmail.value.trim();


    if (name === "" || email === "") {

        loginMessage.style.color = "#ef4444";

        loginMessage.innerText =
            "Please enter your name and email.";

        return;

    }


    // Save user

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);


    loginMessage.style.color = "#22c55e";

    loginMessage.innerText =
        "Login successful! 🎉";


    setTimeout(function () {

        loginModal.style.display = "none";

        loginButton.innerText =
            "Hi, " + name;

    }, 800);

});
