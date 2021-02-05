import axios from "axios";
import {useEffect, useState} from "react";
import Row from 'react-bootstrap/Row';
import AlertBanner from "../common/AlertBanner";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";


/* This component is common for both Scoops option as well as Topping options. So we get an optionType via props.
*  optionType can be 'scoops' or 'toppings' and based on that we make a API call and get the details. After details are received,
*  we render individual React component (ScoopOptions or ToppingsOptions) and pass the details via props  */

/* Note: the prop passed in the react functional component is an object and we can either destructure it inside the body
*  by using statement (const {optionType} = props.optionType and the function will have argument as 'function Options(props)'.
*  But here this is done within the the function argument only using '{optionType}'  */

export default function Options({optionType}) {    // Note: We are using functional component and optionType is props destructured within parenthesis ()

    /*   optionType is 'scoops' or 'toppings'   */

    const [items, setItems] = useState([]);  // This stores the API response data

    const [error, setError] = useState(false); // This stores boolean value (T/F) to depict if API call was success or fail

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then(response => setItems(response.data))
            .catch((error) => {
                //console.log("Error: API Failed. Details: ", error);
                return setError(true);          // If API response is fail/error, we set the error flag (state) as true.
            })
    }, [optionType])


    /* Note: We check if API call had failure?  If yes then return <AlertBanner /> component which has error labels. Since
    *  return statement is encountered, the function/component ends here. If no error/failure then rest of code is executed  */
    if (error) {
        return <AlertBanner />
    }
    /* If no error/failure then execute below steps  */

    /* Check if the current component needs to render Scoop Options component or Topping Options
       To Do - Change null to ToppingOptions when available   */
    const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions;

    //console.log(items);

    /* Based on number of options received from API call, we loop and pass the data as props to Child Component.
    *  Note: optionItems is an array received after map function executes over the items State (items contains the API response data  */
    const optionItems = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}/>);

    /* Finally the return statement where the JSX body contains the array of child react components */
    return (<Row>{optionItems}</Row>);     // Note: we are using <Row> which comes from react-bootstrap to render Grid row
}