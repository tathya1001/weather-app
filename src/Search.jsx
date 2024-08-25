import React, { useState, useEffect } from 'react';

const CitySearch = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        // Update debounced query after 500ms of no input changes
        const timerId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        // Clear the timeout if the query changes (i.e., before the timeout completes)
        return () => {
            clearTimeout(timerId);
        };
    }, [query]);

    useEffect(() => {
        // Trigger API call only when debouncedQuery changes
        const fetchSuggestions = async () => {
            if (debouncedQuery.length > 2) {
                try {
                    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${debouncedQuery}`, {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': '04517c4f39msh6667445504a415ap1d5c01jsne693104e6aa5',
                            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                        },
                    });

                    const data = await response.json();
                    setSuggestions(data.data);
                } catch (error) {
                    console.error('Error fetching city suggestions:', error);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    const handleCityClick = (city) => {
        setSelectedCity(city);
        setQuery(city.name); // Update the input with the selected city's name
        setSuggestions([]); // Clear the suggestions list
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter a city name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {suggestions.map((city) => (
                    <li key={city.id} onClick={() => handleCityClick(city)}>
                        {city.name}, {city.country}
                    </li>
                ))}
            </ul>
            {selectedCity && (
                <div>
                    <h3>Selected City:</h3>
                    <p>{selectedCity.name}, {selectedCity.country}</p>
                </div>
            )}
        </div>
    );
};

export default CitySearch;
