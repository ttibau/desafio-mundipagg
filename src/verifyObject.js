/**
 * Função que vai verificar se o objeto informado contém childs ou não
 * Se houver algum dado dentro do objeto, retorna false
 * @param {*} obj  = objeto
 */
export default function isEmptyObject(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
}