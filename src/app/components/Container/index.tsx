import './index.sass';

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
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
}

const Container: React.FC<ContainerProps> = (props) => {
  const style = {
    '--width': props.width ?? 'auto',
    '--height': props.height ?? 'auto',
    '--align': props.align ?? '',
    '--padding': props.padding ?? 'auto',
    display: props.display ?? '',
    justifyContent: props.justify ?? '',
  } as React.CSSProperties;
  return (
    <div
      style={style}
      className={['container', props.theme ? props.theme : null]
        .filter((p) => p)
        .join(' ')}
    >
      {props.children}
    </div>
  );
};

export default Container;
