import Image, { ImageProps } from 'next/image';
import Link, { LinkProps } from 'next/link';

const LinkWrapper = (props: LinkProps) => {
	return <Link {...props} />;
};

const ImageWrapper = (props: ImageProps) => {
	return <Image alt={props.alt} {...props} />;
};

export { LinkWrapper as Link, ImageWrapper as Image };
