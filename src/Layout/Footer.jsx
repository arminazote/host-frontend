import img from '../assets/ranibajibd.png'
import bkash from '../assets/bkash-removebg-preview.png'
import rocket from '../assets/rocket-removebg-preview.png'
import nagad from '../assets/Nagad.webp'
import { FaTelegramPlane } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';
const Footer = () => {
    return (
        <div>
            <div className="md:px-24 px-2 bg-gray-600 text-white py-8">
                <div className='divider divider-warning'></div>
                <div className='md:flex gap-5'>
                    <div className="md:w-1/2">
                        <h1 className="text-xl mb-2 font-semibold">RANIBAJI | Trusted Online Casino in South Asia | Available in Bangladesh, India, Nepal</h1>
                        <p>Ranibaji is an online gambling company, offering a wide range of betting and casino options. Founded in 2024, Ranibaji began as a cricket exchange platform serving the South Asian market. Our goal is to be the first choice for online casino betting to our users. Expect only the best in customer service and entertainment!</p>
                        <h2 className="text-xl font-semibold">
                            Certified By
                        </h2>
                        <img className='w-36 my-2' src={img} alt="" />
                    </div>
                    <div className="flex space-x-4 justify-center items-center">
                        <h2 className='text-2xl font-semibold'>Follow Us On</h2>
                        {/* Telegram Button */}
                        <a
                            href="https://t.me/ranibaji143"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 w-12 h-12 rounded-full"
                            title="Telegram"
                        >
                            <FaTelegramPlane className="w-6 h-6" />
                        </a>

                        {/* YouTube Button */}
                        <a
                            href="https://youtube.com/@ranibaji1?si=3CyXQ3gf7xcVklRB"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 w-12 h-12 rounded-full"
                            title="YouTube"
                        >
                            <FaYoutube className="w-6 h-6" />
                        </a>
                    </div>
                </div>
                <div className='divider divider-warning'></div>
                <div className='my-6'>
                    <h2 className='text-xl font-semibold'>Payment Method</h2>
                    <div className='flex gap-3'>
                        <img className='w-24' src={bkash} alt="" />
                        <img className='w-24' src={rocket} alt="" />
                        <img className='w-24' src={nagad} alt="" />
                    </div>
                    <h2>Copyright © 2024 Ranibaji.All rights are reserved.</h2>
                </div>

            </div>
            <div className='bg-black py-4 text-white md:px-24 px-2'>
                <h2 className='text-xl font-semibold'>RANIBAJI বাংলাদেশে সেরা অনলাইন ক্যাসিনো গেম খেলুন - পাবেন নিরাপদ এবং সুরক্ষিত গেমিং অভিজ্ঞতা
                </h2>
                <p className='py-3 '>
                    বাংলাদেশে অনলাইন বেটের এক্সাইটমেন্ট পান ক্যাসিনোতে গেম খেলে। স্লট, ব্ল্যাকজ্যাক, রুলেট, পোকার এবং আরও অনেক লেটেস্ট ক্যাসিনো গেমগুলি খেলুন৷
                    আপনার বেট রাখুন এবং বাংলাদেশে স্পোর্টস বেটিং দিয়ে বড় অংকের টাকা জিতুন। ঘরে বসে লাইভ ক্যাসিনোর রোমাঞ্চকর এক্সপেরিয়েন্স নিন। আমাদের সাথে পাবেন নিরাপদ এবং সুরক্ষিত গেমিং।খেলুন এখনই এবং পেয়ে যান অনলাইনের নতুন ফান!</p>
            </div>
        </div>
    );
};

export default Footer;