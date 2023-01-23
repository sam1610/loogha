import {AgGridReact} from 'ag-grid-react';
import { useEffect, useState} from 'react';
import { listQuests } from '../graphql/queries';
import { API , Storage} from 'aws-amplify';
import "ag-grid-enterprise"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export function Tableau({etat}) {
  const [gridApi, setGridApi] = useState()
  const [notes, setNotes] = useState([])
  const myStyle={
    valign:"middle",
    height:20
}

const AudioCell =   params=>  {
  // const audi0= Storage.get("audio%Samir.amri@gmail.com%1673871262858" ,{level:"public"}) 
  console.log(params); 
return(<audio controls preload='none' style={myStyle}>
    <source src={params.value} type="audio/mpeg" />
    </audio>)}

 
  // return(
  //   <audio controls preload='none' style={myStyle}>
  //   <source src={audi0} type="audio/mpeg" />
  //   </audio>
  // )



var myIcons={
  sortAcending:()=>{
    return 'ASC'
  },
  sortDescending:()=>{
    return "DESC"
  }}

  var cols=[
  { headerName:"Language", field:"lang", rowGroup:true, hide:true},
  { headerName:"Email", field:"email", sortable:true, filter:"agTextColumnFilter"},
  { headerName:"origin Text", field:"textOrg", wrapText:true, autoheight:true,flex:2, 
  resizable:true, filter: "agGridTextFilter", icons:{
    sortAcending:<i class="fa fa-sort-alpha-up"/>,
    sortDescending:<i class="fa fa-sort-alpha-down"/>
  }},
  { headerName:"Sheduled On", field:"schedOn",sortable:true, filter:"agDateColumnFilter" },
  
  { headerName:"Audio", field:"audioUrlOrg", flex:2, cellRenderer:AudioCell}
]

const onGridReady=(params)=>{
  setGridApi(params.api)
}

useEffect(() => {
  const  fetchNotes= async () =>{
    const apiData = await API.graphql({ query: listQuests });
     return apiData.data.listQuests.items;
  }

  fetchNotes().then( note=> {
    setNotes(note)
  })
}, [etat]);

  return  (


   <>
   {/* <QuestForm  currentUser={props.currentUser}/> */}
    <div className="ag-theme-alpine"  style={{height:500, width:1000}}>
     
     <AgGridReact
      onGridReady={onGridReady}
      columnDefs={cols} 
      rowData={notes}
      pagination={true}
      groupDisplayType={'groupRows'}
      sideBar={true}
      icons={myIcons}
      animateRows={true}>
    </AgGridReact>
  </div>
   </>
  )
}