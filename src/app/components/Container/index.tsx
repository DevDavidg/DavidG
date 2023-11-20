import { ContainerProps } from '@/app/services/models';
import './index.sass';

const createStyle = (props: ContainerProps) =>
  ({
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
  } as React.CSSProperties);

const createClassName = (props: ContainerProps) => {
  const classes = ['container'];
  if (props.className) classes.push(props.className);
  if (props.theme) classes.push(props.theme);
  return classes.join(' ');
};

const Container: React.FC<ContainerProps> = (props) => {
  const style = createStyle(props);
  const className = createClassName(props);

  return props.href ? (
    <a href={props.href} className={className} style={style}>
      {props.children}
    </a>
  ) : (
    <div style={style} className={className} id={props.id} ref={props.ref}>
      {props.children}
    </div>
  );
};

export default Container;
