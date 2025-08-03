import { useState } from "react";

interface SearchBarProps {
    onSearch: (term: string) => void; //function passed from Home
}

export default function SearchBar({ onSearch }: SearchBarProps) {

    const [inputValue, setInputValue] = useState('');//current text typed

    //call when user hits "Search" or presses enter
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (inputValue.trim() === '') { //ignore empty search
            return
        }
        
        onSearch(inputValue); //pass search term up to home
    }
    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input 
                type="text"
                placeholder="Search for a game..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} //change inputValue to what the user types if there's a change
            />
            <button type="submit">Search</button>
        </form>
    )
}