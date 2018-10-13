"use strict";

const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';

function getDataFromApi(searchTerm, callback) {  // gas station analogy
  const query = {
    q: `${searchTerm} in:name`,
    per_page: 4
  }
  $.getJSON(GITHUB_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div class="resultStyle">
      <h2>
      <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="js-user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
      <p>Number of watchers: <span class="js-watchers-count">${result.watchers_count}</span></p>
      <p>Number of open issues: <span class="js-issues-count">${result.open_issues}</span></p>
    </div>
  `;
}

function displayGitHubSearchData(data) {
  const results = data.items.map((item) => renderResult(item));
  $('.js-search-results').html(results);
}

function handleSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    const userInputTextBox = $(event.currentTarget).find('.js-query');   // event.curent target is the form itself
    const userInput = userInputTextBox.val();
    queryTarget.val("");
    getDataFromApi(userInput, displayGitHubSearchData);   // the name doesnt matter, the slot is the important part.  the first slot (user input) is passed to get data api as searchterm, secod hole is the callback hole. picture it as a cone with holes, and 
    // when we pass the paramters to the getdataapi function, it will pass to searchterm and named differently
  });
}

function setUpEventHandlers() {
  handleSubmit();
}

function initializeApp() {
  setUpEventHandlers()
}

$(initializeApp);