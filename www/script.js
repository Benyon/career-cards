// ** Start of Variables **

const payload = [
    "[INDEPENDENCE / AUTONOMY] You like being able to determine the way you work without significant direction or involvement from others",
    "[DEVELOPING OTHERS] You enjoy training, teaching, mentoring or coaching others and seeing them develop",
    "[JOB WITH LESS STRESS] You would prefer to have few pressures and uncomfortable demands",
    "[CUSTOMER SERVICE] You enjoy being in an environment where you can look after customers"
];

var movingCard = null;

// ** Start of functions ** 

function startDragging(e) {
    this.classList.add('dragging');
    movingCard = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragInto(e) {
    if (movingCard.parentNode.parentNode !== this){
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

    if (movingCard.parentNode.parentNode !== this) {
        this.getElementsByClassName('card-list')[0].appendChild(movingCard);
    }

    return false;
}

function stopDragging(e) {
    columns.forEach(function (column) {
      column.classList.remove('over');
    });
    movingCard.classList.remove('dragging');
    movingCard = null;
}


function clickOverlay(e) {
    closeDetail();
}

function handleKeyup(e) {
    if (e.keyCode === 27) {
        var cardDetail = document.getElementById('cardDetail');
        if (cardDetail !== null && typeof cardDetail !== 'undefined') {
            closeDetail();
        }
    }
}

function closeDetail(){
    document.getElementById('modalOverlay').style.display = 'none';
    var cardDetail = document.getElementById('cardDetail');
    cardDetail.parentNode.removeChild(cardDetail);
}

function flipCard(e) {
    e.preventDefault();
    document.getElementById('cardDetail').classList.toggle('flipped');
    return false;
}

// ** Start of page execution **

var startingColumn = document.querySelector('#board > .column:nth-child(1) > .card-list');

payload.forEach(function (card) {
    var node = document.createElement('li');
    node.setAttribute('draggable', 'true');
    node.setAttribute('class', 'card');
    node.innerHTML = card.replace('[', '</strong>').replace('] ','<strong><br>');
    startingColumn.appendChild(node);
});

// ** Set up eventListeners **

var cards = document.querySelectorAll('#board .card');
cards.forEach(function(card) {
    card.addEventListener('dragstart', startDragging, false);
    card.addEventListener('dragend', stopDragging, false);
});

var columns = document.querySelectorAll('#board .column');
columns.forEach(function(column) {
    column.addEventListener('dragenter', dragInto, false);
    column.addEventListener('dragover', dragWithin, false);
    column.addEventListener('dragleave', dragOut, false);
    column.addEventListener('drop', drop, false);
});