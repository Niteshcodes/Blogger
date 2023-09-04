
import { useState } from "react";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useAppDispatch } from "../../../store/store";
import { updatePage } from "../../../store/Slices/paginationSlice";
interface IPaginator {
    totalRecords: number;
    rows: number;
    perPage: number;
    callback: CallableFunction

}

export default function MPaginator(props: IPaginator) {
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(10);
    const dispatch = useAppDispatch();


    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
        const updatedPagination = {
            currentPage: event.page,
            perPage: event.rows,
        };
        dispatch(updatePage(updatedPagination));

        props.callback(event)
        window.scrollTo(0, 0)
    };

    return (
        <div className="card  my-5">
            <Paginator first={first} rows={rows} totalRecords={props.totalRecords} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
        </div>
    );
}
