import { NextApiRequest } from 'next';
import { UAParser } from 'ua-parser-js';

export default (req: NextApiRequest) => {
	const { ip, ua, time } = {
		ip: (req.headers['x-real-ip'] as string) || req.socket.remoteAddress,
		ua: req.headers['user-agent'],
		time: new Date(),
	};

	const { browser, os } = new UAParser(ua).getResult();
	return { browser, os, ip, time };
};
