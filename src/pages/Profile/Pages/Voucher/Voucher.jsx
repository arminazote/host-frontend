import Loader from "../../../../Layout/Loader";

const Voucher = () => {
    return (
        <div>
            <Loader></Loader>
            <div className="ml-4 my-3">
            <h1 className="text-2xl font-semibold my-2">Claim Voucher</h1>
            <h2 className="text-xl">Have a Voucher Code ?</h2>
            <div className="flex my-2 gap-2">
                <input type="text" className="w-96 border-orange-400 border-2 py-[6px] px-2 rounded-xl outline-none" placeholder="Enter Voucher code"/>
                <button className='my-2 bg-blue-500 w-20 p-1 uppercase text-white rounded-full'>Apply</button>
            </div>
            <div className="divider"></div>
            <h2 className="text-xl">Voucher Details </h2>
            </div>
        </div>
    );
};

export default Voucher;