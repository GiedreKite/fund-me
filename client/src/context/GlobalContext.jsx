/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
    isLoggedIn: false,
    role: 'public',
    username: '',
    changeLoginStatus: () => { },
    likedfunds: [],
    addLike: () => { },
    removeLike: () => { },
};

export const GlobalContext = createContext(initialContext);

export function GlobalContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn);
    const [role, setRole] = useState(initialContext.role);
    const [username, setUsername] = useState(initialContext.username);
    const [likedfunds, setLikedfunds] = useState(initialContext.likedfunds);

    useEffect(() => {
        fetch('http://localhost:5030/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setIsLoggedIn(data.isLoggedIn);
                setRole(data.role);
                setUsername(data.username);
            })
            .catch(e => console.error(e));
    }, []);

    useEffect(() => {
        if (isLoggedIn !== true || role !== 'user') {
            return;
        }

        fetch('http://localhost:5030/api/funds-list', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setLikedfunds(data.list);
                }
            })
            .catch(e => console.error(e));
    }, [isLoggedIn, role]);

    function changeLoginStatus(newStatus = initialContext.isLoggedIn) {
        setIsLoggedIn(newStatus);
    }

    function changeRole(newRole = initialContext.role) {
        setRole(newRole);
    }

    function changeUsername(newUsername = initialContext.username) {
        setUsername(newUsername);
    }

    function addLike(fundId) {
        fetch('http://localhost:5030/api/funds', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fundId }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setLikedfunds(pre => [...pre, fundId]);
                }
            })
            .catch(err => console.log(err));
    }

    function removeLike(fundId) {
        fetch('http://localhost:5030/api/funds', {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify({ fundId }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setLikedfunds(pre => pre.filter(n => n !== fundId));
                }
            })
            .catch(err => console.log(err));
    }

    const values = {
        isLoggedIn,
        changeLoginStatus,
        role,
        changeRole,
        username,
        changeUsername,
        likedfunds,
        addLike,
        removeLike,
    };

    return (
        <GlobalContext.Provider value={values}>
            {props.children}
        </GlobalContext.Provider>
    );
}