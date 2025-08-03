import { useEffect, useState } from 'react';
import GameCard from "./GameCard.tsx";
import type { Deal } from "../types.ts";
import SearchBar from "./SearchBar.tsx";

export default function Home() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('elden');
  
  useEffect(() => {

    setLoading(true);
    setError(null);

    fetch(`https://www.cheapshark.com/api/1.0/deals?title=${encodeURIComponent(searchTerm)}&limit=10`)
      .then(res => res.json()) //turn promise response into a json response
      .then((data: Deal[]) => { //map to Deal object array
        //console.log(data); //log the data response json
        setDeals(data); 
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Something went wrong');
        setLoading(false);
      });
  }, [searchTerm]); // <-- re-run whenever searchTerm changes

  function handleSearch(term: string) {
    setSearchTerm(term);
  }
  
  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="home">
      {/* Pass down handleSearch as onSearch */}
      <SearchBar onSearch={handleSearch} />
      
      {/*get fetched deals, map over each previous deal object and return a GameCard component*/}
      <div className="deal-list">
        {deals.length > 0 ? (
          deals.map((deal: Deal) => (
            <GameCard key={deal.dealID} deal={deal} />
          ))
        ) : (
          <p>No results found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}
