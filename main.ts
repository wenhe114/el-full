// 什么数据类型
type RFSMethodName = "webkitRequestFullScreen" | "requestFullscreen" | "mozRequestFullScreen" | "msRequestFullscreen"
type EFSMethodName = 'webkitExitFullscreen' | 'msExitFullscreen' | 'mozCancelFullScreen' | 'exitFullscreen';
type FSEPropNmae = 'webkitFullscreenElement' | 'msFullscreenElement' | 'mozFullScreenElement' | 'fullscreenElement';
type ONFSCPropNmae = 'onfullscreenchange' | 'onwebkitfullscreenchange' | 'onmozfullscreenchange' | 'MSFullscreenChange';

// 文档dom树的根节点
const DOC_ELMENT = document.documentElement;

// 默认值
let FFS_METHOD_NAME: RFSMethodName = "requestFullscreen"
let EFS_METHOD_NAME: EFSMethodName = "exitFullscreen"
let FSE_PROP_NAME: FSEPropNmae = "fullscreenElement"
let ON_FSC_PROP_NAME: ONFSCPropNmae = "onfullscreenchange"

// 判断浏览器类型
if ('webkitRequestFullScreen' in DOC_ELMENT) {
    FFS_METHOD_NAME = "webkitRequestFullScreen"
    EFS_METHOD_NAME = "webkitExitFullscreen"
    FSE_PROP_NAME = "webkitFullscreenElement"
    ON_FSC_PROP_NAME = "onwebkitfullscreenchange"
} else if ('mozRequestFullScreen' in DOC_ELMENT) {

    FFS_METHOD_NAME = 'mozRequestFullScreen';
    EFS_METHOD_NAME = 'mozCancelFullScreen';
    FSE_PROP_NAME = 'mozFullScreenElement';
    ON_FSC_PROP_NAME = 'onmozfullscreenchange';

} else if (`msRequestFullscreen` in DOC_ELMENT) {
    FFS_METHOD_NAME = 'msRequestFullscreen';
    EFS_METHOD_NAME = 'msExitFullscreen';
    FSE_PROP_NAME = 'msFullscreenElement';
    ON_FSC_PROP_NAME = 'MSFullscreenChange';
}
else if (!DOC_ELMENT.requestFullscreen) {

    throw "当前浏览器不支持(Fullscreen)全屏api"

}

/**
 * 启用全屏
 * @param  {HTMLElement} 元素
 * @param  {FullscreenOptions} 选项
 * @returns {Promise}
 */
export function beFull(el: HTMLElement = DOC_ELMENT, options?: FullscreenOptions): Promise<void> {
    return el[FFS_METHOD_NAME](options)
}

/**
 * 退出全屏
 */
export function exitFull():Promise<void>{
    return document[EFS_METHOD_NAME]()
}

/**
 * 元素是否全屏
 * @param {HTMLElement}
 */
export function isFull(el:HTMLElement|EventTarget):boolean{
    return el===document[FSE_PROP_NAME]
}

/**
 * 全屏切换/关闭
 * @param  {HTMLElement} 目标元素
 * @returns {Promise}
 */
export function toggleFull(el: HTMLElement = DOC_ELMENT, options?: FullscreenOptions):Promise<void>{
    if (isFull(el)) {
        return exitFull()
    }else{
        return beFull(el,options)
    }
}

/** 
 * 全屏切换时，触发的事件
 * @param  {HTMLElement} 元素
 * @param  {(isFull: boolean) => void} 返回"是否全屏"
*/
export function watchFull(el: HTMLElement, callback: (isFull: boolean) => void) {
    const cancel = () => {
        el.onfullscreenchange = null;
    };

    const handler = (event: Event) => {
        if (null !== event.target) {
            callback(isFull(event.target));
        }
    }

    // 这里addEventListener不好使
    el[ON_FSC_PROP_NAME] = handler;

    return {
        cancel
    }
}