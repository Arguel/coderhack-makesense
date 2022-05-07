import './register.css'
import { useState } from 'react'
import Google from '../google/google'


const Register =()=>{
    let aaa=''
    let bbb=''
    const [option,setOption]=useState('emprendedor')
    const handleLogin=(option)=>{        
        setOption(option)        
    } 
    if(option==='cuidadano')aaa='register__button--active' 
    if(option==='emprendedor')bbb='register__button--active' 
      
    return(
        <article className='register__container' >
            <h2 className='register__title'>Quiero participar como:</h2>
            <div className='register__container-button'>
                <button className={`register__button ${aaa}`} onClick={()=>handleLogin('cuidadano')}>Ciudadanx</button>
                <button className={`register__button ${bbb}`} onClick={()=>handleLogin('emprendedor')}>Emprendedxr</button>
            </div>
            <p className='register__text'>Si soy emprendedor puedo presentar los retos de mi proyecto a una gran comunidad de ciudadanxs activxs que me apoyarán a encontrar la mejor solución con ideas creativas</p>
            <form>
                <label className='register__form-label'>Correo electrónico</label>
                <input className='register__form-input'></input>
                <label className='register__form-label'>Contraseña</label>
                <input className='register__form-input'></input>
            </form>
            <button className='register__access-button'>Ingresar</button>
            
            <a className='register__access-questions' href='/'>¿Has olvidado tu contraseña?</a>

            <Google option={option}/>            
            
            <a className='register__access-questions' href='/'>¿Todavia no tienes cuenta? Registrarme</a>
            
        </article>  
    )
}

export default Register