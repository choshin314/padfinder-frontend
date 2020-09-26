import {useState, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export const usePropertyList = () => {
    const {user} = useContext(AuthContext);
    const [ pagination, setPagination ] = useState({});
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    async function fetchPropertyList(listName, pageNum = 1, limit = 100, setPropertyList) {
        if (user) {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/list/${listName}/${user.userId}?pg=${pageNum}&limit=${limit}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                if (response.status !== 200) throw new Error('Could not retrieve properties.  Try again later.');
                const data = await response.json();
                if (data.properties.length < 1) throw new Error('No properties found.');
                setPropertyList(data.properties);
                setPagination({
                    totalPages: data.totalPages,
                    currentPage: data.currentPage,
                    prevPage: data.prevPage,
                    nextPage: data.nextPage
                })
                setLoading(false);
            } catch(err) {
                setLoading(false);
                setErrorMsg(err.message);
            }
        }
    }

    return { fetchPropertyList, pagination, errorMsg, loading }
}

