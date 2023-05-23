
# Alif - E-commerce ReactJs and Django App Project

[![Build Status](https://travis-ci.org/adrian80z/e-commerce.svg?branch=master)](https://github.com/harunjeylan/alif_django_react_ecommerce.git)

**Link to live version - [Alif](https://djangoreactecommerce.netlify.app/)**

Alif is a e-commerce web application that allows users to search for 
products stored in database, add them to shopping cart,
add them to wishlist and then make 
payment using Stripe. App has login system functionality. 
The guest user is able to browse, search and add product to cart only. 
Checkout and payment option is available for registerd users.

## UX

The purpose of the the project is to create a e-commerce app for everyone interested in 
shopping online. Layout is simple and clear.
 Project is accesible through all modern browsers on both desktop and mobile devices. 
 For build the front-end functionality ReactJs, TailwindCSS and MUI is used 
 and for back-end logic, Python with Django framework is used. 
 As it's e-commerce app payments options is available by using Chapa API.

#### User Stories

- As a user I want easily search for product - it is achieved by using search bar available on menubar
- As a user I want to find more details about product - after click on selected product user is redirected to page with all details about chosen product
- As a user I want to add product to cart - user is able to add product to cart and select quantity if required (1 is default value)
- As a user I want to add product to wishlist - user is able to add product to wishlist and 
- As a user I want to update / delete items from cart - user is able to update and delete items on cart page
- As a user I want to pay for chosen product - after registration/login user is able to access checkout page


#### Business owner
- As a business owner I want to expand my business and increase sales
  - it is achieved by building online presence
- Track Hight sales products easily on dashboard
- match more 
#### Layout

The layout is simple and consistent through all modern browsers. 
The project has been designed with a mobile first approach and it is fully responsive
across devices. To achieve this MUI components library was used along with custom styles.
Project consist following pages:

- Products(homepage)
  - page where are displayed Top,New and High Reated products in form of card with image and short info about specs and price of each product
- Product Details
  - Page include all details about selected product - image, description, main components summary, price and add to cart button with input field allowing select product quantity, choose different variant like color, size and more, and include releted products
- Cart page / empty cart
  - Page allows to review what is in cart - Image thumbnail is displayed along with product name and possibility for user to change quantity or delete item completely.
    Page include total price for all product placed in cart. Below that there are two buttons, one placed on right hand side and second on the left hand side of the screen allowing user to continue shopping(left button) or go to checkout(right button). When we remove all items cart icon is displayed with short info that cart is empty and user can go back shopping by clicking _Continue Shopping_ button
- Search page / no search results
  - Page displays searching results in form similar to homepage. There is a card with image and short info about specs and price of each product.
    When keyword enter into searchbox isn't match any product, search icon is displayed along with text informing user that product is not found.
- Checkout page (available after user login)
  - Page similar to cart page but the difference is that user can't update any product details. This is summary before payment. Page displays product thumbnail, name, quantity, price and total price. Below that user has payment form to fill in with user details and card details. After payment user is redirected to homepage.
- Login
  - Page allows user to login (user get access to checkout page and payment functionality)
- Registration
  - Page allows user to create an account (user get access to login functionality)
- Profile
  - Page allows user to update an account information like full name, username, address and password
- order list
  - Page allows user to see all order list mede with order Id, number of product, total Price and Data
- order Details
  - Page allows user to see all products of single order with summary of checkout

#### Wireframes
- [Mobile Layout](https://raw.githubusercontent.com/harunjeylan/alif_django_react_ecommerce/main/clainte/public/Screenshot%20from%202023-01-15%2011-38-27.png)
- [Desktop Layaut](https://raw.githubusercontent.com/harunjeylan/alif_django_react_ecommerce/main/clainte/public/Screenshot%20from%202023-01-15%2011-36-11.png)

## Features

The app can be accessible with or without user registration, but in that case some features will be available after registration only (checkout).
Anyone is able to perform search, view results, all details about selected product, add product to cart, view and modify product on cart page.

#### Existing Features

- login/register system - allows user access full app functionality
- logout
- back to top arrow - scrolling to top of page
- flash messages apperars after user login/registration, add/update/delete and purchase product (disappears after 5s)
- user can't access payment page without registration/login
- after adding product to cart small badge with product quantity appears on menubar beside cart icon
- short product info cards on homepage
- function preventing access restricted page(checkout) without registration/login
- gallery image on product details page
- create categories (category model has been created and relation to product exist, but there is no views implemented for categories)
- customers reviews
- search bar - allows user to search product by keyword. Return all products where search keywords appears
- create contact page
- add filters to search option (currently only search by any keyword is available)


#### Features Left to Implement

- Payment integration
- create pagination
- add confirmation email after purchase (currently only flash message appears)

## Main Technologies used

- **[ReactJs](https://reactjs.org/)** - React is a JavaScript library for building user interfaces.
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - The Redux Toolkit package is intended to be the standard way to write Redux logic and  includes a powerful data fetching and caching capability that we've dubbed "RTK Query". It's included in the package as a separate set of entry points.
- **[MUI](https://mui.com/)** - Material UI is a library of React UI components that implements Google's Material Design.
- **[TailwindCSS](https://tailwindcss.com/)** - Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file. It's fast, flexible, and reliable — with zero-runtime.
- **[Django](https://www.djangoproject.com/)** - Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source. 
- **[Django REST framework](https://www.django-rest-framework.org/)** - Django REST framework is a powerful and flexible toolkit for building Web APIs.
- **[Formik](https://formik.org/)** - Formik is a small group of React components and hooks for building forms in React and React Native. It helps with the three most annoying parts: Getting values in and out of form state. Validation and error messages.
- **[Yup](https://www.npmjs.com/package/yup)** - Yup is a JavaScript schema builder for value parsing and validation. Define a schema, transform a value to match, validate the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformations.
- **[Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)** - Simple JWT provides a JSON Web Token authentication backend for the Django REST Framework. 
- **[JWT](https://jwt.io/)** - JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.
- **[Nivo](https://nivo.rocks/)** - nivo provides a rich set of dataviz components, built on top of D3 and React.



- **[GitHub](https://github.com/)** - provides hosting for software development version control using Git.
- **[Git](https://git-scm.com/)** - version-control system for tracking changes in source code during software development.

- **[Google Fonts](https://fonts.google.com/)** - library of free licensed fonts, an interactive web directory for browsing the library, and APIs for conveniently using the fonts via CSS ('Lato' font used in this project).

- **[Python](https://www.python.org/)** - programming language.
- **[JavaScript](https://en.wikipedia.org/wiki/JavaScript)** - used to program the behavior of Web pages.

- **[VS Code](https://code.visualstudio.com/)** - code editor redefined and optimized for building and debugging modern web and cloud applications.
- **[VS Code](https://codesandbox.io/)** - CodeSandbox is a cloud development platform that empowers developers to code, collaborate and ship projects of any size from any device in record time.

## Testing

### Automated testing

For the testing following tools and services was used:

- **[Chrome Developer Tools](https://developers.google.com/web/tools/chrome-devtools)** - a set web authoring and debugging tools built into Google Chrome.
- **[ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)** - Extensions for React, React-Native and Redux in JS/TS with ES7+ syntax. Customizable. Built-in integration with prettier
- **[prettier](https://prettier.io/)** Prettier is an opinionated code formatter
- **[JSLint](https://jslint.com/)** - a static code analysis tool used for checking if JavaScript source code complies with coding rules.
- **[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)** - React Developer Tools is a Chrome DevTools extension for the open-source React JavaScript library. It allows you to inspect the React component hierarchies in the Chrome Developer Tools.
- **[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** - The extension provides power-ups for your Redux development workflow. Apart from Redux, it can be used with any other architectures which handle the state.



### Manual testing

Manual testing was performed by clicking every element on page which can be clicked.


1. Login form page

   - Go to Products(homepage) page
   - Click Log in link on navigation bar (user is redirected to login page)
   - Try to submit empty form and verify that an error message about required fields appear(required field message appears)
   - Try to submit the form with valid input and verify that a success message appears (user is redirected to homepage with successful login message)
   - Try to submit the form with invalid input and verify that a error message appears (_Your username or password is incorrect_ message appears)

2. Registration form page

   - Go to Product(homepage) page
   - Click Log in link on navigation bar (user is redirected to registration page)
   - Click _Create account_ button below the login form
   - Try to submit empty form and verify that an error message about required fields appear (required field message appears)
   - Try to submit the form with valid input and verify that a success message appears (user is redirected to homepage with success message)
   - Try to submit the form with invalid input and verify that a error message appears (_Unable to register your account_ message appears)
   - Click _Sign In_ under _Create account_ button (user is redirected to login page with success message)

4. Add to cart form

   - Go to Product details page
   - Try to submit empty form and verify that an error message about required fields appear (required message appears)
   - Try to submit the form with valid input and verify that a success message appears (_Item added to your cart. View cart_ message appears)
   - Try to submit the form with invalid input and verify that a error message appears.(field has html5 type _number_ attribute and initial default value 1 preventing entering invalid input)

5. Cart form

   - Go to the Cart page
   - Try to submit empty form and verify that an error message about required fields appear (required message appears)
   - Try to submit the form with valid input and verify that a success message appears (_Cart updated_ message appears)
   - Try to submit the form with invalid input and verify that a error message appears (field has html5 type _number_ attribute preventing entering invalid input and also has initial value number of the specific item, which was selected on _add to cart_ page)
   - Click _Trash_ icon - item is deleted from cart (message appears)
   - Click _Shoppig_ button (user is redirected to products page (homepage))
   - Click _Checkout_ button (user is redirected to checkout page)


6. Scrolling up and down all the pages

   - Project was manually tested in all the major browsers including Google Chrome, Safari and Internet Explorer to confirm compatibility. The tests were conducted in virtual mode using the google developer tools and also physical mobile phones such us: Samsung Galaxy Note 9, Htc One S, Samsung A20. App looks consistent and works well on different browsers and screen sizes.

7. Site navigation

   - Click on _Home_ link (redirect to index/homepage)
   - Click on logo/brand link (redirect to index/homepage)
   - Click on _Log in_ link (redirect to login page form)
   - Click on _Register_ link (redirect to registration page form)
   - Click on _Cart_ link (redirect to cart page)
   - Click on _Logout_ link (user is logged out)
   - Click on Back to top arrow icon (page is scrolling up)

   All links are working and pointing to correct place.There are no dead links.

8. Products(homepage)
   - Click on selected product card (user is redirected to chosen product on product details page)
9. will continue
