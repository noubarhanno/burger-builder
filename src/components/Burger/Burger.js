import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let trasnformedingredient = Object.keys(props.ingredients).map(
        igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey +i} type={igKey} />
            })
        }
    ).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (trasnformedingredient.length === 0){
        trasnformedingredient = <p>Please Start Adding Ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {trasnformedingredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;