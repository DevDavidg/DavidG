type ThemeType = 'l' | 'd' | 'p';

type DimensionProps = {
    width?: string;
    height?: string;
};

export interface CommonProps<T = ThemeType> extends DimensionProps {
    theme?: T;
    style?: React.CSSProperties;
}

export interface BlobProps extends CommonProps {
    top?: string;
    left?: string;
}

export interface ButtonProps extends CommonProps {
    text?: string | React.JSX.Element;
    theme?: 'l' | 'd' | 'p';
    outline?: boolean;
    padding?: string;
    href?: string;
    fontSize?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
    styles?: React.CSSProperties;
    divRef?: React.Ref<HTMLDivElement>;
    buttonRef?: React.Ref<HTMLButtonElement>;
    disabled?: boolean;
    ariaLabel?: string;
}

export interface ContainerProps extends CommonProps {
    children: React.JSX.Element | React.JSX.Element[];
    padding?: string | React.CSSProperties;
    align?: 'start' | 'center' | 'end';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: boolean;
    display?: 'flex' | 'block';
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    className?: string;
    id?: string;
    gap?: string;
    ref?: React.RefObject<HTMLDivElement>;
    href?: string;
    transform?: string;
    transition?: string;
    styles?: React.CSSProperties;
}

export interface FilteredCardProps {
    onFilter: (lang: string) => void;
    lang: string[];
}

export interface SpinnerProps extends CommonProps {
    loading: boolean;
    background?: boolean;
    bgWidth?: string | number;
    bgHeight?: string | number;
    borderWidth?: string | number;
}

export interface GifComponentProps extends CommonProps {
    src: string;
    isHovered: boolean;
}

export interface ProjectCardProps extends CommonProps {
    gif: string;
    title: string;
    description: string;
    demoUrl: string;
    github: string;
    icons: string[] | string;
    cardLang: string[] | string;
    filter?: string;
    isDesign?: boolean;
}

export interface RenderIconProps extends CommonProps {
    icon: string;
    index: number;
    error: boolean[];
    setError: React.Dispatch<React.SetStateAction<boolean[]>>;
    hoveredIcon: string | null;
    setHoveredIcon: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ISphereProps extends CommonProps {
    style: React.CSSProperties;
}

export interface SwitchProps extends CommonProps<'p' | 'd'> {
    onChange?: () => void;
}

export interface TextProps extends CommonProps<'text-p' | 'text-d' | 'text-default'> {
    text?: string | React.JSX.Element;
    size?: 's' | 'sm' | 'm' | 'l' | 'xl' | `${number}${'px' | 'rem'}`;
    weight?: 'semibold' | 'light' | 'regular' | 'bold' | 'bolder';
    align?: 'left' | 'center' | 'right';
    margin?: string;
    padding?: string;
    href?: string;
    typingText?: string[];
    typingInterval?: number;
    deleteInterval?: number;
}

export interface ProjectsSectionProps {
    animateTransition: boolean;
    isRightToLeft: boolean;
    isDarkMode: boolean;
}
