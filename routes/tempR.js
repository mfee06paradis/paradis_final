const path = require('path');

const express = require('express');

const updateOrderC = require('../controllers/checkoutAndUpdateC');
const productC = require('../controllers/filterProductSortC');
const multiCartC = require('../controllers/multiCartC');
const showPdC = require('../controllers/showProductDetailC');
const productSortC = require('../controllers/productSortC');
const productDetailC = require('../controllers/productDetailC');
const cartC = require('../controllers/cartC');
const checkoutC = require('../controllers/checkoutC');

const orderM = require('../models/orderM');

const router = express.Router();

// const bodyParser = require('body-parser');
// router.use(bodyParser.json()); //TODO: 放這裡沒問題嗎



router.get('/product/:productId', productDetailC.getProductDetail);
router.get('/product/', productC.getProductSortsWithPrices);

router.get('/productWithColor/:color', showPdC.getProductSortById);
router.get('/productList/:productId', showPdC.getProductDetail);


router.get('/product-sorts/all', productSortC.getProductSorts);   
// router.get('/product-sorts/:productSortId', productSortC.getProductSortById);//@@@888 不能 optional, 會吃掉下面

//?category = 1 & price = asc/desc & time = asc/desc
router.get('/product-sorts', productSortC.getProductSortsByConditions);   



router.get('/product-detail/:productSortId', productDetailC.getProductDetail);   
// router.get('/product-detail/', productDetailC.getProductDetail);

//TODO: /product-details/:productSortId? 測試query string 寫法
// router.get('/test', productDetailC.getProductDetail);


//TODO: post 前後未連線
router.post('/cart/:memberId?', productDetailC.addItemToCart); 
router.get('/cart/:memberId?', cartC.getCartById); 
// router.put('/cart/:memberId?', cartC.putCartById);


router.put('/mem/:memberId?', multiCartC.putCartById);
router.post('/mem/:memberId?/order/', multiCartC.addItemToCart);
router.get('/mem/:memberId?/order/', multiCartC.getCartById);
//TODO:
router.post('/user/:memberId?/order/:orderId?', cartC.addCartsToOrder);  

//前端要拿到Id, 兜完資料在一起送回後端
router.get('/user/:memberId?/order/?', checkoutC.getUnpaidOrder); //TODO: 目前寫死, qStr => ?state=2
// router.get('/user/:memberId?/order/', ); //TODO:
// router.get('/order/:memberId/?state=2', checkoutC.getUnpaidOrderByMemberId);
router.put('/order/:orderId', checkoutC.updateUnpaidOrder); 
router.put('/mem/:memId/:orderId', updateOrderC.updateUnpaidOrder);


//TODO:
// router.get('/order/:memberId?', cartC.ge);


// router.get('/', productSortC.getProductSortsWithPrices);
// router.post('/', productSortC.getProductSortsWithPrices);

module.exports = router;