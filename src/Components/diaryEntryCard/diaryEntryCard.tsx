import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

function DiaryEntryCard ({diaryEntry}) {

    const [open, setOpen] = useState(false)
    const [state, setState] = useState({diaryEntry})


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const formSubmit = () => {
        const titleElement = document.getElementById("title") as HTMLInputElement;
        const entryElement = document.getElementById("entry") as HTMLInputElement;

        const body = {
            id: diaryEntry.id,
            title: titleElement.value,
            entry: entryElement.value
        }
        console.log(body)
       
        fetch(`https://dwondiaryAPI.azurewebsites.net/api/Diaries/${diaryEntry.id}`,{
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
    
        },
        method:'PUT',
        body:JSON.stringify(body),
        }).then(res => console.log(res))
        setOpen(false);
    }

    const deleteEntry = () => {
        fetch(`https://dwondiaryAPI.azurewebsites.net/api/Diaries/${diaryEntry.id}`,{
            method:'DELETE'
        })
    }
    return(
        <div>
            <Card>
                <CardContent>
                    <h1 id="displayedTitle">{diaryEntry.title}</h1>
                    <p id="displayedEntry">{diaryEntry.entry}</p>
                </CardContent>

                <CardActions>
                    <ButtonGroup>
                        <Button onClick = {handleOpen}>Edit</Button>
                        <Button onClick = {deleteEntry}>Delete</Button>
                    </ButtonGroup>
                </CardActions>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Diary Entry</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Write in the fields below to edit the diary entry
                        </DialogContentText>

                        <TextField 
                        defaultValue={diaryEntry.title}
                        onChange={e =>setState({...diaryEntry, title: e.target.value})}

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
                        defaultValue={diaryEntry.entry}
                        onChange={e =>setState({...diaryEntry, entry: e.target.value})}

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
                            Submit Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </div>
    )
}

export default DiaryEntryCard;