start();

function start() {
    let i = 0;
    const field = document.querySelector('#field');

    const messageContainer = document.querySelector('#message-container');
    messageContainer.addEventListener('click', start);
    messageContainer.classList.toggle('show');

    field.addEventListener('click', function step(e) {
        if (e.target.className === 'cell' && !e.target.textContent) {
            e.target.textContent = ['X', 'O'][i % 2];
            
            if(isVictory(field.children)) {
                showEndGameMessage(messageContainer, `Player ${e.target.textContent} wins`);
                
                field.removeEventListener('click', step);
            } else if (i == 8) {
                showEndGameMessage(`Draw`);

                field.removeEventListener('click', step);
            }

            i++;
        }
    });

    [].map.call(field.children, (item) => item.textContent = '');
}

function showEndGameMessage(messageContainer, message) {
    messageContainer.firstChild.textContent = message;
    messageContainer.classList.toggle('show');
}

function isVictory(cells) {
    const combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let comb of combs) {
		if (
			cells[comb[0]].textContent == cells[comb[1]].textContent &&
			cells[comb[1]].textContent == cells[comb[2]].textContent &&
			cells[comb[0]].textContent != ''
		) {
			return true;
		}
	}
    
    return false;
}