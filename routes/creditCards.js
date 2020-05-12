
const express = require('express');
const db = require(__dirname + '/../util/db');
const router = express.Router();


router.get('/', (req, res)=>{
  const sql = "SELECT * FROM CreditCards";

  console.log('get creditCard')


  db.query(sql, (error, results, fields)=>{
      if(error){
          console.log(error);
      } else {
          res.json(results);
      }
  });

});

router.post('/add', (req, res)=>{
    console.log("new creditCard");
    const output = {
        success: false,
        error: '',
    };
    // TODO: 應該檢查表單進來的資料

    const sql = "INSERT INTO `CreditCards`(`CreditCardNumber`, `CreditCardSafeCode`, `CreditCardName`, `CreditCardMonth`, `CreditCardYear`, `memberId`) VALUES (?,?,?,?,?,?)";

    db.execute(sql, [
        req.body.creditCardNumber,
        req.body.creditCardSafeCode,
        req.body.creditCardName,
        req.body.creditCardMonth,
        req.body.creditCardYear,
        req.body.memberID,
    ])
        .then(results=>{
            output.results = results;
            if(results.affectedRows===1){
                output.success = true;
            }
            res.json(output);
        })
        .catch(ex=>{
            console.log('ex:', ex);
        })


});

module.exports = router;
