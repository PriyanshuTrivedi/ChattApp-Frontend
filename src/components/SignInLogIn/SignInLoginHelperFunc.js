const setAllEmpty=()=>{
    // document.getElementById('userNameLogin').value='';
    document.getElementById('userPasswordLogin').value='';
    document.getElementById('userEmailLogin').value='';
    document.getElementById('userNameReg').value='';
    document.getElementById('userEmailReg').value='';
    document.getElementById('userPasswordReg').value='';
    document.getElementById('userPasswordComfirmReg').value='';
}
const handleLoginAreaStyle=()=>{
    const loginHeadr=document.getElementById('login');
    const regHeadr=document.getElementById('register');
    const loginBox=document.getElementById('loginBox');
    const regBox=document.getElementById('regBox');
    loginHeadr.style.backgroundColor='black';
    loginHeadr.style.color='white';
    loginHeadr.style.fontWeight='bold';
    regHeadr.style.backgroundColor='white';
    regHeadr.style.color='black';
    regHeadr.style.fontWeight='lighter';
    loginBox.style.zIndex=1;
    loginBox.style.visibility='visible';
    regBox.style.zIndex=-1;
    regBox.style.visibility='hidden';
    document.getElementById('loginMsg').textContent='';
    document.getElementById('registerMsg').textContent='';
}
const handleRegAreaStyle=()=>{
    const loginHeadr=document.getElementById('login');
    const regHeadr=document.getElementById('register');
    const loginBox=document.getElementById('loginBox');
    const regBox=document.getElementById('regBox');
    regHeadr.style.backgroundColor='black';
    regHeadr.style.color='white';
    regHeadr.style.fontWeight='bold';
    loginHeadr.style.backgroundColor='white';
    loginHeadr.style.color='black';
    loginHeadr.style.fontWeight='lighter';
    loginBox.style.zIndex=-1;
    loginBox.style.visibility='hidden';
    regBox.style.zIndex=1;
    regBox.style.visibility='visible';
    document.getElementById('loginMsg').textContent='';
    document.getElementById('registerMsg').textContent='';
}
module.exports={
    setAllEmpty,
    handleLoginAreaStyle,
    handleRegAreaStyle
}