import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { Header } from './components/header/header';
import { usePriceData } from './hooks/usePriceData';

const App = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { data } = usePriceData(isChecked);

    const handleToggle = (checked: boolean) => {
        setIsChecked(checked);
    };

    return (
        <div className="container">
            <Header
                title="Pricing"
                subtitle="Try it now for Free"
                onToggle={handleToggle}
                isChecked={isChecked}
            />
            <div className="card-grid">
                {data ? (
                    data.map((priceData, index) => (
                        <Card
                            key={priceData.id || index}
                            title={priceData.title}
                            price={priceData.price}
                            repositories={priceData.repositories}
                            members={priceData.members}
                            storage={priceData.storage}
                            support={priceData.support}
                            buttonText={
                                index === 0 ? 'Get Started' : 'Try it now'
                            }
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default App;
