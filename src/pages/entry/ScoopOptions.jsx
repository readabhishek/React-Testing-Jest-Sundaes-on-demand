
import Col from 'react-bootstrap/Col';

/* Note: the prop passed in the react functional component is an object and we can either destructure it inside the body
*  by using statement (const {name, imagePath} = props.optionType and the function will have argument as 'function ScoopOptions(props)'.
*  But here this is done within the the function argument only using '{name, imagePath}'  */

export default function ScoopOptions({name, imagePath}) {  // Note: We are using functional component and 'name' and 'imagePath' are props
    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}} >
        <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`}/>
        </Col>
    );
}