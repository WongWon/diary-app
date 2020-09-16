import React, { useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import {BrowserRouter, Router, Switch} from 'react-router-dom'
import DiaryEntryCard from './Components/diaryEntryCard/diaryEntryCard';
import DiaryForm from  './Components/diaryForm/diaryForm';


function App() {

  const [open, setOpen] = useState(false)
  const [diaryEntries, setdiaryEntries] = useState([])

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const formSubmit= () => {
    const titleElement = document.getElementById("title") as HTMLInputElement;
    const entryElement = document.getElementById("entry") as HTMLInputElement;

    const body = {
      title: titleElement.value,
      entry: entryElement.value
    }

    console.log(body)

    fetch(`https://dwondiaryAPI.azurewebsites.net/api/Diaries`,{
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    method:'POST',
    body:JSON.stringify(body),
    }).then(res => console.log(res))
    setOpen(false);

  }

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
          <Button color="inherit" onClick={handleOpen}>New Diary Entry</Button>
        </ToolBar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Diary Entry</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write in the fields below to add a new diary entry
            </DialogContentText>

            <TextField 
              id="title"
              margin="dense"
              label="Title"
              type="text"
              inputProps={{
                  maxLength: 50,
                }}
              fullWidth
            />

            <TextField 
              id="entry"
              margin="dense"
              label="Entry"
              type="text"
              multiline
              fullWidth
              inputProps={{
                  maxLength: 255,
                }}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={formSubmit}>
              Submit
            </Button> 
          </DialogActions>
        </Dialog>

      {diaryEntries.map(diaryEntry => {
        return <DiaryEntryCard diaryEntry = {diaryEntry}/>
      })}

    

    </div>
  );
}

export default App;


