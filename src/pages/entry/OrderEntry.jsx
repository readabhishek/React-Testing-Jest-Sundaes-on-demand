import Options from "./Options";

/* Parent Component or Container of Scoops and Toppings child Component. It basically calls <Options> component twice with
*  'scoops' and 'toppings' Props  */
export default function OrderEntry() {

    return (
        <div>
            <Options optionType='scoops'/>
            <Options optionType='toppings'/>
        </div>
    );

}