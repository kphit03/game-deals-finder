import { useEffect, useState } from 'react';
import GameCard from "./GameCard.tsx"
import type { Deal } from "../types.ts";

export default function Home() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?title=elden&limit=10')
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
  }, []);

  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    //get fetched deals, map over each previous deal object and return a GameCard component
    <>
      <div className="deal-list">
        {deals.map((deal: Deal) => (
          <GameCard key={deal.dealID} deal={deal} />
        ))}
      </div>
    </>
  );
}
