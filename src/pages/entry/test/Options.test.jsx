
import {render, screen} from '@testing-library/react';
import Options from "../Options";
import ScoopOptions from "../ScoopOptions";

/* 1. Test for scoops component  */
/* Note: the function is async since we are using await to get the images (async operation) */
test('displays image for each scoop option from the server', async() => {
    render(<Options optionType="scoops"/>);

    /* Find images  */
    //const scoopImages  = screen.getAllByRole('img', {name: /scoop$/i});
    const scoopImages  = await screen.findAllByRole('img', {name: /scoop$/i});  // Note: we are using await and findBy for async
    expect(scoopImages).toHaveLength(2);          // There are two images Chocolate and Vanilla, so scoopImages will return 2 elements.

    /* Confirm alt-text of the images  */
    const altText = scoopImages.map((value) => value.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);   // Arrays and Objects should use Equal matchers
})



/* 2. Test for toppings component  */
test("Testing the Toppings component by mocking the API that sends the Toppings data", async () => {
    render(<Options optionType="toppings"/>);  // Note we are passing a different props than first test

    /* Find Images  */
    const toppingsImage = await screen.findAllByRole('img', {name: /topping$/i}); // Note: we are using await and findBy for async
    expect(toppingsImage).toHaveLength(3);  // There are 3 toppings (Cherries, M&Ms, Hot fudge), so scoopImages will return 3 elements.

    /* Confirm alt-text of the images  */
    const altText = toppingsImage.map(value => {return value.alt});
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);  // Arrays and Objects should use Equal matchers
})