// GitHub search app with start and app page

"use strict";

const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm} in:name`,
    per_page: 3
  }
  $.getJSON(GITHUB_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div>
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
  $('main').submit(function(event) {
    event.preventDefault();
    // event.curent target is the form itself
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    // the name doesnt matter, the slot is the important part.  the first slot (user input) is passed to get data api as searchterm, secod hole is the callback hole. picture it as a cone with holes, and 
    // when we pass the paramters to the getdataapi function, it will pass to searchterm and named differently
    getDataFromApi(query, displayGitHubSearchData);
  });
}


/////////

function generateStartHtml() {
    return `
    <h4>Passing Information Between Functions</h4>
    <p>In this study, you'll find a simple app that demonstrates how to pass information between functions.</p>
    <p>The study app will go as follows:</p>
    <ul>
        <li>Use the GitHub Search App as the working model</li>
        <li>Observe how information is passed between function within this model</li>
        <li>Break down and understand how the code works in preceeding steps</li>
    </ul>
    <p>Click through to go to the app</p>
    <button id=startApp>Start!</button>
    `
}

function generateAppHtml() {
    return `
    <h4>Passing Information Between Functions</h4>
    <h1>Repository Search on GitHub</h1>
    <form action="#" class="js-search-form">
        <label for="query">Search repositories: </label>
        <input type="text" class="js-query" placeholder="e.g., John-Azzaro">
        <button type="submit">Search</button>
    </form>
    <h2>Results</h2>
    <div class="js-search-results">
        <p>search results go here</p>
    </div>
    <button id="goback">Go Back</button>
    `
}

function renderStartPage() {
    const startHtml = generateStartHtml();
    $('main').html(startHtml);
}


function renderAppPage() {
    const appHtml = generateAppHtml();
    $('main').html(appHtml);
}

function handleStartApp() {
    $('main').on('click', '#startApp', function(event) {
        renderAppPage();
    });
}

function handleGoBack() {
    $('main').on('click', '#goback', function(event) {
        renderStartPage();
    });
}

function setUpEventHandlers() {
    handleStartApp();
    handleGoBack();
    handleSubmit();
}


function initializeApp() {
    setUpEventHandlers();
    renderStartPage();
}

$(initializeApp)