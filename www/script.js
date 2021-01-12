const payload = [
    "[INDEPENDENCE/ AUTONOMY] You like being able to determine the way you work without significant direction or involvement from others.",
    "[PROBLEM SOLVING/TROUBLE SHOOTING] You enjoy engaging with complex situations, demanding tasks, trouble-shooting, identifying and problem-solving as core part of your job.",
    "[DEVELOPING OTHERS] You enjoy training, teaching, mentoring or coaching others and seeing them develop.",
    "[JOB WITH LESS STRESS] You would prefer to have few pressures and uncomfortable demands.",
    "[CREATIVITY/INNOVATION] Thinking up new ideas and ways of doing things is important to you.",
    "[PRESSURE] You like working to tight deadlines and a fast paced environment.",
    "[PHYSICAL CHALLENGE] bYou enjoy work that is physically demanding.",
    "[PRECISE WORK] You like working at things which involve great care and accurate attention to detail.",
    "[ANALYTICAL CONTENT] You enjoy the process of analysing, evaluating and collating information.",
    "[CUSTOMER SERVICE] You enjoy being in an environment where you can look after customers.",
    "[STATUS] You enjoy being in a position or having a job title which commands respect from others.",
    "[BEING AN EXPERT] You like being acknowledged as someone with special knowledge or skills.",
    "[GENEROUS HOLIDAYS] Your holidays are important to you and are a key part of your lifestyle.",
    "[EXCITEMENT/BUZZ] You enjoy work or an environment providing a high degree of stimulation and excitement.",
    "[SECURITY] You like to have a job where there is a better than average chance of security.",
    "[VARIETY] You enjoy having lots of different things to do or a constantly changing workload.",
    "[CAREER PROGRESSION] You like to work where there are good opportunities for promotion or career development.",
    "[SOMETHING THAT ATTRACTS, INSPIRES, INTERESTS] It is important that your work taps into your interests and passions.",
    "[WORK ALONE] You prefer to work by yourself without any amount of contact or input from others.",
    "[INFLUENCING PEOPLE] You enjoy using your powers of persuasion and being in a position to change attitudes or opinions of others.",
    "[HELPING OTHERS] It is important to you to help people either individually or in groups.",
    "[STABILITY/STRUCTURE] You like a work routine and job duties with a high level of structure and stability.",
    "[FRIENDSHIP] You like to develop close personal relationships with people as a result of work activity.",
    "[MAKING DECISIONS] You enjoy making decisions about what, why and how things should be done.",
    "[POWER AND AUTHORITY] You like to lead and control the work activities or destinies of others.",
    "[HELP SOCIETY/ SOCIAL CONSCIENCE] It is important for you to do something to contribute to the community or betterment of the world.",
    "[PEOPLE CONTACT] You enjoy a lot of day-to-day interaction with people.",
    "[A WELL KNOWN ORGANISATION] You like being part of or well known organisation.",
    "[COMPETITION] You enjoy activities which involve competing against other people or groups.",
    "[WRITTEN COMMUNICATION] You enjoy expressing yourself in writing.",
    "[VERBAL COMMUNICATION] You enjoy expressing yourself in speech.",
    "[AFFILIATION] It is important for you to have a strong affiliation with the organisation you work for and or the type of work you do.",
    "[ABSENCE OF ROUTINE] You prefer to be able to choose your own time schedule for doing things.",
    "[RECOGNITION/RESPECT] You like to get positive feedback and people to appreciate and respect you and your work.",
    "[JOB ENJOYMENT / FULFILMENT] It is essential for you to do work that is enjoyable and fulfilling.",
    "[LOCATION] Where you work is important to you, the geographic area, travelling time etc.",
    "[PLANNING & ORGANISING] You enjoy engaging in work that involves planning and organising for yourself or others.",
    "[WORKING AS PART OF A TEAM] You enjoy close working relations within a group and work as a team to common goals.",
    "[FINANCIAL REWARD] It is important to you to earn a large salary or financial package with opportunity to earn bonus, profit-sharing, etc.",
    "[TRUE FINANCIAL WORTH] It is important to you to be paid what you believe to be a fair rate of pay for your knowledge, expertise, skills, level of experience.",
    "[MANAGING OR SUPERVISING OTHERS] You want to have a job where you are directly responsible for directing work done by others.",
    "[PLEASANT WORKING ENVIRONMENT] The physical surroundings at work are important to you.",
    "[SELF WORTH] Your job must provide you with a sense of high self worth.",
    "[LIFESTYLE] It is important to you to have a balance between work, personal well being and family life.",
    "[POSITIVE WORKING ENVIRONMENT] You like a workplace where staff are well informed, treated fairly, and recognised for what they contribute.",
    "[ETHICS] You like to work for an organisation that does business in an ethical way and integrity is valued.",
    "[FUN] It as important to you to work in an environment where you can regard your job as fun.",
    "[ARTISTIC CREATIVITY] You like work which involves the arts, drawing, designing, creating or making things.",
    "[CHALLENGE] You enjoy being stretched, presented with new, unique or difficult tasks and making an impact.",
    "[SELF DEVELOPMENT] You enjoy continually learning and acquiring new skills and competencies.",
    "[POLITICS] You enjoy being involved in organisational politics.",
    "[FLEXIBILITY] It is important for you to work in an environment that allows for a high degree of flexibility in terms of hours, days worked and possible home working.",
    "[PREDICTABILITY] It is important for you to have set and predictable hours and little or no reason to change.",
    "[COMPANY BENEFITS] It is important to you to have a range of company benefits including a company pension.",
    "[RISK] You enjoy taking frequent risks and doing things differently."
];

var stepsText = [
    ["Values and Needs Exercise - Step 1", "Consider each question carefully and drag the card into the columns below, depending on score."],
    ["Values and Needs Exercise - Step 2", "Challenge your choices and reduce to your top 25 Essential & Desirable values and needs."],
    ["Values and Needs Exercise - Step 3", "Challenge your choices and reduce to your top 10 Essential values and needs."]
]

var colours = ["#ffe177", "#ffb476","#ff8b73","#efff98", "#ccff95", "#93ff8f", "#7cfad6", "#c3e4ff", "#75d7ff","#ffe177", "#ffb476","#ff8b73","#efff98"]
var cooldown = false;
var tempCards = [];
var currentStep = 0;
var movingCard = null;

var columns = {
    get essential() {
        return document.querySelector('#essential .card-list');
    },
    get desirable() {
        return document.querySelector('#desirable .card-list');
    },
    get notimportant() {
        return document.querySelector('#notimportant .card-list');
    },
    get totalTextBox() {
        return document.querySelector('div.interactive-footer > .h2')
    },
    get errorfooter() {
        return document.querySelector('.errorfooter');
    },
    get err() {
        return document.querySelector('.errorfooter > .error > p');
    }

}

// ** Start of functions ** 

function deleteCards(column) {
    setTimeout(() => {
        var listOfCards = column.querySelectorAll(".card-list > li.card");
        listOfCards.forEach(function(card) {
            card.parentNode.removeChild(card);
        });
    }, 450);
}

function deleteCardsAll(cols) {
    setTimeout(() => {
        cols.forEach((column) => { 
            var listOfCards = column.querySelectorAll(".card-list > li.card");
            listOfCards.forEach(function(card) {
                card.parentNode.removeChild(card);
            });
        });
    }, 450);
}

function gatherCards(column) {
    var listOfCards = column.querySelectorAll(".card-list > li.card");
    listOfCards.forEach(function(card) {
        var cardHTML = card.innerHTML;
        tempCards.push(cardHTML);
        card.parentNode.removeChild(card);
    });
}

function placeCards(column, array) {
    array.forEach(function (card) {
        var charCode = Math.floor((card.substring(1,2).toLowerCase().charCodeAt(0)-96) / 2);
        var node = document.createElement('li');
        node.setAttribute('draggable', 'true');
        node.setAttribute('class', 'card');
        node.setAttribute('style', 'background-color: ' + colours[charCode]);
        node.innerHTML = card.replace('[', '<strong>').replace('] ','</strong><br>').replace(']','</strong><br>');
        column.appendChild(node);
        console.log('appending node ' + node + ' to ' + column);
    });
    tempCards = [];
}

function startDragging(e) {
    this.classList.add('dragging');
    movingCard = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragInto() {
    if (movingCard !=null && movingCard.parentNode.parentNode !== this){
        this.classList.add('over');
    }
}

function dragWithin(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function dragOut(e) {
    this.classList.remove('over');
}

function drop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (movingCard !=null && movingCard.parentNode.parentNode !== this) {
        this.getElementsByClassName('card-list')[0].appendChild(movingCard);
    }

    var decidedColumns = currentStep==2 ? [columns.essential, columns.desirable] : [columns.essential];
    updateTotal(decidedColumns, columns.totalTextBox);

    return false;
}

function stopDragging(e) {
    cols.forEach(function (column) {
        column.classList.remove('over');
    });
    movingCard.classList.remove('dragging');
    movingCard = null;
}

function getAmountOfCardsInColumn(column) {
    var listOfCards = column.querySelectorAll(".card-list > li.card");
    return listOfCards.length;
}

function updateTotal(cols) {
    var totalCardsApplicable = 0;
    cols.forEach(function (column) {
        totalCardsApplicable = totalCardsApplicable + getAmountOfCardsInColumn(column);
    })
    columns.totalTextBox.innerText = 'Total: ' + totalCardsApplicable;
}

function activateTotal(cols) {
    var totalTextBox = document.querySelector('div.interactive-footer > .h2');
    document.querySelector('div.interactive-footer').classList.add('extended');
    totalTextBox.setAttribute('style', '');
    updateTotal(cols, totalTextBox)
}

function progressSteps(increment) {
    var main = document.querySelector('main');
    main.setAttribute('style', 'margin-top: 1920px;');

    setTimeout(() => {
        main.setAttribute('style', '');
        var headerText = document.querySelector('.header > .h1');
        var subtext = document.querySelector('.header > .p');
        currentStep = currentStep + increment;
        headerText.innerText = stepsText[currentStep-1][0];
        subtext.innerText = stepsText[currentStep-1][1];
        cooldown = false;
    }, 450);
}

function displayError(string) {
    columns.err.innerText = string;
    columns.errorfooter.setAttribute('style', 'bottom: 80px;')

    setTimeout(() => {
        columns.errorfooter.setAttribute('style', 'bottom: -50px;')
    }, 2200);
}

// ** Start of page execution **

var startingColumn = document.querySelector('#essential .card-list');
placeCards(startingColumn, payload);

// ** Set up eventListeners **

var cards = document.querySelectorAll('#board .card');
cards.forEach(function(card) {
    card.addEventListener('dragstart', startDragging, false);
    card.addEventListener('dragend', stopDragging, false);
});

var cols = document.querySelectorAll('#board .column');
cols.forEach(function(column) {
    column.addEventListener('dragenter', dragInto, false);
    column.addEventListener('dragover', dragWithin, false);
    column.addEventListener('dragleave', dragOut, false);
    column.addEventListener('drop', drop, false);
});

var startButton = document.querySelector('#startButton');
start.addEventListener('click', function () {
    var introBox = document.querySelector('#introduction');
    introBox.classList.add('hidden');
    introBox.classList.remove('visible');
    currentStep = 1;
})

var nextButton = document.querySelector('#proceed');
nextButton.addEventListener('click', function () {
    if (cooldown) { return; } else { cooldown = true; }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    switch (currentStep) {
        case 1:
            deleteCards(columns.notimportant);
            activateTotal([columns.essential, columns.desirable]);
            break;
        case 2:

            var amountOfCards = (getAmountOfCardsInColumn(columns.essential) + getAmountOfCardsInColumn(columns.desirable))
            if (amountOfCards > 25) {
                displayError('Reduce your choices to only 25 essential & desired values.')
                cooldown = false;
                return;
            } else if (amountOfCards < 25) {
                displayError('Increase your choices to at least 25 essential & desired values.')
                cooldown = false;
                return;
            }

            deleteCardsAll([columns.desirable, columns.notimportant]);
            break;
        case 3:

            var amountOfCards = (getAmountOfCardsInColumn(columns.essential))
            if (amountOfCards > 10) {
                displayError('Reduce your choices to only 10 essential values.')
                cooldown = false;
                return;
            } else if (amountOfCards < 10) {
                displayError('Increase your choices to at least 10 essential values.')
                cooldown = false;
                return;
            }

            deleteCardsAll([columns.desirable, columns.notimportant]);
            break;
        case 4:
            displayError('UNDER DEVELOPMENT, STILL PENDING WORK. Please contact Jordan Benyon.')
            break;
        case 5:

            break;
    }
    progressSteps(1);
})