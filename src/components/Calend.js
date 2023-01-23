import { useState } from "react";
import  Calendar  from "react-calendar";
export function Calend(){
    const [tlg, setTlg] = useState(new Date())
    const marks=[
        "01-01-2023",
        "07-01-2023",
        "24-01-2023"
    ]
    return(  
    <div className="w-full h-full p-10"> 
    <Calendar className="w-96 h-full rounded-xl  bg-violet-300" onChange={setTlg}  value={tlg}
    titleClassName={({date})=> {
        let day= date.getDate()
        let month= date.getMonth()+1
        day= date<10?"0"+day :day
        month= month<10?"0"+month :month



    const d =day+"-"+month +"-"+date.getFullYear() ;
    // console.log(d);
        if( marks.find( val=> val===d)){
            return "highlight"
        }
     
        
    } }
    />
    </div>
    
    )
   


 


}