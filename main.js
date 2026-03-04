
class WordCard extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('word-card-template').content;
        this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.word').innerText = this.getAttribute('word');
        this.shadowRoot.querySelector('.meaning').innerText = this.getAttribute('meaning');
        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
            this.remove();
            removeWordFromLocalStorage(this.getAttribute('word'));
        });

        // Apply external styles to the shadow DOM
        const style = document.createElement('style');
        style.textContent = `
            @import url('style.css');
        `;
        this.shadowRoot.appendChild(style);
    }
}

customElements.define('word-card', WordCard);

const addWordForm = document.getElementById('add-word-form');
const wordList = document.getElementById('word-list');

addWordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const wordInput = document.getElementById('word-input');
    const meaningInput = document.getElementById('meaning-input');
    const newWord = wordInput.value;
    const newMeaning = meaningInput.value;

    if (newWord && newMeaning) {
        addWordToList(newWord, newMeaning);
        saveWordToLocalStorage(newWord, newMeaning);
        wordInput.value = '';
        meaningInput.value = '';
    }
});

function addWordToList(word, meaning) {
    const wordCard = document.createElement('word-card');
    wordCard.setAttribute('word', word);
    wordCard.setAttribute('meaning', meaning);
    wordList.appendChild(wordCard);
}

function saveWordToLocalStorage(word, meaning) {
    const words = getWordsFromLocalStorage();
    words[word] = meaning;
    localStorage.setItem('vocabulary', JSON.stringify(words));
}

function getWordsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('vocabulary')) || {};
}

function removeWordFromLocalStorage(word) {
    const words = getWordsFromLocalStorage();
    delete words[word];
    localStorage.setItem('vocabulary', JSON.stringify(words));
}

function loadWordsFromLocalStorage() {
    const words = getWordsFromLocalStorage();
    for (const word in words) {
        addWordToList(word, words[word]);
    }
}

loadWordsFromLocalStorage();
