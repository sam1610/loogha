import { Button, Stack }  from "@mui/material"
import SendIcon  from "@mui/icons-material/Send"

export const  Bt = ({lang})=> 
  <Button variant="text" startIcon={<SendIcon />} size="large" color="warning"
  style={{display: 'flex', justifyContent: 'left'}}> {lang} </Button>  

