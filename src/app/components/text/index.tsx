import './index.sass';

interface TextProps {
  text?: string | JSX.Element;
  theme?: 'text-p' | 'text-d' | 'text-default';
  size?: 's' | 'm' | 'l';
  weight?: 'light' | 'regular' | 'bold';
  align?: 'left' | 'center' | 'right';
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  href?: string;
}

const Text: React.FC<TextProps> = (props) => {
  const style = {
    '--margin': props.margin ?? 'auto',
    '--padding': props.padding ?? 'auto',
    '--width': props.width ?? 'auto',
    '--height': props.height ?? 'auto',
  } as React.CSSProperties;
  return (
    <p
      style={{ ...style, ...props.style }}
      className={[
        'text',
        props.theme ?? 'text-default',
        props.size ?? 'm',
        props.weight ?? 'regular',
        props.align ?? 'left',
      ].join(' ')}
    >
      {props.href ? (
        <a key="text-link" href={props.href}>
          {props.text}
        </a>
      ) : (
        <span key="text-content">{props.text}</span>
      )}
    </p>
  );
};

export default Text;
