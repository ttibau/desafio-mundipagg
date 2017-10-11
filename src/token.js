export default function token(){
    let auth = "Authorization";
    let calc = " Basic " + btoa("ttibau:tibaus7212");
    return auth + calc;
}