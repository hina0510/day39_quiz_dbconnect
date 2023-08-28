const oracledb = require("oracledb");
const dbconfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;

const ser = require("../../service/member/member_service");

const register= async(req, res)=>{
    console.log("register : ",req.body);
    const msg = await ser.insert(req.body);
    res.send(msg);
}
const registerForm=(req, res)=>{
    res.render("member/register_form");
}
const login=(req, res)=>{
    res.render("member/login");
}
const loginCheck=async(req, res)=>{
    console.log("query", req.query);
    console.log("params", req.params);
    console.log("body", req.body);
    console.log("=== login check===");
    console.log(req.body.id);
    console.log(req.body.pwd);
    const member = await ser.getMember(req.body);
    console.log("ctrl",member.ID);
    console.log("ctrl",member.PWD);
    //console.log("ctrl",member.NAME);
    //console.log("ctrl",member.ADDR);
    if(member.ID===req.body.id){
        if(member.PWD===req.body.pwd){
            req.session.id2 = member.ID;
            req.session.name = member.NAME;
            console.log("session",req.session.id2);
            console.log("session",req.session.name);
            const msg = `<script>
            alert("${req.session.name}님 환영합니다");location.href="/member/list";
            </script>`;
            res.send(msg);
            //return res.redirect("/session/success", {name:req.session.name});
        }else{
            const msg = `<script>
            alert("비밀번호가 틀렸습니다");location.href="/member/login";
            </script>`;
            res.send(msg);
        }
    }else{
        const msg = `<script>
        alert("존재하지 않는 아이디입니다");location.href="/member/login";
        </script>`;
        res.send(msg);
    }
}
const success = (req, res)=>{
    console.log(req.session.id2);
    if(req.session.id2)
        return res.render("/default/header", {name:req.session.name});
}
const list=async(req, res)=>{
    const list = await ser.getList();
    console.log("controller list : ", list);
    res.render("member/list", {list});
}
const logout = (req, res)=>{
    req.session.destroy(()=>{
        console.log("모든 세션을 만료합니다");
    });
    res.redirect("/member/login");
}
const logCheck = (req, res) =>{
    const result =service.logCheck(req.body.id, req.body.name);
    console.log(result);
    if (result === 0){
        res.redirect("/member/login");
    }res.redirect("/member/list");
}
const info = async(req,res) => {
    console.log("memberView ctrl : ",req.query);
    const member = await ser.infoMember(req.query);
    console.log("controller info : ", member);
    //res.send("memberview");
    res.render("member/info", {member:member});
}

module.exports = { register, registerForm, login, loginCheck, list, logout, logCheck, info};