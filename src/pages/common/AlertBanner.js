
/*  This component is used to display errors and is returned by Parent/Calling component in API failure scenario  */
import Alert from 'react-bootstrap/Alert';

export default  function AlertBanner({message, variant}) {
    const alertMessage = message || "An unexpected error occurred. Please try again later.";
    const alertVariant = variant || "danger";

    return (<Alert variant={variant} style={{backgroundColor: 'red'}}>{alertMessage}</Alert> );
}