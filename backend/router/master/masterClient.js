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
      "exec [QMES].[dbo].[MASTER_ACCOUNT_READ_SP] '전체',''"
    );
    res.send(JSON.stringify(result.recordset));
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input("key", sql.NVarChar, req.body.key)
      .input("input", sql.NVarChar, req.body.input)
      .query("exec [QMES].[dbo].[MASTER_ACCOUNT_READ_SP] @key,@input");
    res.send(JSON.stringify(result.recordset));
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// 등록
router.post("/insert", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input(
        "거래처명",
        sql.NVarChar,
        !req.body.data.거래처명 ? "" : req.body.data.거래처명
      )
      .input(
        "사업자번호",
        sql.NVarChar,
        !req.body.data.사업자번호 ? "" : req.body.data.사업자번호
      )
      .input(
        "주소",
        sql.NVarChar,
        !req.body.data.주소 ? "" : req.body.data.주소
      )
      .input(
        "연락처",
        sql.NVarChar,
        !req.body.data.연락처 ? "" : req.body.data.연락처
      )
      .input(
        "대표자",
        sql.NVarChar,
        !req.body.data.대표자 ? "" : req.body.data.대표자
      )
      .input(
        "비고",
        sql.NVarChar,
        !req.body.data.비고 ? "" : req.body.data.비고
      )
      .input(
        "이메일",
        sql.NVarChar,
        !req.body.data.이메일 ? "" : req.body.data.이메일
      )
      .query(
        "exec [QMES].[dbo].[MASTER_ACCOUNT_INS_SP] 0,@거래처명,@사업자번호,@주소,@연락처,@대표자,@비고,@이메일"
      );
    res.send("등록완료");
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// 수정
router.post("/edit", async (req, res) => {
  try {
    const Pool = await pool;
    // select
    const result = await Pool.request()
      .input("기본키", sql.Int, req.body.data.NO)
      .input("거래처명", sql.NVarChar, req.body.data.거래처명)
      .input("대표자", sql.NVarChar, req.body.data.대표자)
      .input("사업자번호", sql.NVarChar, req.body.data.사업자번호)
      .input("연락처", sql.NVarChar, req.body.data.연락처)
      .input("이메일", sql.NVarChar, req.body.data.이메일)
      .input("주소", sql.NVarChar, req.body.data.주소)
      .input("비고", sql.NVarChar, req.body.data.비고)
      .query(
        "exec [QMES].[dbo].[MASTER_ACCOUNT_UDT_SP] @기본키,@거래처명,@대표자,@사업자번호,@연락처,@이메일,@주소,@비고"
      );
    res.send("수정완료");
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// 삭제
router.post("/delete", async (req, res) => {
  try {
    const Pool = await pool;
    for (var i = 0; i < req.body.data.length; i++) {
      // insert
      await Pool.request()
        .input("key", sql.Int, req.body.data[i])
        .query(`exec [QMES].[dbo].[MASTER_ACCOUNT_DEL_SP] @key`);
    }
    res.send("삭제완료");
  } catch (err) {
    // console.log(err);
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
