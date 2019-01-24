import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const Ingredients = [];
    for(let ingredientName in props.ingredients){
        Ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    };

    const ingredientsOutput = Ingredients.map(ig => {
        return (<span 
                    style={{
                            textTransform: 'capitalize',
                            display: 'inline-block',
                            margin: '0 8px', 
                            border:'1px solid #ccc',
                            padding: '5px'
                        }}    
                    key={ig.name}>
                {ig.name} ({ig.amount})
                </span>);
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order