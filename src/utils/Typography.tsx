type VariantType = 'title' | 'subheading' | 'body';

interface StyleMap { fontSize: string, isBlock: boolean, isBold: boolean }

const styleMapping: { [key: string]: StyleMap } = {
  title: { fontSize: '2rem', isBlock: true, isBold: true },
  subheading: { fontSize: '1.4rem', isBlock: true, isBold: true },
  body: { fontSize: '1.2rem', isBlock: false, isBold: false },
}

const Typography = (props: TypographyProps) => {
  const isBlock = props.isBlock !== undefined ?
    props.isBlock : styleMapping[props.variant].isBlock;
  const isBold = props.isBold !== undefined ?
    props.isBold : styleMapping[props.variant].isBold;

  const styling: React.CSSProperties = {
    fontSize: styleMapping[props.variant].fontSize,
    display: isBlock ? 'block' : undefined,
    fontWeight: isBold ? 'bold' : undefined,
    color: props.color,
  };

  if (props.textAlign) {
    styling.textAlign = props.textAlign;
  }

  return (
    <span style={styling}>{props.children}</span>
  );
};

interface TypographyProps {
  children: string,
  variant: VariantType,
  color: string,
  isBlock?: boolean,
  isBold?: boolean,
  textAlign?: 'center' | 'left' | 'right',
}

Typography.defaultProps = {
  color: 'var(--light-color)',
}

export default Typography;