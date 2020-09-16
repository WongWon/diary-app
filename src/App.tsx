import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

import DiaryEntryCard from './Components/diaryEntryCard/diaryEntryCard';
import DiaryForm from  './Components/diaryForm/diaryForm';


function App() {

  const [diaryEntries, setdiaryEntries] = useState([])

  useEffect(() => {
    fetch('https://dwondiaryAPI.azurewebsites.net/api/Diaries')
    .then(response => response.json())
    .then(json => setdiaryEntries(json))
  },[])

  return (
    <div className="App">
      <AppBar position="static">
        <ToolBar>
          <Typography variant="h2">
            Diary Write
          </Typography>

          <Button color="inherit">New Diary Entry</Button>
        </ToolBar>
      </AppBar>

      {diaryEntries.map(diaryEntry => {
        return <DiaryEntryCard diaryEntry = {diaryEntry}/>
      })}

    

    </div>
  );
}

export default App;


