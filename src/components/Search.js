import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    BASE_API_URL,
    getData,
    state
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';


const submitHandler = async event => {
    // prevent default behavior
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;

    // validation (regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your search may not contain numbers');
        return;
    }

    // blur input
    searchInputEl.blur();

    // remove previous job items
    jobListSearchEl.innerHTML = '';

    // reset sorting buttons
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    // render spinner
    renderSpinner('search');


    try {
        // fetch search results
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

        // extract job items
        const { jobItems } = data;

        // update state
        state.searchJobItems = jobItems;
        state.currentPage = 1;

        // remove spinner
        renderSpinner('search');

        // render number of results
        numberEl.textContent = jobItems.length;

        // reset pagination buttons
        renderPaginationButtons();

        // render job items in search job list
        renderJobList();
    } catch (error) {
        // remove spinner
        renderSpinner('search');

        // render error message
        renderError(error.message);
    }

    // fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    //     .then(res => {
    //         if (!res.ok) { // 4xx or 5xx status code
    //             throw new Error('Resource issue (e.g. resource doesn\'t exist) or server issue');
    //         }
    //         return res.json();
    //     })
    //     .then(data => {
    //         const { jobItems } = data;

    //         // remove spinner
    //         renderSpinner('search');

    //         // render number of results
    //         numberEl.textContent = jobItems.length;

    //         // render job items in search job list
    //         renderJobList(jobItems);
    //     })
    //     .catch(error => { // network problem or other erros (e.g. trying to parse not JSON as JSON)
    //         renderSpinner('search');
    //         renderError(error.message);
    //     });
};

searchFormEl.addEventListener('submit', submitHandler);