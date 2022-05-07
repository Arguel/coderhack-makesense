import './footer.css';

const Footer = ()=>{
    return(
        <footer className='footer'>
            <div className='footer__container'>
                <section className='footer__section'>
                    <h3 className='footer__title'>Conecta con nosotros</h3>
                    <p className='footer__text'>Mantente atentx de todas nuestras actividades y programas de impacto socio-ambiental.</p>
                    
                </section>

                <section className='footer__section footer__subcraise'>
                    <h3 className='footer__title'>Suscríbete a nustro newsletter</h3>
                    <button className='footer__button'>Suscríbete</button>                
                </section>

                <section className='footer__section'>
                    <h3 className='footer__title'>Conoce más sobre MakeSense</h3>
                    <p className='footer__text'>Somos una organización internacional que diseña programas de impacto social y ambiental para ayudar a ciudadanxs comprometidxs, emprendedorxs apasionadxs y organizaciones vanguardistas.</p>
                </section>

            </div>
            
            <p className='copyright'>&copy; 2021 makesense mx</p>
        </footer>
    )
}

export default Footer