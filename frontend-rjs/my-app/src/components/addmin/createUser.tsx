import React from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, InputNumber, Button } from "antd";

import { createUser } from "../../services/userService";

import action from "../../Reducer/action";
import { useSelector, useDispatch } from "react-redux";

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

  const onFinish = async (values: any) => {
    dispath(action.addUser(values.user));
    try {
      await createUser(values.user);
      navigate("/");
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
      >
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={["user", "address"]} label="Address">
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
