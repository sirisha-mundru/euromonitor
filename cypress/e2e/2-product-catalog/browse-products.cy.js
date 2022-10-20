/// <reference types='cypress'/>

import { LoginAction } from "../../actions/login-action";
import { ProductCatalog } from "../../page-objects/product-catalog";

describe('When browsing the Products catalog', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()

    beforeEach(() => {
        login.withCredentials("standard_user", "secret_sauce")
    });

    describe('All the six products should be displayed', () => {
        it('should show titles for 6 products', () => {
            productCatalog.productNames().should('have.length', 6)
        });
    }); 

    describe('The customer should be able to add any item to the cart', () => {
        it('Each product should have an ADD TO CART button', () => {
            productCatalog.addToCartButtons().should('have.length', 6)
        }); 

        it('Adding an item to the cart should update the Cart count', () => {
            
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')

            productCatalog.shoppingCartBadge().should('contain.text','1')
            productCatalog.addToCartButtons().should('have.length',5)
            productCatalog.removeFromCartButtons().should('have.length',1)
        });

        it('Adding multiple items to the cart', () => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bike Light')

            productCatalog.shoppingCartBadge().should('contain.text','2')
        });

        it('Adding multiple items to the cart then removing one', () => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bike Light')

            productCatalog.removeItemFromCartCalled('Sauce Labs Backpack')

            productCatalog.shoppingCartBadge().should('contain.text','1')
            productCatalog.addToCartButtons().should('have.length',5)
            productCatalog.removeFromCartButtons().should('have.length',1)
        });
    });

});

