import './index.sass';

interface BlobProps {
  theme: 'p' | 'd';
  width?: string;
  height?: string;
}

const Blob: React.FC<BlobProps> = (props) => {
  const style = {
    '--width': props.width ?? '100%',
    '--height': props.height ?? '100%',
  } as React.CSSProperties;
  return <div className={['blob', props.theme].join(' ')} style={style}></div>;
};
export default Blob;
