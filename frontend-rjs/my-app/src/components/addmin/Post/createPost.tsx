import { Form, Input, InputNumber, Button, Select } from "antd";
import { useEffect, useState } from "react";

import { getUsers } from "../../../services/userService";
import { createPost } from "../../../services/postService";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const { Option } = Select;

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
/* eslint-enable no-template-curly-in-string */

const CreaetePost = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<any>([]);

  const findUser = async () => {
    try {
      const res = await getUsers();
      if (!!res) {
          setUser([...res.data])
      }
    } catch (err) {
      alert(err);
    }
  };

  const onFinish = async(values: any) => {
      if(!!values) {
          await createPost(values)
      }
  };

  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return (
    <div className="content-create">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"namePost"}
          label="Name"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="userId" label="Bloger" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={onGenderChange}
            allowClear
          >
              {!!user && user.map((u:any, index: any) =>
               <Option key={u.id} value={u.id}>{u.name}</Option>
              )}
          </Select>
        </Form.Item>
        <Form.Item name={"content"} label="Introduction">
          <Input.TextArea />
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

export default CreaetePost;
