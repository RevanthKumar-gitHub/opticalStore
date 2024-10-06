const frameCodeGenerator = (length)=>{
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for(let i=0;i<length;i++)
    {
        randomIndex = Math.floor(Math.random()*characters.length);
        result = result + characters[randomIndex];
    }
    const now = new Date();
    const minutes = now.getHours();
    const seconds = now.getSeconds();

    result = result + minutes + seconds;

    return result;

}

module.exports = {frameCodeGenerator};