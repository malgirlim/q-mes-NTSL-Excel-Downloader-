const express = require("express");
const bodyParser = require("body-parser");
// const database = require("./database");
const { sql, pool } = require("../../mssql");

const router = express.Router();
router.use(bodyParser.json());

router.use((req, res, next) => {
  // console.log("middleware for test!");
  next();
});

// 조회
router.get("/", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request().query(
      "exec [QMES].[dbo].[MASTER_USER_READ_SP] '전체',''"
    );
    res.send(JSON.stringify(result.recordset));
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  // res.send("GET 전송완료");
});

router.post("/", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input("key", sql.NVarChar, req.body.key)
      .input("input", sql.NVarChar, req.body.input)
      .query("exec [QMES].[dbo].[MASTER_USER_READ_SP] @key,@input");
    res.send(JSON.stringify(result.recordset));
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  // res.send("GET 전송완료");
});

// 등록
router.post("/insert", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input(
        "이름",
        sql.NVarChar,
        !req.body.data.이름 ? "" : req.body.data.이름
      )
      .input(
        "아이디",
        sql.NVarChar,
        !req.body.data.아이디 ? "" : req.body.data.아이디
      )
      .input(
        "부서",
        sql.NVarChar,
        !req.body.data.부서 ? "" : req.body.data.부서
      )
      .input(
        "연락처",
        sql.NVarChar,
        !req.body.data.연락처 ? "" : req.body.data.연락처
      )
      .input(
        "이메일",
        sql.NVarChar,
        !req.body.data.이메일 ? "" : req.body.data.이메일
      )
      .query(
        "exec [QMES].[dbo].[MASTER_USER_INS_SP] 0,@이름,@아이디,@부서,@연락처,@이메일"
      );
    res.send("등록완료");
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  // res.send("GET 전송완료");
});

// 수정
router.post("/edit", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input("기본키", sql.Int, req.body.data.NO)
      .input("이름", sql.NVarChar, req.body.data.이름)
      .input("아이디", sql.NVarChar, req.body.data.아이디)
      .input("부서", sql.NVarChar, req.body.data.부서)
      .input("연락처", sql.NVarChar, req.body.data.연락처)
      .input("이메일", sql.NVarChar, req.body.data.이메일)
      .query(
        "exec [QMES].[dbo].[MASTER_USER_UDT_SP] @기본키,@이름,@아이디,@부서,@연락처,@이메일"
      );
    res.send("수정완료");
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  // res.send("GET 전송완료");
});

// 삭제
router.post("/delete", async (req, res) => {
  try {
    const Pool = await pool;
    for (var i = 0; i < req.body.data.length; i++) {
      // insert
      await Pool.request()
        .input("key", sql.Int, req.body.data[i])
        .query(`exec [QMES].[dbo].[MASTER_USER_DEL_SP] @key`);
    }
    res.send("삭제완료");
  } catch (err) {
    // console.log(err);
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
