import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';



describe("Test check-box and Button Enablement on checking the check-box", () => {

    /* 1. Default Scenario */
    test("Default Behavior: Check-Box is unchecked and Button is Disabled", () => {
        render(<SummaryForm />);
        const consentCheckBox = screen.getByRole("checkbox", {name: 'I agree to Terms and Conditions'});
        const submitButton = screen.getByRole('button', {name: /Confirm order/i});  // using regular expression
        expect(consentCheckBox).not.toBeChecked();
        expect(submitButton).toBeDisabled();
    })


    /* 2. Fire Event - Check the check-box - Button should be enabled */
    test("Check Box is checked and Button is Enabled", () => {
        render(<SummaryForm />);
        const consentCheckBox = screen.getByRole("checkbox", {name: /I agree to Terms and Conditions/i});
        const submitButton = screen.getByRole('button', {name: /Confirm order/i});

        userEvent.click(consentCheckBox);  // Note: We are using userEvent instead of fireEvents. This is better recommended.

        expect(consentCheckBox).toBeChecked();
        expect(submitButton).toBeEnabled();
    })


    /* 3. Fire Event Again - UnCheck the check-box and see if button is disabled */
    test("Check box un-checked and Button disabled", () => {
        render(<SummaryForm />);
        const consentCheckBox = screen.getByRole("checkbox", {name: 'I agree to Terms and Conditions'});
        const submitButton = screen.getByRole('button', {name: 'Confirm order'});

        /* Note: We are firing the event twice. Because after render, consentCheckBox is unchecked by default. So we check it first
        * then uncheck it, so test the effect on button. We can combine this test with scenario 2. (previous test) as well  */
        userEvent.click(consentCheckBox);
        userEvent.click(consentCheckBox);

        expect(consentCheckBox).not.toBeChecked();
        expect(submitButton).toBeDisabled();
    })



    /* 4. Test the Pop-up when we hover over the check box label
          Note: We are using async keyword here in the callback anonymous function, because we'll be using await inside it */

    test("the Pop-up appearing and disappearing", async () => {
        render(<SummaryForm/>);

        /* Scenario-1: Default: Pop-up is not there in the DOM */

        /* Remember, the Pop-up is not hidden but not available in DOM itself. There is difference between hidden and not there */
        /* So we use queryBy, which returns null if the element is not available. */
        const nullPopOver = screen.queryByText(/no ice cream will actually be delivered/i);
        expect(nullPopOver).not.toBeInTheDocument();

        /* Scenario-2: Mouse hover on text: Pop-up appears once hover over the check box text   */
        const termsAndCondition = screen.getByText(/terms and conditions/i);
        userEvent.hover(termsAndCondition);
        const popOver = screen.getByText(/no ice cream will actually be delivered/i);
        expect(popOver).toBeInTheDocument();

        /* Scenario-3: When Mouse is away/or un-hover event: Pop-up should disappear  */
        userEvent.unhover(termsAndCondition);

        /* Popover disappearance is a async operation and hence we use async and await for this. The callback function is
        *  already made async and we are using await keyword with assertion function - waitForElementToBeRemoved
        *  This whole thing under - waitForElementToBeRemoved is assertion in itself, which checks if the element has disappeared.
        *  so we don't need to do - expect(PopOver).not.toBeInTheDocument()   in this case       */
        await waitForElementToBeRemoved(() => {
            return screen.queryByText(/no ice cream will actually be delivered/i);
        });



    })

})