export type ThemeType = 'l' | 'd' | 'p';
export type AlignType = 'start' | 'center' | 'end';
export type DisplayType = 'flex' | 'block';
export type DirectionType = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type SizeType = 's' | 'sm' | 'm' | 'l' | 'xl' | `${number}${'px' | 'rem'}`;
export type WeightType = 'semibold' | 'light' | 'regular' | 'bold' | 'bolder';

type DimensionProps = {
    width?: string;
    height?: string;
};

export type StyleProps = {
    style?: React.CSSProperties;
    className?: string;
    align?: AlignType;
    justify?: AlignType | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: boolean;
    display?: DisplayType;
    direction?: DirectionType;
    gap?: string;
    padding?: string | React.CSSProperties;
    margin?: string;
};

export interface CommonProps<T = ThemeType> extends DimensionProps, StyleProps {
    theme?: T;
}

export interface BlobProps extends CommonProps {
    top?: string;
    left?: string;
}

export interface ButtonProps extends CommonProps {
    text?: string | React.JSX.Element;
    outline?: boolean;
    href?: string;
    fontSize?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    divRef?: React.RefObject<HTMLDivElement>;
    buttonRef?: React.Ref<HTMLButtonElement>;
    disabled?: boolean;
    ariaLabel?: string;
}

export interface ContainerProps extends CommonProps {
    children: React.JSX.Element | React.JSX.Element[];
    id?: string;
    ref?: React.RefObject<HTMLDivElement>;
    href?: string;
    transform?: string;
    transition?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
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
    size?: SizeType;
    weight?: WeightType;
    align?: AlignType;
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

export interface HomeSectionProps {
    isDarkMode: boolean;
    isRightToLeft: boolean;
    blobStyle: React.CSSProperties;
    sphereStyle: React.CSSProperties;
    currentTheme: boolean;
}

export interface DeviceSpecificStyles {
    containerWidth: string;
    containerHeight: string;
    textMargin: string;
    buttonGap: string;
}
