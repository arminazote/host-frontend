import { Link } from 'react-router-dom';
import refer1 from '../../assets/mobilebanner/Free-200-Bonus-2.webp'
import Loader from '../../Layout/Loader';
const Promotions = () => {
  return (
    <div className="my-4 grid lg:grid-cols-2 gap-4 grid-cols-1 px-2 lg:w-10/12 mx-auto">
      <Loader></Loader>
      <div className='border-2 border-yellow-500 rounded-2xl p-2'>
        <img className='w-full rounded-2xl'  src={refer1} alt="" />
        <div className='flex flex-col justify-between'>
          <div>
            <h2 className='font-bold text-2xl'>Refer And Earn Forever</h2>
            <h3 className='text-lg'>Invite and earn! Every time your friends make a deposit, you'll earn ৳200 and additional commission!</h3>
          </div>
          <div className='flex gap-6 justify-between my-4'>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className="bg-yellow-500 rounded-2xl p-2">Read More</button>
            <Link to={'/profile/deposit'}><button className="bg-green-500 rounded-2xl p-2 px-5 text-white">Apply Now</button></Link>
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-black text-white w-11/12 max-w-5xl">
              <div className="modal-action">
                <form method="dialog">
                  <button className="text-xl px-2 my-4">X</button>
                </form>
              </div>
              <div >
                <img className='w-full rounded-2xl' src={refer1} alt="" />
                <h2 className='font-semibold text-xl my-4'>PROMOTION PERIOD</h2>
                <h3 className='md:text-2xl font-bold'>DEC 10, 2024 02:00:00 (GMT +06:00) - OCT 08, 2025 23:59:59 (GMT +06:00)</h3>
                <table className="w-full my-4 border border-gray-300 table-xs text-center">
                  <thead>
                    <tr className="bg-gray-800 text-xs text-white">
                      <th className="lg:p-2 border border-gray-300">উপলভ্যতা</th>
                      <th className="lg:p-2 border border-gray-300">ন্যূনতম ডিপোজিট</th>
                      <th className="lg:p-2 border border-gray-300">বোনাস</th>
                      <th className="lg:p-2 border border-gray-300">সর্বোচ্চ বোনাস পরিমাণ</th>
                      <th className="lg:p-2 border border-gray-300">টার্নওভার</th>
                      <th className="lg:p-2 border border-gray-300">গেমের ধরন</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-black">
                      <td className="lg:p-2 border border-gray-300">একবার</td>
                      <td className="lg:p-2 border border-gray-300">৫০০</td>
                      <td className="lg:p-2 border border-gray-300">২০০</td>
                      <td className="lg:p-2 border border-gray-300">২০০</td>
                      <td className="lg:p-2 border border-gray-300">১০ গুণ (২০০০)</td>
                      <td className="lg:p-2 border border-gray-300">স্লট গেমস</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">শর্তাবলী</h3>
                  <ul className="list-disc list-inside space-y-4 text-sm text-white">
                    <li>এই প্রমোশনটি একটি ইউজার অ্যাকাউন্ট থেকে একবার নেওয়া যাবে।</li>
                    <li>এই প্রমোশনটি কেবল প্রথম ডিপোজিটের জন্য প্রযোজ্য হবে।</li>
                    <li>বোনাসটি কেবল স্লট গেমের জন্য প্রযোজ্য।</li>
                    <li>আপনি যদি আগেই ডিপোজিট করে খেলা শুরু করে ফেলেন এবং পরে বোনাস ক্লেইম করেন তাহলে বোনাস প্রদান করা হবে না।</li>
                    <li>একবারে শুধুমাত্র একটি প্রমোশনই এভেইল করা যাবে।</li>
                    <li>নিম্নে ২০ বার খেলার পরেই বোনাসে প্রাপ্ত টাকা উইথড্র করা যাবে।</li>
                    <li>একটি ইউজার অ্যাকাউন্ট থেকে শুধুমাত্র একবার বোনাস নেওয়া যাবে। একজন ইউজার যদি অসৎ উপায় অবলম্বন করে একাধিকবার বোনাস নেওয়ার চেষ্টা করে তাহলে সেটি জালিয়াতি হিসেবে ধরা হবে এবং 'ভাগ্য' বোনাস ক্যান্সেল করবার সম্পূর্ণ অধিকার রাখবে।</li>
                    <li>বোনাস হিসেবে প্রাপ্ত টাকা দিয়ে ইন গেম বোনাস রাউণ্ড ক্রয় করা যাবেনা। এটিকে বোনাস শর্তাবলীর লঙ্ঘন হিসেবে বিবেচনা করা হবে।</li>
                    <li>গেলে সকল জয় বাতিল বলে গণ্য হবে এবং ব্যালেন্স প্রাথমিক ডিপোজিটে রিসেট করে ফেলা হবে।</li>
                    <li>প্লেয়ারদেরকে উইথড্র করবার জন্য ডিপোজিট অ্যামাউন্টের ১ বার টার্নওভার শর্ত পূরণ করতে হবে।</li>
                    <li>লাইভ ক্যাসিনো, ক্র্যাশ গেমস, স্পোর্টস বেট, BACCARAT, রুলেট, সিকবো, ডাইস এবং ফ্যান ট্যান এই গেমগুলোতে খেলা, এই প্রমোশনের জন্য বৈধ টার্নওভার হিসেবে গণ্য হবেনা। এটিকে বোনাস শর্তাবলীর লঙ্ঘন হিসেবে বিবেচনা করা হবে। এই খেলাগুলি থেকে প্রাপ্ত জয়, বোনাস এবং টার্নওভার বাতিল বলে গণ্য হবে।</li>
                    <li>প্রতিটি বেট-এ প্লেয়ারদের জমাকৃত অর্থ প্রথমে ব্যবহার করা হবে এবং তারপর বোনাসে প্রাপ্ত টাকা ব্যবহৃত হবে।</li>
                    <li>বোনাস অ্যাক্টিভ থাকা অবস্থায় গেম খেলতে হবে। প্লেয়াররা ইচ্ছাকৃতভাবে গেম রাউন্ড কিংবা কমপ্লিশনে দেরী করলে সেই বেটে ব্যাবহারকৃত বোনাস, ডিপোজিট এবং জয় বাতিল বলে গণ্য হবে।</li>
                    <li>বোনাস শুধুমাত্র এলিজিবল খেলাগুলোতেই ব্যবহার করা যাবে। অন্য গেমে ব্যবহার করলে সেই খেলা এবং জিতে যাওয়া টাকা বাতিল বলে গণ্য হবে।</li>
                    <li>বোনাসে পাওয়া টাকা অবশ্যই ৩০ দিনের মধ্যে ব্যবহার করতে হবে অন্যথায় ব্যালেন্স মেয়াদোত্তীর্ণ বলে গণ্য হবে।</li>
                    <li>প্রয়োজনীয় টার্নওভার কমপ্লিট করবার পরে (বোনাস বাদ দিয়ে) ব্যালেন্স উঠানো যাবে। টাকা উত্তোলনের জন্য সাধারণত ৩০ মিনিট থেকে ১ ঘন্টা পর্যন্ত প্রসেসিং টাইম লেগে থাকে।</li>
                    <li>রোলওভার-এর হিসাব সকল জেতা কিংবা হেরে যাওয়া খেলাতে ধরা হবে। বাতিল, ড্র বেট, ক্যাশড আউট বেট কিংবা ফ্রি বেটে রোলওভার এর হিসেব ধরা হবে না।</li>
                    <li>ড্র, ফেরতকৃত, বাতিল কিংবা অপ্রতিযোগিতামূলক খেলায় টার্নওভার ধরা হবে না। এরকম কোনও কিছু শনাক্ত হলে বোনাস এবং প্রাপ্ত জয় বাতিল বলে গণ্য হবে।</li>
                    <li>‘ভাগ্য' অধিকার রাখে যেকোন সময় যেকোন অফার বাতিল ঘোষণা করবার, যেকোন ব্যক্তি কিংবা দল এর বিরুদ্ধে।</li>
                    <li>বোনাস অ্যামাউন্ট ব্যবহার করবার পরে কোন প্রকার ব্যাক্তিগত তথ্য পরিবর্তন করা যাবেনা। তারপরেও যদি আপনি আপনার কোন তথ্য পরিবর্তন করতে চান, তাহলেঅ বোনাস থেকে জিতে যাওয়া টাকা বাদ দেওয়া হবে।</li>
                    <li>উল্লেখিত শর্ত ও নির্দেশনাবলি সাইটের সাধারণ শর্তাবলী অনুসারে প্রণয়ন করা হয়েছে।</li>
                  </ul>
                </div>

                

              </div>
            </div>
          </dialog>

        </div>
      </div>
    </div>
  );
};

export default Promotions;