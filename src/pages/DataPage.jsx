import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { getAllGroceries, updateGroceries } from '../api';
import { format } from 'date-fns';
import { Location } from '../Grocery';
import "./DataPage.scss";

const getEnumValues = (enumObj) => {
    return Object.keys(enumObj).filter(k => isNaN(Number(k)));
};

const columns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Tags',
        accessor: 'tags',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Type',
        accessor: 'type',
    },
    {
        Header: 'Status Date',
        accessor: 'statusDate',
        Cell: ({ value }) => value ? format(new Date(value), 'MM/dd/yyyy') : '',
    },
    {
        Header: 'Expiration Date',
        accessor: 'expirationDate',
        Cell: ({ value }) => value ? format(new Date(value), 'MM/dd/yyyy') : '',
    },
    {
        Header: 'Location',
        accessor: 'location',
        Cell: ({ value, row, column }) => { 
            console.log('value', value);
            console.log('row', row);
            console.log('column', column);
            return (
            <select
                value={value || ''}
                onChange={(e) => {
                    const newValue = e.target.value;
                    row.original[column.id] = newValue; // Update the original row value
                    row.setState((prev) => ({
                        ...prev,
                        [column.id]: newValue // Ensure the change triggers re-render
                    }));
                }}
                style={{ width: '100%' }}
            >
                {getEnumValues(Location).map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                ))}
            </select>);
        }
    },
];

const DataPage = () => {
    const [groceriesList, setGroceriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getAllGroceries()
            .then(data => {
                setGroceriesList(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    const tableInstance = useTable({ columns, data: groceriesList, state: { setGroceriesList } });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateGroceries(groceriesList);
            alert('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to save data.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <table id="groceries-data" {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{ borderBottom: 'solid 3px red', background: 'aliceblue', color: 'black', fontWeight: 'bold' }}
                                    key={column.id}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map(cell => (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{ padding: '10px', border: 'solid 1px gray', background: 'papayawhip' }}
                                        key={cell.column.id}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={handleSave} disabled={isSaving} style={{ marginTop: '10px' }}>
                {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
    );
};

export default DataPage;
