import { useState, useEffect } from 'react';
import InvoiceTable from "../elements/InvoiceTable";

function AllInvoicesPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedInvoices, setLoadedInvoices] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        // by default fetch is a GET request
        fetch('http://localhost:5000/invoices/get/'
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                const invoices = [];

                for (const key in data) {
                    const invoice = {
                        // get the key
                        id: key,
                        // push the key into the object to form proper json
                        ...data[key]
                    };
                    invoices.push(invoice);
                }


                setIsLoading(false);
                setLoadedInvoices(invoices);
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }

    return (
        <>
            <h2 className="text-3xl text-dark font-bold mb-4">All invoices</h2>
            <InvoiceTable invoices={loadedInvoices} />
        </>
    )
}

export default AllInvoicesPage;