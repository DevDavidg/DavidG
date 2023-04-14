import './index.sass';

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
  height?: string;
  width?: string;
  theme?: 'l' | 'd';
  row?: boolean;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  wrap?: boolean;
}

const Container: React.FC<ContainerProps> = (props) => {
  const style = {
    '--width': props.width ?? 'auto',
    '--height': props.height ?? 'auto',
  } as React.CSSProperties;
  return (
    <div
      style={style}
      className={[
        'container',
        props.theme ? props.theme : null,
        props.row ? 'row' : null,
      ]
        .filter((p) => p)
        .join(' ')}
    >
      {props.children}
    </div>
  );
};

export default Container;
