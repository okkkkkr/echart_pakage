let resizeText = () => {
    // （根据实际需求定义）
    let designSize = 1920; // 默认设计尺寸
    let fontSize = 16; // 默认节点字体大小

    // 以下内容不需要改动
    let rule = designSize / fontSize; // 标准
    let html = document.querySelector('html'); // 根节点
    let body = document.querySelector('body'); // 屏幕宽度
    let html_fontsize = body.clientWidth / rule; // html节点字体大小
    html.style.fontSize = html_fontsize + 'px';
};

export default resizeText;
