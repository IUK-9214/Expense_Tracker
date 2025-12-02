import React, { useState } from 'react'

export default function Home() {



    const [tarnsaction, setTransaction] = useState([])
    const [data, setdData] = useState({
        text: "",
        amount: ""
    })
    let [income, setincome] = useState(0)
    let [expenses, setExpenses] = useState(0);
    let [totalIncome, setTotalIncome] = useState(0)




    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setdData((prev) => ({
            ...prev,
            [name]: value
        }
        ));


    }

    const handleArray = (e) => {
        e.preventDefault()


        if (!data.text || !data.amount) {
            console.log(alert("Fill Each Box First "))
            return
        }; // prevent empty push

        const amountNum = Number(data.amount);
        const updated = [...tarnsaction, { ...data, amount: amountNum }];
        setTransaction(updated);



        if (amountNum > 0) {
            setincome(prev => prev + amountNum)
            setTotalIncome(prev => prev + amountNum)
        }
        if (amountNum < 0) {
            setExpenses(prev => prev + amountNum)
            setTotalIncome(prev => prev + amountNum)
        }


        // clear inputs after adding
        setdData({
            text: "",
            amount: ""
        });

    }
    const handleDelete = (index) => {
        setTransaction(prev => {

            prev.filter((item, i) => i !== index)

        });

    };



    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                        Expenses
                    </h1>

                </header>

                <section className="grid gap-6 md:grid-cols-3 items-stretch mb-8">

                    {/* Balance Card */}
                    <div className="md:col-span-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
                        <h2 className="text-sm text-slate-500 uppercase tracking-wider">Your Current Balance</h2>

                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white">
                                {totalIncome}
                            </span>
                            <span className="ml-2 text-sm text-slate-500">as of now</span>
                        </div>

                        {/* Income / Expenses */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl shadow-sm">
                                <p className="text-xs text-slate-600 dark:text-slate-300">Income</p>
                                <p className="mt-1 text-xl font-semibold text-green-700 dark:text-green-300">{income}</p>
                            </div>

                            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl shadow-sm">
                                <p className="text-xs text-slate-600 dark:text-slate-300">Expenses</p>
                                <p className="mt-1 text-xl font-semibold text-red-600 dark:text-red-300">{expenses}</p>
                            </div>
                        </div>
                    </div>

                    {/* History Card */}
                    <div className="bg-white/80 dark:bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm text-slate-500 uppercase tracking-wider">History</h3>

                        <ul className="mt-4 space-y-3 max-h-56 overflow-y-auto pr-2">
                            {tarnsaction.map((item, index) => {
                                const formattedDate = new Date().toLocaleString("en-US", {
                                    dateStyle: "medium",
                                    timeStyle: "short"
                                });

                                return (
                                    <>
                                        <li
                                            key={index}
                                            className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-700"
                                        >

                                            <div>
                                                <p className="font-medium text-slate-800 dark:text-slate-100">
                                                    {item.text}
                                                </p>
                                                <p className="text-xs text-slate-500">{formattedDate}</p>
                                            </div>

                                            <span
                                                className={`${item.amount > 0 ? "text-green-600" : "text-red-500"} font-semibold`}
                                            >
                                                {item.amount}
                                            </span>
                                        </li>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className='text-red-700 bg-slate-800 font-bold p-1 rounded-[10px]'>Delete</button>
                                    </>
                                );
                            })}
                        </ul>
                    </div>

                </section>


                {/* Add Transaction Form */}
                <section className="bg-white/80 dark:bg-slate-900/60 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Add new transaction</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-600 dark:text-slate-300">Text</label>
                            <input
                                required
                                name='text'
                                onChange={handleChange}
                                value={data.text}
                                placeholder="Enter description"
                                className="mt-1 block text-white w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-600 dark:text-slate-300">Amount</label>
                            <p className="text-xs text-slate-400">Negative = Expenses, Positive = Income</p>
                            <input
                                required
                                name='amount'
                                onChange={handleChange}
                                value={data.amount}
                                type="number"
                                placeholder="Enter amount.."
                                className="mt-1 text-white block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleArray}
                                className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-md hover:scale-[1.02] transform transition">
                                Add Transaction

                            </button>
                        </div>
                    </form>
                </section>

                <p className="mt-6 text-center text-xs text-slate-400">Tip: Use negative amounts to record expenses.</p>
            </div>
        </div>
    )
}
