import React,{useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import './Search.css';


const URL2 = import.meta.env.VITE_APP_URL2;
const KEY = import.meta.env.VITE_APP_KEY;

const searchSuggestion = async (query) => {
  if (query) {
    const suggestions = await fetch(
      `${URL2}/v1/search.json?key=${KEY}&q=${query}`
    );
    return await suggestions.json();
  }
};

const Search = ({fetchWeather}) => {      
    const inputRef= useRef(null);
    const [searchSuggestions, setSearchSuggestions] = useState(null);

    const handleSearchChange = async (e) => {
    const suggestions = await searchSuggestion(e.target.value);
    setSearchSuggestions(suggestions);
  };

    const handleDropdownItemClick = (e) => {
    fetchWeather(e.target.innerText);
    setSearchSuggestions(null);
    document.querySelector(`.${'searchBar'}`).value = "";
  };

return (    
    // className='container'
        <div> 
            <div className='searchContainer'>
                <input type="text" 
                    placeholder='Search a place' 
                    ref ={inputRef} 
                    className='searchBar'
                    onChange={handleSearchChange}/>                    
                <FontAwesomeIcon          
                icon={faCrosshairs}  className='icon'
                onClick={()=>fetchWeather(inputRef.current.value)}         
                />
            </div>
            <div className='dropdown'>
                {searchSuggestions &&
                searchSuggestions.map((item) => (
                  <div key={item.id} onClick={handleDropdownItemClick}>
                    {`${item.name}, ${item.region}, ${item.country}`}
                  </div>   
                ))}
            </div>
     </div>
  )
}

export default Search;