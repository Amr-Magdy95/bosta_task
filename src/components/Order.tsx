import { useSelector } from 'react-redux'
import { RootState } from '../store';
import Loading from './Loading';
import styled from 'styled-components';
import { CgDanger } from "react-icons/cg";
import { useTranslation } from 'react-i18next';


function Order(props: { order: string }): JSX.Element {
    const { t } = useTranslation();
    const { value, isLoading } = useSelector((state: RootState) => state.order);
    console.log(isLoading);
    if (isLoading) {
        return <Loading />
    }
    if (value.error === "Invalid tracking number!") {
        return <ErrorWrapper>
            <h5>Shipment No. {props.order}</h5>
            <div className="error-wrapper" id="error-wrapper">
                <CgDanger /> {t("No record of this tracking number can be found at this time, please check the number and try again later. For further assistance, please contact Customer Service.")}

            </div>
        </ErrorWrapper>
    }
    if (value.provider === "Bosta") {
        const total_seconds = Math.abs((new Date() as unknown) as number - ((new Date((value.CurrentStatus?.timestamp as unknown) as number) as unknown) as number)) / 1000;
        const days_difference = Math.floor(total_seconds / (60 * 60 * 24));
        let newDates = [...value.TransitEvents!];
        newDates = newDates.reverse();
        let gatheredEvents = new Map<string, Array<[state: string, time: string]>>();
        for (let i = 0; i < newDates?.length!; i++) {
            const { timestamp, state } = newDates![i];
            const date = new Date(timestamp);
            let today = date.toLocaleDateString(undefined, {
                day: '2-digit',
                month: "long",
                weekday: 'long'
            });
            let time = date.toLocaleTimeString();;
            if (!gatheredEvents.has(today)) {
                gatheredEvents.set(today, [[state, time]]);
            }
            else {
                let temp = gatheredEvents.get(today);
                temp = [...temp!, [state, time]];
                gatheredEvents.set(today, temp);
            }


        }
        let res = Array.from(gatheredEvents.entries());
        console.log(res);




        return <OrderWrapper>
            <h5>Shipment No. {props.order}</h5>
            <h2>{value.CurrentStatus?.state}</h2>
            {value.CurrentStatus?.state == "DELIVERED" || "DELIVERED_TO_SENDER" ? (<div className='progress-container' ><div id="one"></div><div id="two"></div><div id="three"></div></div>) : null}
            {value.CurrentStatus?.state === "RETURNED" ? (<div className='progress-container'><div id="one"></div><div id="two"></div><div id="three" style={{ background: "#d9f4f8" }}></div></div>) : null}
            <p className='last-active'>(Last update since {days_difference} days ago)</p>
            <div className='hline'></div>
            <div className="timeline">
                <p>Activity Log</p>
                <ul className="sessions">
                    {
                        res.map((item, index)=>{
                            const key = item[0];
                            const value = item[1];
                            return <li>
                                <div>{key}</div>
                                {value.map( (p,index)=>{
                                    return <div>
                                        <p>{p[0]}</p>
                                        <p>{p[1]}</p>
                                    </div>
                                })
                            }
                            </li>
                        })
                        
                        
                    }
                    

                </ul>
            </div>

        </OrderWrapper>

    }
    return <div></div>
}

const ErrorWrapper = styled.div`

h5{
    margin-top: 5rem;
    text-align: center;
    font-weight: 400;
    color: gray;
}
.error-wrapper{
    width: 80%;
    margin 1rem auto;
    display: flex;
    column-gap: 1rem;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border: 1px solid var(--clr-red-3);
    background:  var(--clr-red-2);
    border-radius: 5px;
    
    svg{
        font-size: 3rem;
        align-self: flex-start;
        color: var(--clr-red-1);
    }
}
`

const OrderWrapper = styled.div`
h5{
    margin-top: 5rem;
    text-align: center;
    font-weight: 400;
    color: gray;
}
h2{
    text-align: center;
    text-transform: lowercase;
}
h2:first-letter{
    text-transform: capitalize;
    font-weight: 700;
}
.progress-container{
    display: flex;
    column-gap: .5rem;
    width: 50%;
    margin: 2rem auto;

}
#one,#two,#three{
    background: #0098a5;
    width: 33%;
    height: 0.3rem;
}
#one{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
#three{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.last-active{
    text-align: center;
    font-size: 0.75rem;
    color: gray;
}
.hline{
    background: lightgray;
    width: 70%;
    margin: 0 auto;
    height: .1rem;
}
.timeline{
    width: 70%;
    margin: 1rem auto;
    p{
        color: gray;
    }
}
.sessions{
    margin-top: 2rem;
    border-radius: 12px;
    position: relative;
}
li{
    padding-bottom: 1.5rem;
    border-left: 1px solid lightgray;
    position: relative;
    padding-left: 20px;
    margin-left: 10px;
    &:last-child{
        
        padding-bottom: 0;
    }
    &:before{
        content: '';
        width: 20px;
        height: 20px;
        background: lightgray;
        border: 1px solid white;
        border-radius: 50%;
        position: absolute;
        left: -10px;
        top: 0px;
    }
}
`


export default Order