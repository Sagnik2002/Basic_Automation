const puppeteer = require('puppeteer'); //Importing the puppeteer library
//Defining the async function and executing it
(async () => {

    // Launching the headful browser, by setting headless as false, and browser will use the default viewport size
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null
     });
    //Opening the browser and firing up a new page
    const page = await browser.newPage();

    // Navigating to the website: swap.defillama website
    await page.goto('https://swap.defillama.com');

    // A Custom  Delay function,  ms->milliseconds
    function delay(ms) {
    return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

    // From here performing the actions on the website, i.e. automating the website

    // Selecting the chain field
    await page.click('.css-1wy0on6');  //Clicking on the dropdown button of the chain field, '.css-1wy0on6' is the class name of the dropdown button  
    await page.click('#react-select-2-option-4'); // CLicking on the Arbitrum One option in the dropdown
    await delay(500);  //Adding a delay of 500ms so that it immediately doesn't click on the next field, and there is a proper delay so that the user can see the changes taking place and everything doesn't takes place in a flash

    // Filling in the You Sell Field
    const youSellInput = await page.$('.chakra-input');// Retrieves the first element on the page that matches the CSS selector .chakra-input and assigns it to the variable youSellInput.
    await youSellInput.click({ clickCount: 3 }); //selecting the entire content of the input field, i.e. the existing value
    await youSellInput.press('Backspace'); // Deleting the existing value
    await youSellInput.type("12"); // Typing the new value in the input field which is 12
    await delay(500);  //Adding a delay of 500ms so that it immediately doesn't click on the next field, and there is a proper delay so that the user can see the changes taking place and everything doesn't takes place in a flash


    // Selecting Token Field from the dropdown present in the You Sell section 
    await page.click('div:nth-of-type(1) > .css-1k491an > .chakra-button.css-qjhap > .chakra-text.css-sys4p8'); //Preforms a click action on the given CSS selector
    const youSellTokenDropdown = await page.$('.chakra-input.css-s1d1f4'); //Retrieves the element of the selector and assigns it to the variable youSellTokenDropdown
    await youSellTokenDropdown.type('Wrapped BTC'); //Types the given value(Wrapped BTC) in the input field
    await delay(500);  //Adding a delay of 500ms so that it immediately doesn't click on the Wrapped BTC field, and there is a proper delay so that the user can see the changes taking place and everything doesn't takes place in a flash
    await page.click('div:nth-of-type(1) > .cjxQGj.sc-b49748d5-3', ); //Clicks on the appropriate option in the dropdown

    // Select Token Field in the You Buy section 
    await page.click('div:nth-of-type(2) > .css-1k491an > .chakra-button.css-qjhap > .chakra-text.css-sys4p8');
    const youBuyTokenDropdown = await page.$('.chakra-input.css-s1d1f4');//Retrieves the element of the selector and assigns it to the variable youBuyTokenDropdown
    await youBuyTokenDropdown.type('USDC');//Types the given value(USDC) in the input field
    await delay(500);  //Adding a delay of 500ms so that it immediately doesn't click on the USDC field, and there is a proper delay so that the user can see the changes taking place and everything doesn't takes place in a flash
    await page.click('div:nth-of-type(2) > .cjxQGj.sc-b49748d5-3  .chakra-text.css-72rvq0');//Clicks on the appropriate option in the dropdown

    // To select the second route when the routes appear after filling in the fields
    await page.waitForSelector('.sc-bb167634-2.cObIGF > div:nth-of-type(4)'); //Waits for the selector to appear on the page
    //Updating the route for 5(random number) times, so that it always clicks on the second option in the route section otherwise it may happen that when the routes are updated the second option which was selected previously may not be the second option anymore
    for (let i = 0; i < 5; i++)
    { 
        await delay(5000);  //Adding a delay of 5000ms so that it immediately doesn't click on the next field, and there is a proper delay so that the user can see the changes taking place and everything doesn't takes place in a flash
        await page.click('.sc-bb167634-2.cObIGF > div:nth-of-type(4)');//Clicks on the second option in the route section
    }
   
    
    await page.screenshot({ path: 'screenshot.png' }); //Taking a screenshot of the page
  


})();