export default function (str='提示') {
    // $('.toast').remove();
    str = '<p class="toast">'+ str + '</p>';
    $('body').append(str);
    setTimeout(function () {
        $('.toast').remove();
    }, 3000)
}