
class WordCard extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('word-card-template').content;
        this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.word').innerText = this.getAttribute('word');
        this.shadowRoot.querySelector('.meaning').innerText = this.getAttribute('meaning');
        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.remove();
            removeWordFromLocalStorage(this.getAttribute('word'));
            hideWordDetails();
        });

        this.addEventListener('click', () => {
            showWordDetails(this.getAttribute('word'), this.getAttribute('meaning'));
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
const wordDetailsContainer = document.getElementById('word-details-container');

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

async function showWordDetails(word, meaning) {
    wordDetailsContainer.innerHTML = `
        <h2>${word}</h2>
        <p><strong>의미:</strong> ${meaning}</p>
        <p><strong>유사어:</strong> <span id="synonyms">불러오는 중...</span></p>
    `;
    wordDetailsContainer.style.display = 'block';

    try {
        const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
        const synonyms = await response.json();
        const synonymsList = synonyms.map(s => s.word).join(', ');
        document.getElementById('synonyms').innerText = synonymsList || '찾을 수 없음';
    } catch (error) {
        console.error('유사어를 불러오는 데 실패했습니다:', error);
        document.getElementById('synonyms').innerText = '오류 발생';
    }
}

function hideWordDetails() {
    wordDetailsContainer.style.display = 'none';
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
