import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutBox from "../elements/CheckoutBox";

const bip21 = require("bip21");

const kjua = require("kjua");

const CheckoutPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [invoiceData, setInvoiceData] = useState([])
    const [qrCode, setQrCode] = useState(false)

    const params = useParams();

    const userToken = localStorage.getItem('token');

    useEffect(() => {
        setIsLoading(true);
        // by default fetch is a GET request
        fetch('http://localhost:5000/invoice/' + params.invoiceId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        }).then(response => {
            return response.json();
        })
            .then(data => {
                setInvoiceData(data.data);
                setIsLoading(false);
            });
    }, []);

    const currentUser = JSON.parse(localStorage.getItem('user')) || [];

    const store = currentUser.data.store.name;

    const btcAddress = invoiceData.btc_address;
    const lightningAddress = invoiceData.lightning_invoice;
    const description = invoiceData.description;
    const orderId = invoiceData.order_id;
    const fiat_amount = invoiceData.amount;
    const amount = invoiceData.btc_amount


    const options = {
        label: `Payment for ${description} at ${store}`,
        message: `Payment for ${description} at ${store}`,
        amount: amount,
        lightning: lightningAddress,
    };

    const uri = bip21.encode(btcAddress, options);

    const bip21qrcode = kjua({
        text: uri,
        render: "image",
        crisp: true,
        size: 300,
        fill: "#252746",
        rounded: 10
    })

    console.log(bip21qrcode);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }

    return (
        <div className="w-5/6 sm:w-2/3 md:w-1/3 my-12 py-6 px-6 shadow mx-auto bg-white rounded-sm">
            <div className="text-center">
                <h2 className="text-3xl text-center text-primary">{store}</h2>
                <small>Powered by Bitcoin Payment Processor</small>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:items-start py-3 border-t border-b border-gray-300 last:border-none">
                    <span className="w-full sm:w-2/3 font-medium text-center sm:text-left">{description}</span>
                    <span className="flex-1 text-center sm:text-left">{amount} BTC <span className="text-blue-800">(${fiat_amount}.00 USD)</span> </span>
                </div>
            </div>
            <div>
                {isLoading && (
                    <p>Loading...</p>
                )}
                {!isLoading && (
                    <CheckoutBox qrcode={bip21qrcode} lightning={lightningAddress} bitcoin={btcAddress} />

                )}
            </div>
        </div>
    )
};

export default CheckoutPage;