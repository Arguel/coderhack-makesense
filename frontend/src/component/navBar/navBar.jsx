import './navBar.css';
const NavBar=({navItems})=>{
    return(
        <nav className='nav'>
            <ul className='nav__container'>
                {
                    navItems && navItems.map(navItem =>{
                        return(
                            <li className='nav__item' key={navItem}>
                                {navItem} 
                            </li>
                        )
                    })
                }
                
            </ul>            

        </nav>
    )
    
}

export default NavBar