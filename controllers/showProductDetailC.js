var path = require('path');
var scriptName = path.basename(__filename);

const vwProductDetailM = require('../models/vw-productDetailM');

const vwCartM = require('../models/vw-cartM');


exports.getProductDetail = (req, res, next)=>{

    console.log(scriptName + ' -------- '  + 'getProductDetail'); //non-static: this.constructor.name

    // console.log(req.params.productSortId); // /product-details/:productSortId?

    const psId = req.params.productSortId;

    let productDetails;
    let test;
    vwProductDetailM.vwProductDAO.findById(psId)
    .then(([rows, fieldData]) => {

        productDetails = rows;
        //@@@777 因為適用psId, 所以回傳會有多筆
        console.log(productDetails); //
        // console.log( (typeof rows[1]) );



        res.json(rows);

        // const jsonRst = JSON.stringify(rows);// 不必自己轉, res.json(&send) 會自轉
        // console.log(jsonRst);

        // res.end();

        // const productDetail = rows[0]; //取第一筆

        //for 取 arrColor & arrPId


        // 先移到最下面再render
        // res.render('product/product-detail', {
        //     productDetails: productDetails, //@@@多筆 取第一筆
        //     // arrColor: '',
        //     pageTitle: "product-detail",
        //     path: "/"
        // });

        return vwProductDetailM.vwProductDAO.findById(5);
    })
    .then(([rows, fieldData])=>{

        console.log('-----------------------');
        test = rows;
        console.log(test);


        // res.render('product/product-detail', {
        //     productDetails: test, //@@@多筆 取第一筆
        //     // arrColor: '',
        //     pageTitle: "product-detail",
        //     path: "/"
        // });

        res.json(rows);
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.addProductToCart = (req, res, next)=>{
    console.log(scriptName + ' -------- '  + 'addProductToCart'); //non-static: this.constructor.name


}



exports.getProductSorts = (req, res, next)=>{

    console.log(scriptName + ' -------- '  + 'getProductSorts'); //non-static: this.constructor.name

    ProductSort.fetchAll()
    .then(([rows, fieldData]) => {

        // console.log(rows);
        // console.log( (typeof rows[1]) );
        // const jsonRst = JSON.stringify(rows);// 不必自己轉, res.json(&send) 會自轉
        // console.log(jsonRst);

        // res.end();
        res.render('product/product-sorts', {
            productSorts: rows,
            pageTitle: "index",
            path: "/"
        });

    })
    .catch((err) => {
        console.log(err);
    });
}

exports.getProductSortById = (req, res, next) => {
    console.log(scriptName + ' -------- '  + 'getProductSortById');

    const psId = req.params.productSortId;
    console.log(psId);

    ProductSort.findByID(psId)
    .then(([rst]) => {

        // console.log(productSort[0]);



        res.json(rst[0]);
    })
    .catch((err) => {
        console.log(err);
    });
};


//besides id
exports.getProductSortsByConditions = (req, res, next) => {
    console.log(scriptName + ' -------- '  + 'getProductSortsByConditions');


};


exports.addItemToCart = (req, res, next) => { //post & put
    const memId = req.params.memberId;
    console.log(memId);

    let jsonData = req.body;
    console.log(req.body);

    const jsonTestData = {
        memberId: "1",
        productId: "2",
        amount: 2
    }

    vwCartM.vwCartDAO.addItemToCart(jsonTestData)
    .then(([rows, fieldData]) => {

        // const cart = rows;
        // console.log(rows);

        //TODO: 通知回上一頁
        console.log("新增成功");
        res.json(jsonTestData);
    })
    .catch(err => {
        console.log(err);
    });
}