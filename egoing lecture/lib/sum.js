// _sum은 sum.js에서만 접근 가능
function _sum(a,b){
    return a+b
}

module.exports = function (a,b){
    return _sum(a,b)
}


