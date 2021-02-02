// 元素添加样式
export const addClass = function(element, new_name) {
    if (!element || !new_name) return false
    if (element.className) {
        var old_class_name = element.className
        element.className = old_class_name + " " + new_name
    } else {
        element.className = new_name
    }
    return true
}

// 元素删除样式
export const removeClass = function(element, class_name) {
    if (!element || !class_name) return false
    if (!element.className) return false
    var all_names = element.className.split(" ")
    for (var i = 0; i < all_names.length; i++) {
        if (all_names[i] === class_name) {
            all_names.splice(i, 1)
            element.className = ""
            for (var j = 0; j < all_names.length; j++) {
                element.className += " "
                element.className += all_names[j]
            }
            return true
        }
    }
}

