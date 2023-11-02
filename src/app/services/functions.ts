export function simpleHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash;
}

export const calculateHomeSectionTop = () =>
    typeof window !== 'undefined'
        ? document.getElementById('home')?.getBoundingClientRect().top ?? 0
        : 0;

export const calculateCurrentTheme = (isDarkMode: boolean, homeSectionTop: number) => {
    return typeof window !== 'undefined' &&
        homeSectionTop >= 0 &&
        homeSectionTop <= window.innerHeight
        ? isDarkMode
        : !isDarkMode;
};

export const calculateSphereStyle = (scrollY: number) => ({
    transform: `translateY(${scrollY}px)`,
    transition: 'transform 0.5s ease',
});

export const calculateTranslateXValue = (
    isDarkMode: boolean,
    isRightToLeft: boolean,
    scrollY: number
) => {
    let translateX;
    if (isRightToLeft) {
        translateX = isDarkMode ? scrollY / 3 : -scrollY / 3;
    } else {
        translateX = -scrollY / 3;
    }
    return `translateX(${translateX}px)`;
};

export const calculateBlobStyle = (scrollY: number, translateXValue: string) => ({
    transform: `translateY(${scrollY / 2.7}px) ${translateXValue}`,
    transition: 'transform 0.5s ease',
    filter: `blur(${scrollY * 0.2}px)`,
});

export function addSpace(...classes: string[]) {
    return classes.map(cls => `${cls} `).join('');
}

export const getDirection = (isRightToLeft: boolean) =>
    isRightToLeft ? 'row' : 'row-reverse';
export const getAlign = (isRightToLeft: boolean) => (isRightToLeft ? 'start' : 'end');
export const getTextTheme = (isDarkMode: boolean) =>
    isDarkMode ? 'text-d' : 'text-p';
export const getTextStyle = (isRightToLeft: boolean) => ({
    textAlign: isRightToLeft ? 'start' : 'end',
});

export const getTheme = (isDarkMode: boolean) => (isDarkMode ? 'd' : 'l');

export const remToPx = (rem: number) =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize);