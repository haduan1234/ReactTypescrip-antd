import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Form, Input, InputNumber, Button } from "antd";

import {
  createUser,
  getUserById,
  updateUser
} from "../../../services/userService";

import action from "../../../Reducer/action";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
};

const CreateUser = () => {
  let navigate = useNavigate();
  const dispath = useDispatch();
  const id = useParams().id;
  const [form] = useForm();
  console.log("id user :", id);

  const [listUser, setListUser] = useState<any>({});

  const findUserById = async () => {
    try {
      if (typeof id !== "undefined") {
        const res = await getUserById(id);
        if (!!res) {
          // setListUser({...res.data})
          form.setFieldsValue(res.data);
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    findUserById();
  }, []);

  const onFinish = async (values: any) => {
    dispath(action.addUser(values));
    try {
      if (typeof id === "undefined") {
        await createUser(values);
        navigate("/");
      }else{
        await updateUser(id, values)
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="content-create">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"age"}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={"address"} label="Address">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUser;
