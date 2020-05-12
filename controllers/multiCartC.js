var path = require('path');
var scriptName = path.basename(__filename);

const cartM = require('../models/cartM');
const vwCartM = require('../models/vw-cartM');
const orderM = require('../models/orderM');
const orderDetailM = require('../models/orderDetailM');


exports.getCartById = (req, res, next) => {

    console.log(scriptName + ' -------- '  + 'getCartById'); //non-static: this.constructor.name

    const memId = req.params.memberId;
    console.log(memId);

    vwCartM.vwCartDAO.findById(memId)
    .then(([rows, fieldData]) => {

        // const cart = rows;
        // console.log(rows);

        // res.render('cart/cart', {
        //     cartItems: rows, //@@@多筆 取第一筆
        //     pageTitle: "my cart",
        //     path: "/"
        // });

        res.json(rows);
    });
}



exports.addCartsToOrder = (req, res, next) =>  {

    const jsonReqData = req.body;

    console.log(jsonReqData);


    // return res.json(jsonReqData); //@@@TODO: 要加 return

    let insertOrderId=0; // insert orderDetail 用
    //資料外面會準備好
    orderM.OrderDAO.addCartsToOrder(jsonReqData)
    .then((insertId)=>{
        // console.log(aaa);
        insertOrderId = insertId;

        console.log("====== " + insertOrderId)
        //TODO: 移到Order後 Cart 要清空

        // console.log("新增 orderDetail ===  ", rows);


        return orderDetailM.OrderDetailDAO.addOrderDetailsById(insertOrderId, jsonReqData.orderDetail);

    })
    .then(([rows, fieldData]) => {

        console.log("orderDetail 新增成功 ----   ", rows);
        console.log("移除carts from member ----***   ", jsonReqData.order.memberId);

        return cartM.CartDAO.removeCartsAfterAddedToOrderByMemberId(jsonReqData.order.memberId); //TODO: memId        
    })
    .then(([rows, fieldData]) => {

        return res.json({insertOrderId:insertOrderId});
    })
    .catch((err)=>{
        console.log(err);
    });
}


// exports.addCartsToOrder = (req, res, next) =>  {

//     const jsonReqData = req.body;

//     const jsonTestData = {
//         carts:[
//             {},
//             {}
//         ],
//         // memberId: "1",
//         // productId: "2",
//         // amount: 2
//     }



//     let insertOrderId=0; // insert orderDetail 用
//     //資料外面會準備好
//     orderM.OrderDAO.addCartsToOrder('')
//     .then((aaa)=>{
//         // console.log(aaa);
//         insertOrderId = aaa;

//         console.log("====== " + insertOrderId)
//         //TODO: 移到Order後 Cart 要清空


//         // res.json(aaa);
//         // res.json(res);

//         return vwCartM.vwCartDAO.findById('2'); //FIXME: 這層拿掉 改真實資料 , 有MemId 直接抓他的 Cart

//     })
//     .then(([rows, fieldData]) => {


//         let arrTestData = [];
//         res.json(rows);
//         for(let row of rows){
//             let orderDetail={};

//             orderDetail.oid = insertOrderId;

//             orderDetail.pid = row.productId;
//             orderDetail.originalPrice = row.unitPrice;
//             orderDetail.originalDiscount = 0;
//             orderDetail.discountPrice = orderDetail.originalPrice - orderDetail.originalDiscount;
//             orderDetail.quantity = row.amount;
//             orderDetail.discountId = "null";

//             arrTestData.push(orderDetail);
//         }

//         return orderDetailM.OrderDetailDAO.addOrderDetailsById(insertOrderId, arrTestData);
//     })
//     .then(([rows, fieldData]) => {

//         console.log("gggjgjjge ----  ", rows);
//         return cartM.CartDAO.removeCartsAfterAddedToOrderByMemberId("1"); //TODO: memId
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

    


// }








//TODO: 沒用到 (移到 PSC) --------------------------
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

//change amount
exports.putCartById = (req, res, next) => {


    const memId = req.params.memberId;
    console.log(memId);

    let jsonData = req.body;
    console.log(req.body);

    res.send('111');
}
