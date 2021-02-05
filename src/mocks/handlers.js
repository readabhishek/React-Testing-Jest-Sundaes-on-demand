
/* This is Mock Service Worker Handler. This is used to mock the APIs specified. It basically handles the API call,
*  Note that the list of API path/port/route is given and the mocked response JSON is specified. So whenever the Webpage/UI
*  makes any of these API  calls, the MSW intercepts it and passes the control to this handler to handle each of those APIs  */


import {rest} from 'msw';


export const handlers = [
    /* Masking the response for scoops API. Note the below URL, it can be full path or just partial  */
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(
            ctx.json([
                {name: 'Chocolate', imagePath: '/images/chocolate.png'},
                {name: 'Vanilla', imagePath: '/images/vanilla.png'}
            ])
        );
    }),

    /* Masking the response for toppings API. Note the below URL, it can be full path or just partial  */
    rest.get('http://localhost:3030/toppings', (req, res, context) => {
        return res(
            context.json(
                [
                    { name: 'Cherries', imagePath: '/images/cherries.png' },
                    { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
                    { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' }
                ]
            )
        );
    }),

    /* Masking the response for order API. Note the below URL, it can be full path or just partial  */
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
        return res(ctx.json({ orderNumber: 123455676 }));
    }),
];