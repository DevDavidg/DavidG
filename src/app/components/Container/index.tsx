import { ContainerProps } from '@/app/services/models';
import './index.sass';

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
      style={style ?? props.style}
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
