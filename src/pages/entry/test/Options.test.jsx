
import {render, screen} from '@testing-library/react';
import Options from "../Options";
import ScoopOptions from "../ScoopOptions";

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