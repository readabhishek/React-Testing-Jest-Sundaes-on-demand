
/* These set of tests are designed to test the API failure Scenario. Or to verify that after API failure happens, the corresponding
*  error message is displayed in the UI (using <AlertBanner/> component).
*  Note: Couple of things to remember here:
*  1) Server Reset Handler : It's done in order to update the handler temporarily so that the API returns failure response.
*  2) After Handlers are updated, the component is rendered, which calls the APIs internally (The component calls API to get data).
*  3) Since the API is intercepted by the current handler, a failure response is sent back.
*  4) <Imp>: The API call happens in async manner, so our call back function is async in test().
*  5) We are using 'await' and 'waitFor' and 'async' just to make sure the test runner stops and waits until the API call finishes
*     and Alert label is set in the component.
*  6) Note: We are using 'findAllByRole' here with 'await' which is the best way to deal with multiple async data/operation.
*  7) We are also using 'alert' in 'screen.findAllByRole()' because the Alert component/label can be searched by 'alert' role as per
*     react-bootstrap documentation. If we have our own custom label/field we can use the right role instead.
*/


import {render, screen, waitFor} from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import {rest} from 'msw';
import {server} from '../../../mocks/server';


/* 'only' keyword is used temporarily as debugging tool to limit the testing only to this and ignore rest all test    */
test.only('handles error for scoops and toppings routes', async () => {

    server.resetHandlers(         // 1) It's done in order to update the handler temporarily so that the API returns failure response.
        rest.get('http://localhost:3030/scoops', (req, res, context) => {
            res(context.status(500))
        }),
        rest.get('http://localhost:3030/toppings', (req, res, context) => {
            res(context.status(500))
        })
    );


    render(<OrderEntry />);  // 2) After Handlers are updated, the component is rendered, which calls the APIs internally (The component calls API to get data).

    /*const alerts = await screen.findAllByRole('alert'); // These will not work due to async operation
    expect(alerts).toHaveLength(2);*/

    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert');
        expect(alerts).toHaveLength(2);
    });

})

test.skip('Just for demo, not a real test', () => {}) // test.skip is used temporarily as debugging tool to skip this test
test('Just for demo, not a real test 2', () => {})