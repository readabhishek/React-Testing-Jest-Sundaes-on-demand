import {useState} from 'react';
import {Popover, OverlayTrigger, Button} from 'react-bootstrap'

const SummaryForm = function() {

    const [consent, setConsent] = useState(false);

    /*useEffect(() => {
        if (consent === false) console.log("Consent is: ", "false");
    }, [consent]);*/

    const submitAction = () => {
        /* Do nothing */
    }


    const CheckBoxClicked = () => {
        document.getElementById("test1").innerHTML="Hello";
    }

    /* Creating a Popover using React-Bootstrap */
    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>No ice cream will actually be delivered</Popover.Content>
        </Popover>
    );

    /* Creating a label where we have Popover, and later we'll use this in return function.
       This way it's easier and return looks less messy */
    const checkBoxLabel = (
        <label className="summary-checkbox-label" htmlFor="consent-chk-bx1">
            <OverlayTrigger placement="right" overlay={popover}>
                <span style={{color: 'blue'}}>I agree to Terms and Conditions</span>
            </OverlayTrigger>
        </label>
    );




    return(
        <div>
            <div id="test1"></div>
            <input type="checkbox" id="consent-chk-bx1" name="user consent" value="false"
                   onChange={(e) => {e.target.checked ? setConsent(true) : setConsent(false)}}/>
            {/*<label className="summary-checkbox-label" htmlFor="consent-chk-bx1">I agree to Terms and Conditions</label>*/}
            {checkBoxLabel}
            <div><button id="summary-submit" className="summary-button" disabled={!consent} onClick={submitAction}>Confirm order</button></div>
        </div>
    );
}

export default SummaryForm;