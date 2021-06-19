import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
//import imgUser from '../../img/user.png';
import './DentistProfile.css';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import axios from 'axios';
import { DATES_DENTIST, SCHEDULE_CAL } from '../../redux/types';
import spinner from '../../img/spinner2.gif'


const DentistProfile = (props) => {

  
    let history = useHistory() ;

    //hooks
    const [dentistData, setDentistData] = useState({
        diasMes: [],
        data: [],
        schedule: [],
        token: props.credentials?.token,
        dentist: props.credentials?.dentist,
        arrayToDraw: []
    });

    //Handler
    const updateDentistData = (e) => {
        setDentistData({ ...dentistData, [e.target.name]: e.target.value });
    }

    useEffect( () => {
        searchAppointments();

    }, [])

    useEffect( () => {

    })

    const logOut = () => {

        props.dispatch({type:LOGOUT});

    }
    const searchAppointments = async () => {
        try{
            let token = props.credentials?.token;
            let user = props.credentials?.dentist;
        
            let body = {
                // date: Date.parse(dentistSchedule.date), //FALTA QUE FUNCIONE COGER EL DATE POR CALENDARIO
                dentist: user._id
            } 
        
            let res = await axios.post('http://localhost:3006/appointment/scheduleDentist',body, {headers:{'authorization':'Bearer ' + token}});
            // props.dispatch({type: SCHEDULE_CAL, payload: res?.data})
            setDentistData({...dentistData, data: res?.data, schedule: props.schedule, diasMes: props.calendar?.diasMes})
            console.log(res?.data, "esto es res?.data")
            // console.log(agenda.data, "esto es agenda.data")
            console.log(props?.data, "esto es props.data")
        
            // setDentistAgenda({...agenda, data: res?.data})
            
        
        } catch (error){
            console.log(error)
        }
    }

    // console.log(props.calendar?.semana, "semana imprimir console")
    // console.log(props.calendar?.diasMes, "diasMes imprimir console")
    // console.log(dentistData.data, "aaaaaaaaaaaaaaaaaaaa")
    
    let arrayApp2 = [];
    let arrayApp = [];
    let counter=[];
    let dataArray = dentistData.data;
    let arrayToDraw = dentistData.diasMes;
    let newDate;
    let appDay, appMonth;

    dentistData.data.map((valor)=>{
        // console.log(valor, "valordate")
        // dataArray=valor;
        // arrayToDraw.push(dataArray)
        arrayApp.push(new Date(valor.date).getDate())
        // counter+=new Date(valor.date).getDate()
        // dentistData.diasMes.map((valor2)=>{
            // console.log(valor2, "valor2")
        // if (counter===valor2)
        // arrayToDraw.push(dataArray)
        // })
    })

        let count=0, h=0;
        for (let i=0; i<dataArray.length; i++){
            // console.log(dentistData.data[i].date, "esto es dentistdata")
            newDate = new Date (dataArray[i].date)
            // console.log(newDate, "esto es newdate")
            appDay = newDate.getDate();
            appMonth = newDate.getMonth()+1;
            counter.push(appMonth)
            // console.log(appMonth, "appMonth", props.calendar.monthy, "monthy", counter, "counter")
            console.log(appMonth, "appMonth", props.calendar.monthy, "monthy")
            console.log(dataArray[i].date)
            // moca = (dentistData.data[i].date);
            h=0;
            do {
                if ((arrayToDraw[h]===appDay)&&(props.calendar?.monthy===appMonth)){
                // if (arrayToDraw[h]===appDay){
                    arrayApp2[h]=dataArray[i];
                    count++;
                    // console.log(count)
                    // console.log(arrayApp2, "arraApp", count, "count", )
                    // console.log(arrayToDraw[h], "arraytodraw", appDay)
                // console.log(dataArray.length)
                // console.log(dataArray)
                // console.log(dataArray[i])
                }else if (!arrayApp2[h]){
                    // console.log(arrayApp2[h], "arrayApp2", arrayToDraw[h], "array to draw")
                    arrayApp2[h]=arrayToDraw[h];
                    // arrayApp2[h]=0;
                }
                h++;
            } while (h<arrayToDraw.length)
        }

        

    // arrayApp.sort();
    
    // for (let k=0; k<dentistData.diasMes.length; k++){
    //         if (arrayToDraw[k]===arrayApp[h]){

    //         }
    // }
    
    // for (let h=0; h<dentistData.diasMes.length; h++){

        
    //     for (let j=0; j= dentistData.data.length; j++) {
    //         newDate = new Date (dentistData.data[j].date)
    //         appDay = newDate.getDate();
    //         if (arrayToDraw[h]==appDay)
    //         arrayToDraw[h]=(dentistData.data[j])
    //     }
    //     console.log(arrayToDraw, "si esto va")
        
        
    // }
    

    // dentistData.diasMes.map((valor2)=>{
    //     console.log(valor2)
        
    //     dentistData.data.map((valor)=>{
    //         console.log(valor.date)
    //         arrayApp.push(new Date(valor.date).getDate())
    //         if (valor.date===valor2)
    //         arrayToDraw.push(dentistData.data)
    //     })
    // })

   
        
        
    
    // console.log(arrayApp.sort())
    // console.log(arrayToDraw, "arraytodraw")
    
    

         
        
        // let moca = dentistData.data[i].date;
        // console.log(moca, "es moca")
        // if (get.props.calendar?.diasMes[i]===)
    


    

    if(props.credentials?.token) {

        return(
            <div className="dentistContainer">
                <div className="dentistProfile">
                    <div className="dentistDates">
                        <div className="dentistLeftSide">
                            <h2>MY PROFILE</h2>
                            <img src={props.credentials?.dentist.image} alt="user" className="imgDent"/>
                        </div>
                        <div className="dentistRightSide">
                            <p>NAME : {props.credentials?.dentist.name} </p>
                            <p>EMAIL : {props.credentials?.dentist.email} </p>
                            <p>PHONE : {props.credentials?.dentist.phone}</p>
                            <p>SPECIALITY : {props.credentials?.dentist.speciality}</p>
                            <p>CITY : {props.credentials?.dentist.city}</p>
                            <div className="buttons">
                                <div className="buttonUpdateD">UPDATE</div>
                                <div className="buttonLogoutD" onClick={() => logOut()}>LOGOUT</div>
                            </div>
                        </div>
                    </div>
                    <div className="schedule">
                        <div className="calendar"></div>
                        {/* <h1> AQUI VA EL CALENDARIO!!!! </h1> */}
                        <div className="drawDentistCalendar">
			                {props.calendar?.semana.map((semana, index) => (
					            <div className="dayDentistBox" key={index}>
							        <p>{semana}</p>
					            </div>
			                ))}

			                {arrayApp2.map((diasMes, index) => (
			                	<div className="dayDentistBox" id={index} key={index}>
			                			{/* {diasMes==4 ? (<p>{diasMes}</p>) : (<p>{diasMes}</p>)} */}
                                        {(typeof diasMes === 'object') ? (<div className="dateApp">
                                            <p>{(diasMes.clientName)}</p>
                                            <p>{(diasMes.clinicName)}</p>
                                            <p>{(diasMes.dentistName)}</p>
                                            <p>{(diasMes.city)}</p>
                                            
                                        </div>) : (<p>{diasMes}</p>)}
			                	</div>
			                ))}	
		            </div>
                    </div>
                </div>
            </div>
        )
    } else {
        setTimeout(()=> {
            history.push('/')
        },1000)
        return (
            <div className="spinnerContainer">
              <div className="spinner">
                 <img  src={spinner} alt="spinner" width="60" />
              </div>
        </div>)
       
    }
}

export default connect((state) => ({
    credentials: state.credentials,
    calendar: state.calendar,
    dentistSchedule: state.dentistSchedule
}))(DentistProfile);