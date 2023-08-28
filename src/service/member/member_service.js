const memberDAO = require("../../database/member/member_dao");
const insert =async(body)=>{
    const result = await memberDAO.insert(body);
    console.log("service insert => ", result);
    let msg="", url="";
    if(result==0){
        msg="문제 발생";
        url="/member/register_form";
    }else{
        msg="등록 성공";
        url="index";
    }
    const msgPack = getMassage(msg, url);
    return msgPack;
}
const getMember = (body)=>{
    console.log("service getMember");
    //console.log(memberDAO.getMember(body));
    return memberDAO.getMember(body);
}
const infoMember = (mId) => {
    console.log("service => ", memberDAO.getMember(mId));
    return memberDAO.infoMember(mId);
}
const getList = async ()=>{
    const result = await memberDAO.getList();
    console.log("service getList : ",result);
    return result.rows; 
}
const logCheck = (id, name) =>{
    const mem = list.filter(v=>
        v.id===id && v.name===name);
        if(mem.length != 0)
            return 0;
        return 1;
}
module.exports = {insert, getMember, getList, logCheck, infoMember};