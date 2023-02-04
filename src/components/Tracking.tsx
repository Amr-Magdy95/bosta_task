import React, { useState } from 'react'
import { SearchIcon } from '../icons/SearchIcon'
import styled from 'styled-components'
import { CiSearch } from "react-icons/ci";
import { TrackLogo } from '../icons/TrackLogo';
import {useEffect} from 'react';
import { getOrder } from '../features/orderSlice';
import Loading from './Loading';
import Order from './Order';
import { useAppDispatch } from '../store';
import {useTranslation} from 'react-i18next';


function Tracking(): JSX.Element  {
  const { t, i18n } = useTranslation();
  
  const [orderNo, setOrderNo] = useState('');
  const dispatch = useAppDispatch();
  const handleClick = ()=>{
    if( orderNo.length > 0){

      dispatch(getOrder((orderNo as unknown) as number));
    }
    else{
      
    }
  }
  return (
    <Wrapper>
      <div className="tracking-container">
        <h5>{t("track your shipment")}</h5>
        <div className="search-container" id="search-container">
          <input type="text" placeholder='Tracking No.' value={orderNo} onChange={(e)=>setOrderNo(e.target.value)} />
          <button onClick={handleClick}> <CiSearch /></button>
        </div>
      </div>
      <Order order={orderNo} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
margin-top: 10rem;

.tracking-container{
  width: 80vw;
  margin: 0 auto;
  text-align: center;
  h5{
    color: var(--clr-gray-1);
    font-size: 1.25rem;
    font-weight: 400;
  }
}
.search-container{
  width: 25rem;
  margin: 2rem auto;
  display: flex;
  align-items: stretch;
}
.search-container input{
  width: 87%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 1px solid #bbb;  
  padding: 1.25rem;
}
.search-container input::placeholder{
  color: #bbb;
}
.search-container button{
  background: var(--clr-red-1);
  width: 13%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-color: transparent;
  svg{
    color: white;
    transform: scale(3);
    font-weight: 900;
  }

}

@media (min-width: 992px){
  .search-container{
    width: 30rem;
  }
}

`

export default Tracking;