import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

function GithubProvider({ children }) {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: '' });

    async function searchGithubUser(user) {
        // clear previous error
        toggleError();
        setLoading(true);

        const response = await axios(`${rootUrl}/users/${user}`)
            .catch(err => console.log(err));

        if (response) {
            setGithubUser(response.data);
            const { login, followers_url } = response.data;

            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`),
                axios(`${followers_url}?per_page=100`)
            ]).then(results => {
                const [repos, followers] = results;

                if (repos.status === 'fulfilled') setRepos(repos.value.data);
                if (followers.status === 'fulfilled') setFollowers(followers.value.data);
            }).catch(err => console.log(err))

            setLoading(false);
            checkRequests();
            return;
        }

        setLoading(false);
        checkRequests();
        toggleError(true, 'there is no user with that username');
    }

    // check the quantity of requests allowed to send 
    function checkRequests() {
        axios(`${rootUrl}/rate_limit`)
            .then(({ data }) => {
                const { rate: { remaining } } = data;

                setRequests(remaining);

                if (!remaining) {
                    toggleError(
                        true,
                        'sorry, you have exceeded hourly rate limit'
                    );
                }
            })
            .catch(err => console.log(err));
    }

    function toggleError(show = false, msg = '') {
        setError({ show, msg });
    }

    useEffect(checkRequests, []);

    const initialContext = {
        githubUser,
        repos,
        followers,
        requests,
        error,
        loading,
        searchGithubUser
    }

    return (
        <GithubContext.Provider value={initialContext}>
            {children}
        </GithubContext.Provider>
    )
}

export { GithubContext, GithubProvider }
