// import React from 'react';
// import { useState } from 'react';
// import { green } from '@material-ui/core/colors';
// import Checkbox from '@material-ui/core/Checkbox';

// function CorrectAnswers(props) {

//     // const [checked, setChecked] = React.useState(true);

//     // const GreenCheckbox = withStyles({
//     //     root: {
//     //       color: green[400],
//     //       '&$checked': {
//     //         color: green[600],
//     //       },
//     //     },
//     //     checked: {},
//     //   })((props) => <Checkbox color="default" {...props} />);

//     const handleChange = (answerIndex, event) => {
//         props.optionChanged(props.questionIndex, answerIndex, event)
//     };

//     return (
//         <div>
            
//             {props.answerList.map((alkio, answerIndex) =>
//                 <div key={answerIndex} className="questionRow">
//                     <GreenCheckbox
//                         checked={alkio.correct}
//                         onChange={(event) => handleChange(answerIndex, event)}
//                         inputProps={{ 'aria-label': 'primary checkbox' }}
//                     />
//                     <p className="answerTitle">{alkio.answer}</p>
//                 </div>)}
//         </div>
//     );
// }

// export default CorrectAnswers;