
# Blueprint: SAT Vocabulary Quiz

## Overview

This application is an interactive quiz for learning SAT vocabulary. It presents words in a multiple-choice format and is organized by difficulty levels to provide a structured learning experience.

## Style, Design, and Features

### Design Principles
*   **Aesthetics:** Clean, focused, and encouraging.
*   **Color Palette:** A motivating color scheme that uses distinct colors for feedback (correct/incorrect answers).
*   **Typography:** Clear and legible fonts for easy reading during the quiz.
*   **Layout:** A responsive, single-page interface that works well on all devices.
*   **Interactivity:** Smooth transitions and immediate feedback for user actions.

### Core Features
*   **SAT Vocabulary:** Uses a curated list of SAT words.
*   **Levels:** Words are grouped into different difficulty levels.
*   **Quiz Format:** A multiple-choice quiz where the user selects the correct meaning for a given word.
*   **Scoring:** Tracks the user's score for each level.
*   **Immediate Feedback:** Shows whether the selected answer is correct or incorrect.

## Current Plan

The current plan is to refactor the application from a simple wordbook into an interactive SAT vocabulary quiz. The following steps will be taken:

1.  **Create a word data source:** A new `sat_words.json` file will be created to store SAT words and their meanings, organized by difficulty level.
2.  **Update the HTML structure:** The `index.html` file will be redesigned to include a level selection screen, the quiz interface (word display, multiple-choice options), a scoring display, and navigation buttons.
3.  **Revamp the CSS:** The `style.css` will be updated to style the new quiz layout, including feedback styles for user answers.
4.  **Implement the quiz logic:** The `main.js` file will be rewritten to:
    *   Fetch the SAT words from `sat_words.json`.
    *   Manage the quiz state (current level, score, current word).
    *   Generate multiple-choice questions.
    *   Handle user answers, provide feedback, and update the score.
    *   Allow users to select a level and progress through the quiz.
