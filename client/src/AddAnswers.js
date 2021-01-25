import React from 'react';
// import { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

function AddAnswers(props) {

    const handleChange = (answerIndex, event) => {
        props.answerPicked(props.examIndex, props.questionIndex, answerIndex, event)
    };

    const handleTextChange = (answerIndex, event) => {
        props.itemEdited(props.examIndex, props.questionIndex, answerIndex, event)
    };

    const handleDelete = (answerIndex) => {
        props.deleteItem(props.examIndex, props.questionIndex, answerIndex)
    };

    return (
        <div>
            {props.answers.map((alkio, answerIndex) =>
                <div key={answerIndex} className="questionRow">
                    <Checkbox
                        checked={alkio.picked}
                        onChange={(event) => handleChange(answerIndex, event)}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <input onChange={(event) => handleTextChange(answerIndex, event)}
                        className="input"
                        value={alkio.answer}>
                    </input>
                    <div className="icon">
                        <DeleteIcon className="color" onClick={() => handleDelete(answerIndex)} />
                    </div>
                </div>)}
        </div>
    );
}

export default AddAnswers;