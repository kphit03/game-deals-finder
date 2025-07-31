import type { Deal } from "../types.ts"

interface GameCardProps { //for type safety
    deal: Deal;
}

export default function GameCard({ deal }: GameCardProps) {
    return (
    // grab title, saleprice, and normalprice and display on card
    <>
        <h1>Game Deal!</h1>
        
        <div className="deal-card"> 
            <h3>{deal.title}</h3>
            <p>Sale: ${deal.salePrice}</p>
            <p>Normal: ${deal.normalPrice}</p>
        </div>
    </>
    );
  }