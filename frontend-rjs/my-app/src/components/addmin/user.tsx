import React,{useCallback, useEffect, useMemo, useState} from "react";

import { Button ,Table,  Popconfirm } from "antd";

import { Link } from "react-router-dom";

import { AiFillDelete } from "react-icons/ai";

import { getUsers, deleteUser } from "../../services/userService";

import { useSelector } from "react-redux";

const User = () =>{

    const [user, setUser] = useState([])
    const store= useSelector(state => state)

    const columns = (handleDelete: any) => [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key:'age'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address'
        },
        {
           title: 'Remove',
           dataIndex: 'remove',
           key: 'remove',
           className: 'column-money',
        //    align: 'center',
           render: (_:any , record: any, index: number ) =>
            user.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record,)}>
              < AiFillDelete />
            </Popconfirm>
            ) : null,
        },
      ];

const findUser = useCallback(async() =>{
    try{
        const res =  await getUsers()
        if(!!res) {
            setUser(res.data)
        }
    }
    catch(err) {
        alert(err)
    }
},[user])

 const handleDelete = async(record: any) => {
     try{
         if(!!record) {
             await deleteUser(record.id)
             const res = await getUsers()
             if(!!res){
                 setUser(res.data)
             }
         }
     }
     catch(err){
         alert(err)
     }
 }


useEffect(() =>{
findUser()
},[])

useMemo(() =>{},[user])

    return(
        <>
        <Link to ="/createUser">
        <Button>Create User</Button>
        </Link>
        <Table
        columns={columns(handleDelete)}
        dataSource={user}
        rowKey={(record) => {
            return `table_a_${record?.id|| new Date().getTime()}`
        }}
      />
        </>
    )
}

export default User ;