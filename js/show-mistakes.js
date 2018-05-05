export const showMistakes = (mistakesNumber) => {
  return `
    <div class="main-mistakes">
    ${new Array(mistakesNumber)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
    </div>
  `;
};
