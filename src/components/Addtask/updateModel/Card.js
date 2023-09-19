import cardCss from './card.module.css';

const Card=(props)=>{
    return (
        <div className={`${cardCss.card} ${props.className}`}>{props.children}</div>
    )
}

export default Card;