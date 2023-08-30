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
  direction?: 'row' | 'column';
  className?: string;
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
  } as React.CSSProperties;
  return (
    <div
      style={style}
      className={
        `${props.className ?? ''}` +
        ['container', props.theme ? props.theme : null]
          .filter((p) => p)
          .join(' ')
      }
    >
      {props.children}
    </div>
  );
};

export default Container;
