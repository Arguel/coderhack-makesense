import Register from '../register/register';
import './main.css';

const Main = ()=>{
    return(
        <main className='main'>            
            <h1 className='main__title'>¡Bienvenidxs a nuestro Hold_Up!</h1>    
            <p className='main__text'>Gracias por interesante en nuestra propuesta colaborativa entre ciudadanxs y emprendedorxs</p>   
            <section className='main__container-section'>
                <article>
                    <section className='main__whatIsIt'>
                        <h2 className='main__whatIsIt-title'>¿Qué es el hold-up?</h2>
                        <p>Es una plataforma de co-creación entre emprendedores socioambientales  y ciudadanos para dar solución a un reto específico de un proyecto. </p>
                    </section>  
                    <section className='main__howToHelp'>
                        <h2 className='main__whatIsIt-title'>¿Cómo pueden ayudarme con mi emprendimiento?</h2>
                        <ol>
                            <li>Registrate en la plataforma</li>
                            <li>Llena el perfil de tu emprendimiento</li>
                            <li>Sigue las instrucciones del hold-up para publicar tu reto en el foro de emprendedores</li>
                        </ol>            
                    </section>  
                </article>  
                <Register/> 

            </section>

        </main>
    )
}

export default Main