/// <reference types='cypress'/>

import { LoginAction } from "../../actions/login-action";
import { ProductCatalog } from "../../page-objects/product-catalog";
import { ShoppingCart } from "../../page-objects/shopping-cart";

describe('When adding items in the cart', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()
    const shoppingCart = new ShoppingCart()

    beforeEach(() => {
        login.withCredentials("standard_user", "secret_sauce")
    });

    describe('Adding a single item', () => {

        beforeEach( () => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            shoppingCart.open()
        });

        it('Should display the name of the item in the Cart', () => {

            shoppingCart.items()
                .should('have.length', 1)
                .eq(0)
                .should('contain.text','Sauce Labs Backpack')
        })  
        
        it ('Should display the price', () => {
            shoppingCart.itemPrice('Sauce Labs Backpack').should('contain.text', '$29.99')
        })

        it ('Should display the description', () => {
            shoppingCart.itemDescription('Sauce Labs Backpack').should('contain.text', 'carry.allTheThings()')
        })

        it ('Should display the quantity', () => {
            shoppingCart.itemQuantity('Sauce Labs Backpack').should('contain.text', '1')
        })
    })

    describe('Adding multiple items', () => {
        it('Should show the details of the item in the Cart', () => {

            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bolt T-Shirt')

            shoppingCart.open()

            shoppingCart.items().should('have.length', 2)

            shoppingCart.items().eq(0).should('contain.text','Sauce Labs Backpack')
            shoppingCart.items().eq(1).should('contain.text','Bolt T-Shirt')

            })
    })

    describe('Removing items from the cart', () => {
        beforeEach( () => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bolt T-Shirt')

            shoppingCart.open()
        });

        it('Item should be removed from the cart list', () => {

            shoppingCart.removeButtonFor('Sauce Labs Backpack').click()

            shoppingCart.items()
                        .should('have.length', 1)
                        .eq(0)
                        .should('contain.text','Sauce Labs Bolt T-Shirt')
            })
    })

})