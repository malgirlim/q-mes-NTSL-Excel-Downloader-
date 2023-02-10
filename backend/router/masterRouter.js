const express = require("express");
const router = express.Router();

const masterProductRouter = require("./master/masterProduct");
const masterClientRouter = require("./master/masterClient");
const masterBadRouter = require("./master/masterBad");
const masterUserRouter = require("./master/masterUser");
const masterProcessRouter = require("./master/masterProcess");
const masterLocationRouter = require("./master/masterLocation");
const masterBomRouter = require("./master/masterBom");

router.use((req, res, next) => {
  // console.log("middleware for test!");
  next();
});

// 기준정보 / 사용자 등록 - router/master/masterUser.js
router.use("/user", masterUserRouter);
// 기준정보 / 품목 등록 - router/master/masterProduct.js
router.use("/product", masterProductRouter);
// 기준정보 / 거래처 등록 - router/master/masterProduct.js
router.use("/client", masterClientRouter);
// 기준정보 / 불량내용 등록 - router/master/masterBad.js
router.use("/bad", masterBadRouter);
// 기준정보 / 공정 등록 - router/master/masterProcess.js
router.use("/process", masterProcessRouter);
// 기준정보 / 원자재 위치 등록 - router/master/masterLocation.js
router.use("/location", masterLocationRouter);
// 기준정보 / BOM 등록 - router/master/masterBom.js
router.use("/bom", masterBomRouter);

module.exports = router;
