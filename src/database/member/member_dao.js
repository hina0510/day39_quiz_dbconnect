const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;

const insert =async(body)=>{
    let con = await oracledb.getConnection(dbConfig);
    const sql = `insert into members02(id, pwd, name, addr) values(:id, :pwd, :name, :addr)`;
    let result;
    try{
        result = await con.execute(sql, body);
        console.log("dao insert");
    }catch(err){
        console.log(err);
    }
    return result;
}

const getMember =async(body)=>{
    oracledb.outFormat = oracledb.OBJECT;
    const sql = `select * from members02 where id='${body.id}'`;
    let con = await oracledb.getConnection(dbConfig);
    let member;
    try{
        member = await con.execute(sql);
        //console.log("member",member);
    }catch(err){
        console.log(err);
    }
    return member.rows[0];
}

const getList = async ()=>{
    oracledb.outFormat = oracledb.OBJECT;
    let con = await oracledb.getConnection(dbConfig);
    let result = await con.execute("select * from members02");
    await con.close();
    console.log("dao getList : ",result);
    return result;
}
const infoMember = async (mId)=>{
    const sql = "select * from members02 where id=:id";
    let con = await oracledb.getConnection(dbConfig);
    let member;
    try{
        member = await con.execute(sql, mId);
        console.log("dao infomember : ", member);
    }catch(err){
        console.log(err);
    }
    return member.rows[0];
}
module.exports = {insert, getMember, getList, infoMember};