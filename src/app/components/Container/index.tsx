import './index.sass';

interface ContainerProps {
  children: React.JSX.Element | React.JSX.Element[];
  height?: string;
  width?: string;
  padding?: string | React.CSSProperties;
  theme?: 'l' | 'd';
  align?: 'start' | 'center' | 'end';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap?: boolean;
  display?: 'flex' | 'block';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  className?: string;
  id?: string;
  gap?: string;
  styles?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement>;
  href?: string;
  transform?: string;
  transition?: string;
}

const Container: React.FC<ContainerProps> = (props) => {
  const style = {
    '--width': props.width ?? 'auto',
    '--height': props.height ?? 'auto',
    '--align': props.align ?? '',
    '--padding': props.padding ?? 'auto',
    display: props.display ?? '',
    justifyContent: props.justify ?? '',
    flexDirection: props.direction ?? '',
    gap: props.gap ?? '',
    flexWrap: props.wrap ? 'wrap' : '',
    transform: props.transform ?? '',
    transition: props.transition ?? '',
  } as React.CSSProperties;
  return props.href ? (
    <a
      href={props.href}
      className={`container ${props.className ?? ''}`}
      style={style}
    >
      {props.children}
    </a>
  ) : (
    <div
      style={style ?? props.styles}
      className={
        `${props.className ?? ''}` +
        ['container', props.theme ? props.theme : null]
          .filter((p) => p)
          .join(' ')
      }
      id={props.id}
      ref={props.ref}
    >
      {props.children}
    </div>
  );
};

export default Container;
