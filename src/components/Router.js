import {
    jobDetailsContentEl,
    getData,
    BASE_API_URL,
    state
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderError from './Error.js';
import renderJobDetails from './JobDetails.js'; 
import renderJobList from './JobList.js';

const loadHashChangeHandler = async () => {
    // get id from url
    const id = location.hash.substring(1);

    if (id) {
        // remove the active class from previously active job items
        document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));

        // remove previous job details content
        jobDetailsContentEl.innerHTML = '';

        renderSpinner('job-details');   

        try{
            // fetch job item data
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
    
            // extract job item
            const { jobItem } = data;

            // update state
            state.activeJobItem = jobItem;

            renderJobList();

            // remove spinner
            renderSpinner('job-details');
    
            // render job details
            renderJobDetails(jobItem);
        } catch (error) {
            renderSpinner('job-details');
            renderError(error.message);
        }
    }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);