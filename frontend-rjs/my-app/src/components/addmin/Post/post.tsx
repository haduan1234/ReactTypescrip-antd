import React,{useCallback, useEffect, useMemo, useState} from "react";

import { Button ,Table,  Popconfirm } from "antd";

import { Link ,useNavigate} from "react-router-dom";

import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

import { getPost, deletePost } from "../../../services/postService";

import { useSelector } from "react-redux";

const User = () =>{

    const [posts, setPosts] = useState([])
    
    const store= useSelector(state => state)
    const navigate = useNavigate()

    const columns = (handleDelete: any) => [
        {
          title: 'Name post',
          dataIndex: 'namePost',
          key: 'namePost'
        },
        {
          title: 'Name bloger',
          dataIndex: 'user.name',
          key:'user.name',
          render: (_:any , record: any, index: number ) =>
          posts.length >= 1 ? (
            <div>{record.user.name}</div>
          ) : null,
        },
        {
          title: 'Content',
          dataIndex: 'content',
          key: 'content'
        },
        {
           title: 'Remove',
           dataIndex: 'remove',
           key: 'remove',
           className: 'column-money',
           render: (_:any , record: any, index: number ) =>
            posts.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
              < AiFillDelete />
            </Popconfirm>
            ) : null,
        },
        {
            title: 'Edit',
            dataIndex:'edit',
            key : 'edit',
            render: (_: any, record: any, index: number)=>
            posts.length>=1 ? (
            <Button onClick={() => {
                navigate(`/createPost/${record.id}`)
            }}>
                <FaRegEdit />
            </Button>
            ):null
        }
      ];

const findPost = useCallback(async() =>{
    try{
        const res =  await getPost()
        console.log("data post :  ", res.data)
        if(!!res) {
            setPosts(res.data)
            }
    }
    catch(err) {
        alert(err)
    }
},[posts])

 const handleDelete = async(record: any) => {
     try{
         if(!!record) {
             await deletePost(record.id)
             const res = await getPost()
             if(!!res){
                 setPosts(res.data)
             }
         }
     }
     catch(err){
         alert(err)
     }
 }


useEffect(() =>{
findPost()
},[])

useMemo(() =>{},[posts])

    return(
        <>
        <Link to ="/createPost">
        <Button>Create Post</Button>
        </Link>
        <Table
        columns={columns(handleDelete)}
        dataSource={posts}
        rowKey={(record) => {
            // console.log("data Index: ", posts )
            return `table_a_${record?.id|| new Date().getTime()}`
        }}
      />
        </>
    )
}

export default User ;