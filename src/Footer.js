export function Footer() {
    return (
        <footer className="bg-hackbca-less-dark-blue w-full p-10 text-white">
            <div className="container mx-auto">
                <div className="grid grid-gap-4 grid-cols-2">
                    <div className="mb-6">
                        <h3 className="font-bold text-xl">Sponsors</h3>
                        <p>hackBCA is brought to you by:</p>
                        <div className="flex text-center items-center flex-wrap mb-2">
                            <a href="https://www.bcappo.com/techpa" className="mr-2 opacity-60 hover:opacity-80 focus:opacity-80 hover:underline">Tech-Pa</a>
                            <a href="https://www.bcappo.com/" className="mr-2 opacity-60 hover:opacity-80 focus:opacity-80 hover:underline">BCA PPO</a>
                            <a href="https://www.youtube.com/watch?v=iik25wqIuFo" className="mr-2 opacity-60 hover:opacity-80 focus:opacity-80 hover:underline">&lt;Corporate Sponsors&gt;</a>
                        </div>
                        <p><a href="https://www.youtube.com/watch?v=iik25wqIuFo" className="mr-2 opacity-60 hover:opacity-80 focus:opacity-80 hover:underline">Wanna join this list? Sponsor us!</a></p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold text-xl">Contact Us</h3>
                        <p>Twitter: @hackbca</p>
                        <p>Instagram: @hackbca</p>
                        <p>Facebook: @hackbca</p>
                        <p>Email: hackbca@____</p>
                    </div>
                    <div>&copy; 2021 Copyright Text</div>
                    <div><a href="https://www.youtube.com/watch?v=iik25wqIuFo" className="mr-2 opacity-60 hover:opacity-80 focus:opacity-80 hover:underline">More Links</a></div>
                </div>
            </div>
        </footer>
    );
}