import { API, Predictions, Storage } from "aws-amplify"
import { useState } from "react";
import { createQuest } from "../graphql/mutations";
import { Tableau } from "./Tableau";
 
 
 
function QuestForm({currentUser}) {
    const [user, setUser] = useState(currentUser);
    
    // const [user, setUser] = useState(null)
    // useEffect(() => {
    //      Auth.currentAuthenticatedUser().then(
    //         user => setUser(user.attributes.email)); }, 
    //         []);
    const initialize={
      email:`${currentUser.email}`,lang:"",textOrg:"",schedOn:"", audioUrlOrg:""
  }
   const [quest, setQuest] = useState(initialize)
   const [subm, setSubm] = useState(false)
   const voiceID={ Fr:"Mathieu", En:"Emma", Es:"Lucia", Arb:"Zeina"}
   
   const handleChange= (key)=>{
       return (e)=>{ setQuest({...quest, [key]:e.target.value})}
   }

  //  async function S3Storage(blb){
  //    fetch(blb).then(r=>r.blob()).then(
  //     async blob => {
  //       const flput= await Storage.put(`audio%${currentUser.email}%${Date.now}`, blob, {
  //         contentType:"audio/mp3",
  //         level:"public"
  //       })
  //       const audi0= Storage.get(flput.key, {level:'public'})
  //       console.log(audi0);
  //     }
  //   )
   
 
   const handleSubmit= async (e)=>{
     e.preventDefault()
    
     try {
      
      await Predictions.convert({
        textToSpeech:{ 
          source:{
            text:quest.textOrg,
            language:quest.lang
          },
          voiceId:voiceID[quest.lang]
        }
       }).then( result=> {
        console.log(result.speech.url)
      fetch(result.speech.url).then(r=>r.blob()).then(
      async blob => {
        const flput= await Storage.put(`audio%${currentUser.email}%${Date.now()}`, blob, {
          contentType:"audio/mp3",
          level:"public"
        })
       
        const audi0= await  Storage.get(
 "audio%Samir.amri@gmail.com%1673867623609",{level:'public', expires:180})
     
         console.log("Audio :", audi0);
        // 
         API.graphql({
          query:createQuest, 
          variables:{ 
            input:{...quest, audioUrlOrg:audi0}
          }
        })
        setSubm(!subm)
        // 
      })
      })
     } catch (err) {
      console.log(err);
     }

      // .catch( err=> console.log(err))
   

// try {
//   await Predictions.convert({
//       textToSpeech:{ 
//         source:{
//           text:quest.textOrg,
//           language:quest.lang
//         },
//         voiceId:voiceID[quest.lang]
//       }
//      }).then( result=> console.log(result.speech.url))
// } catch (err) {
//   console.log(err);
// }
     
    //  .catch( err=> console.log(err))

}
   return (
 <div className="App">
 <form  onSubmit={handleSubmit}>
           <h2> Add new Question</h2>
           <input type="email" value={currentUser.email} onChange={handleChange("email")} />
           <select name="LangId" onChange={handleChange("lang")} value={quest.lang} >
            <option value="None"  > Language....</option>
            <option value="Arb"> عربي</option>
            <option value="En"> En</option>
            <option value="Fr"> Fr</option>
            <option value="Es"> Es</option>
           </select>
           <input type="text" placeholder="Origin Text" val={quest.textOrg} onChange={handleChange("textOrg")} />
           <input type="date" placeholder="Scheduled On" value={quest.schedOn} onChange={handleChange("schedOn")} />
           <button type="submit"  > Add New Question</button>
       </form>
       <Tableau  etat={subm}/>
     </div>
   );
 }
export default QuestForm;