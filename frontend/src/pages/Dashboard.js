import SideNav from "../elements/SideNav"
import StatCard from "../components/StatCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBriefcase,
    faBoxArchive,
    faMoneyBillTransfer
} from "@fortawesome/free-solid-svg-icons"

function Dashboard() {
    return (
        <div className="flex">
            <SideNav />
            <div className="flex-1 min-h-screen bg-gray-200">
                <div className="w-full max-w-screen-xl py-6 px-6">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4">Overview</h2>
                        <div className="flex flex-wrap justify-between">
                            <StatCard
                                title="Total Products"
                                stat={24}
                                link="/"
                                icon={<FontAwesomeIcon icon={faBoxArchive} />}
                                statSize="text-3xl"
                                className="mb-6 xl:mb-0"
                            />
                            <StatCard
                                title="Total Sats Collected"
                                stat={"328,743"}
                                link="/"
                                icon={<FontAwesomeIcon icon={faMoneyBillTransfer} />}
                                statSize="text-3xl"
                                className="mb-6 xl:mb-0"
                            />
                            <StatCard
                                title="Total Transactions"
                                stat={2}
                                link="/"
                                icon={<FontAwesomeIcon icon={faBriefcase} />}
                                statSize="text-3xl"
                                className="mb-6 xl:mb-0"
                            />
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4">Recent Transactions</h2>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;