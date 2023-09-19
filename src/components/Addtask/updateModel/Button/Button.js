import cssBtn from './button.module.css';
const Button=(props)=>{

    return <button className={cssBtn.button} type={props.type||'button'} onClick={props.onClick} style={{marginRight:'20px'}}>{props.children}</button>
}

export default Button;