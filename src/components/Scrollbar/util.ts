
export interface BarStatus {
    offset: string
    scroll: string
    scrollSize: string
    size: string
    key: string
    axis: string
    client: string
    direction: string
}

interface StyleParams {
    move: number,
    size: string,
    bar: BarStatus
}

export const BAR_MAP : Record<string, BarStatus> = {
    vertical: {
        offset: 'offsetHeight',
        scroll: 'scrollTop',
        scrollSize: 'scrollHeight',
        size: 'height',
        key: 'vertical',
        axis: 'Y',
        client: 'clientY',
        direction: 'top'
    },
    horizontal: {
        offset: 'offsetWidth',
        scroll: 'scrollLeft',
        scrollSize: 'scrollWidth',
        size: 'width',
        key: 'horizontal',
        axis: 'X',
        client: 'clientX',
        direction: 'left'
    }
};

export function renderThumbStyle({ move, size, bar }: StyleParams) {
    const style: Record<string, any> = {};
    const translate = `translate${bar.axis}(${ move }%)`;

    style[bar.size] = size;
    style.transform = translate;
    style.msTransform = translate;
    style.webkitTransform = translate;

    return style;
}
