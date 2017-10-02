/**
 * Esta função irá me retornar o números de contribuidores
 * Pega o último e a próxima página. Remove o último caractere do next e vai incrementando até que o link seja
 * igual ao last, e vai atribuindo os resultados dentro do array com spread, no final, retornar o valor do length do array
 * @param {*} next = Próxima página de contribuidores
 * @param {*} last = Última página de contribuidores
 */
export default function counterContrib (next, last){
    var link = next.slice(0, -1);
    console.log(link);
    while(link === last){
        console.log("1 consulta");
        link += 1
    }
}