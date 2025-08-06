import React, { useState } from 'react'

const ToDo = () => {
    const initialData = ['books', 'gadgets']
    const [listData, setListData] = useState(initialData);
    const [addData, setAddData] = useState('');
    const [updateInx, setUpdateInx] = useState(null);
    // console.log(listData);

    const handleDelete = (id) => {
        let updatedList = listData.filter((_, ind) => ind !== id);
        setListData(updatedList);
    }

    const handleUpdate = (id) => {
        setUpdateInx(id)
        const selectedItem = listData[id];
        setAddData(selectedItem);
        console.log('selectedItem :- ', selectedItem);
    }
    const handleAdd = () => {
        console.log('clicked on add');
        
        if (!addData) return;
        if (updateInx !== null) {
            let updatedList = listData.map((item, ind) => ind === updateInx ? addData : item);
            setListData(updatedList);
            setUpdateInx(null);
        } else {
            let newData = [...listData, addData];
            setListData(newData);
        }
        setAddData('')
    }
    return (
        <>
            <div>
                <input type='text' placeholder='Add Items' value={addData} onChange={(e) => setAddData(e.target.value)} />
                <button onClick={handleAdd}>Add</button>
                <ol>
                    {listData.map((ele, id) => {
                        return (
                            <div key={id}>
                                <li>{ele}
                                    <button onClick={() => handleDelete(id)}>Delete</button>
                                    <button onClick={() => handleUpdate(id)}>Update</button>
                                </li>
                            </div>
                        )
                    })}
                </ol>
            </div>
        </>
    )
}

export default ToDo;