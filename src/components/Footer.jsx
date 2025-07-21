import Link from 'next/link';

export default function Footer() {
    const email = "mosaic@monash.edu"
    return (
        <footer className="w-full py-8 bg-[#213359]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Logo on the left */}
                    <div className="mb-4 md:mb-0">
                        <Link href="/">
                            <img
                                src="/monashxMosaic.png"
                                alt="MonashxMosaic Logo"
                                className="h-20 w-auto"
                            />
                        </Link>
                    </div>

                    <div className="flex space-x-6">
                        <Link href={`mailto:mosaic@monash.edu`}>
                            <img
                                src="/email.png"
                                alt="MonashxMosaic Logo"
                            />
                        </Link>
                        <Link href="https://www.instagram.com/mosaic.monash/">
                            <img
                                src="/insta.png"
                                alt="MonashxMosaic Logo"
                            />
                        </Link>
                        <Link href="https://www.linkedin.com/company/mosaic-monash-student-team/posts/?feedView=all">
                            <img
                                src="/link.png"
                                alt="MonashxMosaic Logo"
                            />
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}