document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('guessLetter').addEventListener('click', guessLetter);
document.getElementById('restartGame').addEventListener('click', restartGame);

let wordToGuess;
let guessedWord;
let attemptsLeft = 6;
let usedLetters = [];
const hangmanStages = [
    `
       ┌─────┐
       │     │
       │     
       │     
       │     
       │     
     ──┴──`,
    `
       ┌─────┐
       │     │
       │     😶
       │     
       │     
       │     
     ──┴──`,
    `
       ┌─────┐
       │     │
       │     😓
       │     │
       │     
       │     
     ──┴──`,
    `
       ┌─────┐
       │     │
       │     😰
       │    /│
       │     
       │     
     ──┴──`,
    `
       ┌─────┐
       │     │
       │     😱
       │    /|\\
       │     
       │     
     ──┴──`,
    `
       ┌─────┐
       │     │
       │     😫
       │    /|\\
       │    / 
       │     
     ──┴──`,
    `
       ┌─────┐
       │     │
       │     💀
       │    /|\\
       │    / \\
       │     
     ──┴──`
];

function startGame() {
    wordToGuess = document.getElementById('wordInput').value.toUpperCase();
    if (!wordToGuess || !/^[A-Z]+$/.test(wordToGuess)) {
        alert("Veuillez entrer un mot valide (lettres uniquement).");
        return;
    }
    guessedWord = Array(wordToGuess.length).fill('_');
    attemptsLeft = 6;
    usedLetters = [];
    document.getElementById('setup').classList.add('d-none');
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('wordDisplay').textContent = guessedWord.join(' ');
    document.getElementById('hangmanDrawing').textContent = hangmanStages[0];
    document.getElementById('message').textContent = '';
    document.getElementById('usedLetters').textContent = 'Lettres utilisées : ';
    document.getElementById('letterInput').value = '';
    document.getElementById('restartGame').classList.add('d-none');
    document.getElementById('letterInput').disabled = false;
    document.getElementById('guessLetter').disabled = false;
}

function guessLetter() {
    const letter = document.getElementById('letterInput').value.toUpperCase();
    if (!letter || letter.length !== 1 || !/[A-Z]/.test(letter)) {
        alert("Veuillez entrer une seule lettre valide.");
        return;
    }
    if (usedLetters.includes(letter)) {
        document.getElementById('message').textContent = `Vous avez déjà utilisé la lettre "${letter}".`;
        document.getElementById('message').className = 'alert alert-info';
        return;
    }
    usedLetters.push(letter);
    document.getElementById('usedLetters').textContent = 'Lettres utilisées : ' + usedLetters.join(', ');

    if (wordToGuess.includes(letter)) {
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        document.getElementById('wordDisplay').textContent = guessedWord.join(' ');
        document.getElementById('message').textContent = `Bien joué ! La lettre "${letter}" est dans le mot.`;
        document.getElementById('message').className = 'alert alert-success';
    } else {
        attemptsLeft--;
        document.getElementById('hangmanDrawing').textContent = hangmanStages[6 - attemptsLeft];
        document.getElementById('message').textContent = `Dommage, la lettre "${letter}" n'est pas dans le mot.`;
        document.getElementById('message').className = 'alert alert-danger';
    }
    document.getElementById('letterInput').value = '';

    if (guessedWord.join('') === wordToGuess) {
        endGame(true);
    } else if (attemptsLeft === 0) {
        endGame(false);
    }
}

function endGame(isWin) {
    if (isWin) {
        document.getElementById('message').textContent = '🎉 Félicitations, vous avez gagné ! 🎉';
        document.getElementById('message').className = 'alert alert-success';
    } else {
        document.getElementById('message').textContent = `😢 Dommage, vous avez perdu. Le mot était "${wordToGuess}".`;
        document.getElementById('message').className = 'alert alert-danger';
    }
    document.getElementById('letterInput').disabled = true;
    document.getElementById('guessLetter').disabled = true;
    document.getElementById('restartGame').classList.remove('d-none');
}

function restartGame() {
    document.getElementById('setup').classList.remove('d-none');
    document.getElementById('game').classList.add('d-none');
    document.getElementById('wordInput').value = '';
}