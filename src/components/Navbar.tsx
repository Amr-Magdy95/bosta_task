import React, { SyntheticEvent, useState } from 'react'
import styled from 'styled-components';
import { Logo } from '../icons/Logo';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useTranslation } from 'react-i18next';


function Navbar() {
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState('En');
    const onClickLanguageChange = (e: SyntheticEvent) => {
        let language: string;
        if (lang === "En") {
            language = 'Ar';
            setLang(language);
            i18n.changeLanguage(language);
            document.getElementById("navbar")!.style.flexDirection= "row-reverse";
            document.getElementById("nav-left")!.style.flexDirection= "row-reverse";
            document.getElementById("search-container")!.style.flexDirection= "row-reverse";
            document.getElementById("error-wrapper")!.style.flexDirection= "row-reverse";

        }
        if (lang === "Ar") {
            language = "En";
            setLang(language);
            i18n.changeLanguage(language);
            document.getElementById("navbar")!.style.flexDirection= "row";
            document.getElementById("nav-left")!.style.flexDirection= "row";
            document.getElementById("search-container")!.style.flexDirection= "row";
            document.getElementById("error-wrapper")!.style.flexDirection= "row";
             

        }

    }
    return (
        <Wrapper id="navbar">
            <div className='nav-left' id="nav-left">
                <Logo />
                <h4>{t("bosta")}</h4>
            </div>
            <div className="nav-right">
                <div className='shipment'>{t("track your shipment")}  <MdKeyboardArrowDown /></div>
                <div className="nav-burger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <button className="lang-toggle" onClick={onClickLanguageChange}>
                {t(lang)} <MdKeyboardArrowDown />
            </button>
        </Wrapper>
    )

}

const Wrapper = styled.nav`
position: fixed;
top: 0;
left: 0;
height: 7rem;
width: 100%;
padding: 0 1.875rem;
display: flex;
align-items: center;
justify-content: space-between;

.nav-left{
    display: flex;
    align-items: center;
    height: 4rem;
    width: 100%;
    h4{
        font-size: 1.6rem;
        color: var(--clr-red-1);
        font-weight: 700;
        text-transform: none;
    }
    svg{
        fill: var(--clr-red-1);
        width: 3rem;
        height: 3rem;
        path{
            transform: scale(0.75);
        }
    }
}
.nav-right{
    width: 20rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    h5{
        width: 12rem;
    }
}
.shipment{
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: var(--clr-red-1);
    font-weight: 700;
    svg{

        transition: 0.5s;
    }
}

.shipment:hover svg{
    transform: rotate(-90deg);
}

.nav-burger{
    display: flex;
    flex-direction: column;
    row-gap: .3rem;
}
.nav-burger div{
    width: 1.5rem;
    height: 0.19rem;
    background: var(--clr-gray-1);

}
.lang-toggle{
    display: none;
    background: transparent;
    border: none;
}
@media (min-width: 1200px){
    padding: 0.75rem 4.5rem;
    align-items: flex-start;
    .nav-right{
        display: none;
    }
    .lang-toggle{
        display: flex;
        align-items: center;
        margin-top: 1rem;
        color: black;
        svg{
            color: var(--clr-gray-1);
        }
        
    }
}


`

export default Navbar