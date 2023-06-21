import Image, { ImageProps } from 'next/image';
import Link, { LinkProps } from 'next/link';

const LinkWrapper = (props: LinkProps) => {
	return <Link {...props} />;
};

const ImageWrapper = ({ alt, ...props }: ImageProps) => {
	return <Image alt={alt} {...props} />;
};

export { LinkWrapper as Link, ImageWrapper as Image };
