import { paths } from "../../constants/paths"
import { CounterTable } from "./entry/CounterTable"
import { CounterList } from "./list/CounterList"


export const counterRoutes = [
    {
        id: "counter",
        path: paths.counter,
        element : <CounterList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Counter", url: paths.counter },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "counterCart",
        path: `/${paths.counter}/:id`,
        element: <CounterTable />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Counter", url: paths.counter },
                    { label: null, url: null, current : "Cart" },
                ]
            }
        }
    }
]