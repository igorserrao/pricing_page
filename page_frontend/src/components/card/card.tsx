import './card.css';

interface CardProps {
    title: string;
    price: string | number;
    repositories: string | number;
    members: string | number;
    storage: string | number;
    support: string | number | boolean;
    buttonText?: string;
    onButtonClick?: () => void;
}

export function Card({
    title,
    price,
    repositories,
    members,
    storage,
    support,
    buttonText = "Try it now",
    onButtonClick,
}: CardProps) {

    return (
        <div className="card">
            <header>           
                <p>{title}</p>
                <h2>R${typeof price === 'number' ? price.toFixed(2) : price}</h2>
            </header>
            <div>
                <span className="item">{repositories} repositories</span>
                <span className="item">{members} members</span>
                <span className="item">{storage} storage</span>
                <span className="item">{support}</span>
            </div>
            <button onClick={onButtonClick}>{buttonText}</button>
        </div>
    );
}
