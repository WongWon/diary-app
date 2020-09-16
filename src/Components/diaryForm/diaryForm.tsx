import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


function DiaryForm({open}) {

    const handleClose = () => {
        setOpen(true);
    }

    return(
        <div>
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
        </div>
    )
}

export default DiaryForm