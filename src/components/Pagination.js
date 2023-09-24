import {
    state,
    paginationEl,
    paginationBtnBackEl,
    paginationBtnNextEl,
    paginationNumberBackEl,
    paginationNumberNextEl,
    RESULTS_PER_PAGE
} from '../common.js';

import renderJobList from './JobList.js';

const renderPaginationButtons = () => {
    // display back button if we are on page 2 or further
    if (state.currentPage > 1) {
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

    // remove next button if we are on the last page
    if (state.currentPage >= state.searchJobItems.length / RESULTS_PER_PAGE) {
        paginationBtnNextEl.classList.add('pagination__button--hidden');
    } else {
        paginationBtnNextEl.classList.remove('pagination__button--hidden');
    }

    // update page numbers
    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    // blur the buttons
    paginationBtnNextEl.blur();
    paginationBtnBackEl.blur();
};

const clickHandler = event => {
    // get clicked button element
    const clickedButtonEl = event.target.closest('.pagination__button');

    // stop function if null
    if (!clickedButtonEl) return;

    // check if intention is next or back
    const nextPage = clickedButtonEl.className.includes('--next');

    // update state
    nextPage ? state.currentPage++ : state.currentPage--;

    // render pagination buttons
    renderPaginationButtons();

    // render job items for that page
    renderJobList();

};

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;